export default class Calendar {
  constructor(dayNameArray, monthNameArray) {
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.currentDate = new Date().getDate();
    this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    this.firstDay = new Date(this.year, this.month, 1).getDay();
    this.dayListArray = [];
    this.dayNameArray = dayNameArray;
    this.monthNameArray = monthNameArray;

    this.blanks = [];
    this.list = [];
    this.rows = [];
    this.cells = [];
  }

  getMonthAndYear() {
    return (document.getElementById("monthName").innerHTML = `${
      this.monthNameArray[this.month]
    } ${this.year}`);
  }

  printWeekNameArray() {
    this.dayNameArray.forEach((item) => {
      document.getElementById("week").innerHTML +=
        '<div class="week" href="#">' + item + "</div>";
    });
  }

  generateCurrentMonth() {
    this.month = new Date().getMonth();
    this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    this.firstDay = new Date(this.year, this.month, 1).getDay();
    this.blanks = [];
    this.list = [];
    this.rows = [];
    this.cells = [];
    this.getDefaultSettings();
  }

  generateDaysOfMonth() {
    this.generateMonthDayList();

    let totalSlots = [...this.blanks, ...this.list];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        this.cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        this.rows.push("<div class='d-flex'>" + this.cells + "</div>"); // when reach next week we contain all td in last week to rows
        this.cells = []; // empty container
        this.cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        this.rows.push("<div class='d-flex'>" + this.cells + "</div>");
      }
    });

    document.getElementById("days").innerHTML = this.rows
      .toString()
      .replaceAll(",", "");
  }

  generateDayList() {
    this.dayListArray = [];
    for (let i = 1; i <= this.daysInMonth; i++) {
      this.dayListArray.push(i);
    }
  }

  generateMonthDayList() {
    let currentMonth = new Date().getMonth();
    let className = "";
    for (let d = 1; d <= this.daysInMonth; d++) {
      let weekend = new Date(this.year, this.month, this.dayListArray[d - 1]);
      if (
        this.dayListArray[d - 1] == this.currentDate &&
        this.month == currentMonth
      ) {
        className = "current-date";
      } else if (weekend.getDay() == 6 || weekend.getDay() == 0) {
        className = "weekend";
      } else {
        className = "";
      }
      this.list.push(`<span class="${className}">${d}</span>`);
    }
  }

  generateSpaces() {
    for (let i = 0; i < this.firstDay - 1; i++) {
      this.blanks.push(`<span class="spaces">--</span>`);
    }
  }

  ifFirstdayIsSunday() {
    if (this.firstDay == 0) {
      this.firstDay = 7;
      return this.firstDay;
    }
  }

  getDefaultSettings() {
    this.generateDayList();
    this.ifFirstdayIsSunday();
    this.getMonthAndYear();
    this.generateSpaces();
    this.generateDaysOfMonth();
  }

  changeMonthSettings(monthValue, buttonID) {
    if (monthValue) {
      document.getElementById(buttonID).disabled = true;
    } else {
      if (buttonID == "next") {
        this.month++;
        document.getElementById("prev").disabled = false;
      } else {
        this.month--;
        document.getElementById("next").disabled = false;
      }

      document.getElementById("days").innerHTML = "";
      this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      this.firstDay = new Date(this.year, this.month, 1).getDay();

      this.blanks = [];
      this.list = [];
      this.rows = [];
      this.cells = [];

      this.getDefaultSettings();
    }
  }

  nextMonth() {
    this.changeMonthSettings(this.month > 10, "next");
  }

  prevMonth() {
    this.changeMonthSettings(this.month < 1, "prev");
  }
}
