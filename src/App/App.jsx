import React, { useEffect, useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader.jsx';
import { Day } from '../Day/Day.jsx';
import { DeleteEventModal } from '../DeleteEventModal/DeleteEventModal.jsx';
import { useDate } from '../hooks/useDate';
import { NewEventModal } from '../NewEventModal/NewEventModal.jsx';
import jsonEvents from './sportData.json';

const sportsEvents = jsonEvents.data.map((event) => {
  const date = event.dateVenue;
  const homeTeamAbbr = event.homeTeam ? event.homeTeam.abbreviation : 'Unknown';
  const awayTeamAbbr = event.awayTeam ? event.awayTeam.abbreviation : 'Unknown';
  const title = `${homeTeamAbbr} | ${awayTeamAbbr}`;

  return { title, date };
});

console.log(sportsEvents);

export const App = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : sportsEvents,
  );

  const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  return (
    <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvents([...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </>
  );
};
