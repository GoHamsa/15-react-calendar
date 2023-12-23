import React, { useEffect, useState } from 'react';

export const useDate = (events, nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const dt = new Date();
    //console.log(dt);

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    console.log(dateString);

    setDateDisplay(
      `${dt.toLocaleDateString('en-SE', { month: 'long' })} ${year}`,
    );
    console.log('dateDisplay: ', dateDisplay);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    // weekdays is our string of days, startin with sunday, index 0
    // datestring is defined above, and returns always the first day of this month, the weekday name, here Friday 12/1/2023
    // then the split(', ') isolates the word Friday
    // then index of Friday returns 5, because Friday is the 6th day in en-us, but we start counting with 0, bc its Array-index
    // wenn ich es auf de (sprache) wechsle, findet er den Tag im hard-coded array nicht, daher kommt -1 raus... warum?
    console.log('paddingDays: ', paddingDays);
    console.log('dateString: ', dateString);
    console.log('weekdays: ', weekdays);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        i - paddingDays,
      ).padStart(2, '0')}`;
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }

    console.log('daysArr: ', daysArr);

    setDays(daysArr);
  }, [events, nav]);

  return {
    days,
    dateDisplay,
  };
};
