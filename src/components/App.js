import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [isEditing, setIsEditing] = useState(false);

  // Get days in month
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getStartDay = (month, year) =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(month, year);
  const startDay = getStartDay(month, year);

  // Navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  // Year edit
  const handleYearDoubleClick = () => setIsEditing(true);
  const handleYearChange = (e) => setYear(Number(e.target.value));
  const handleYearBlur = () => setIsEditing(false);
  const handleYearKeyPress = (e) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  // Build calendar grid
  const buildCalendar = () => {
    const weeks = [];
    let currentDay = 1 - startDay; 
    while (currentDay <= daysInMonth) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (currentDay < 1 || currentDay > daysInMonth) {
          week.push(""); // empty cell
        } else {
          week.push(currentDay);
        }
        currentDay++;
      }
      weeks.push(week);
    }
    return weeks;
  };

  const calendar = buildCalendar();

  return (
    <div id="main">
      <h1 id="heading" style={{ color: "skyblue" }}>Calendar</h1>

      <select
        id="month-dropdown"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        {months.map((m, index) => (
          <option key={index} value={index}>
            {m}
          </option>
        ))}
      </select>
      {isEditing ? (
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={handleYearChange}
          onBlur={handleYearBlur}
          onKeyPress={handleYearKeyPress}
          autoFocus
        />
      ) : (
        <span id="year" onDoubleClick={handleYearDoubleClick}>
          {year}
        </span>
      )}
      <table id="days-table" border="1" style={{ marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j} style={{ textAlign: "center", width: "40px", height: "40px" }}>
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation buttons */}
      <div style={{ marginTop: "10px" }}>
        <button id="prev-year-btn" onClick={prevYear}>
          {"<<"}
        </button>
        <button id="prev-month-btn" onClick={prevMonth}>
          {"<"}
        </button>
        <button id="next-month-btn" onClick={nextMonth}>
          {">"}
        </button>
        <button id="next-year-btn" onClick={nextYear}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default App;
