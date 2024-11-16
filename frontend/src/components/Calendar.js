import React, { useState, useEffect } from 'react';

const generateCalendar = (currentMonth, currentYear) => {
  const date = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let firstDayOfMonth = date.getDay();
  firstDayOfMonth = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

  const calendarDays = [];
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Fill the days from the previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      monthOffset: -1,
    });
  }

  // Add the current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      monthOffset: 0,
    });
  }

  // Fill the remaining days for the next month
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      monthOffset: 1,
    });
  }

  const lastRow = calendarDays.slice(-7);
  const hasCurrentMonthDays = lastRow.some(day => day.isCurrentMonth);

  if (!hasCurrentMonthDays) {
    calendarDays.splice(-7, 7);
  }

  return calendarDays;
};

const Calendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const storedSelectedDate = localStorage.getItem('selectedDate');
  const initialSelectedDate = storedSelectedDate ? new Date(storedSelectedDate) : null;
  
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  const daysInCalendar = generateCalendar(currentMonth, currentYear);

  const months = [
    'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
    'Júl', 'August', 'September', 'Október', 'November', 'December'
  ];

  const weekDays = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];

  const handleDateClick = (day, isCurrentMonth, monthOffset) => {
    const newSelectedDate = new Date(currentYear, currentMonth + monthOffset, day);

    if (isCurrentMonth) {
      // If it's within the current month, just set the selected date
      if (newSelectedDate >= today) {
        setSelectedDate(newSelectedDate);
        localStorage.setItem('selectedDate', newSelectedDate.toString());
      }
    } else {
      // If it's from the previous or next month, switch the month and set the selected date
      if (newSelectedDate >= today) {
        setSelectedDate(newSelectedDate);
        localStorage.setItem('selectedDate', newSelectedDate.toString());
        changeMonth(monthOffset === -1 ? 'prev' : 'next');
      }
    }
  };

  const changeMonth = (direction) => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  // Check if the given day is selected
  const isSelectedDate = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear;
  };

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate.toString());
    }
  }, [selectedDate]);

  return (
    <div className='calendar-container'>
      <div className="calendar-header">
        <button className='calendar-arrow-button' onClick={() => changeMonth('prev')}>
          <svg className='calendar-arrow-left' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/></svg> 
        </button>
        <span>{months[currentMonth]} {currentYear}</span>
        <button className='calendar-arrow-button' onClick={() => changeMonth('next')}>
          <svg className='calendar-arrow-right' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/></svg> 
        </button>
      </div>

      <div className="calendar-body">
        {weekDays.map((day) => (
          <div key={`weekday-${day}`} className="calendar-weekday">{day}</div>
        ))}
        {daysInCalendar.map((day, index) => {
          const calendarDate = new Date(currentYear, currentMonth + day.monthOffset, day.day);
          const isPastDate = calendarDate < today;

          return (
            <button
              key={`day-${day.day}-${index}`}
              className={`calendar-day 
                ${day.isCurrentMonth ? '' : 'other-month'}
                ${day.isCurrentMonth && isSelectedDate(day.day) ? 'selected' : ''}
                ${isPastDate ? 'disabled' : ''}`} 
              onClick={() => handleDateClick(day.day, day.isCurrentMonth, day.monthOffset)}
              disabled={isPastDate}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;


