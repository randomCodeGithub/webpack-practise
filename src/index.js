import Calendar from "./Calendar";
import "./styles/style.scss";
import CalendarNames from "./calendarNames";

let calendar = new Calendar(CalendarNames.dayNames, CalendarNames.monthNames);
calendar.printWeekNameArray();
calendar.getDefaultSettings();

document.querySelector("#next").addEventListener("click", () => {
  calendar.nextMonth();
});

document.querySelector("#prev").addEventListener("click", () => {
  calendar.prevMonth();
});

document.getElementById("currentMonth").addEventListener("click", () => {
  calendar.generateCurrentMonth();
});
