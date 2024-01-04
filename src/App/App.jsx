import '../../style.css';
import React, { useEffect, useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader.jsx';
import { Day } from '../Day/Day.jsx';
import { useDate } from '../hooks/useDate';
import { NewEventModal } from '../NewEventModal/NewEventModal.jsx';
import { ViewEventModal } from '../ViewEventModal/ViewEventModal.jsx';
import jsonEvents from './sportData.json';

const sportsEvents = jsonEvents.data.map((event) => {
  const date = event.dateVenue;
  const homeTeamAbbr = event.homeTeam ? event.homeTeam.abbreviation : 'Unknown';
  const awayTeamAbbr = event.awayTeam ? event.awayTeam.abbreviation : 'Unknown';
  const title = `${homeTeamAbbr} | ${awayTeamAbbr}`;
  const homeGoals = event.result ? event.result.homeGoals : 'Unknown';
  const awayGoals = event.result ? event.result.awayGoals : 'Unknown';
  const isScheduled = event.status === 'scheduled' || !event.result;
  const goals = isScheduled ? 'Scheduled' : `${homeGoals} : ${awayGoals}`;

  console.log('date: ', date);
  return { title, date, goals };
});

console.log('sportsEvents: ', sportsEvents);

export const App = () => {
  const [view, setView] = useState('Calendar');
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : sportsEvents,
  );

  const eventForDate = (date) => events.find((e) => e.date === date);
  const eventsForDate = (date) => events.filter((e) => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);
  console.log('days', days);
  console.log('dateDisplay', dateDisplay);
  console.log('Events: ', events);

  return (
    <>
      <div id="container">
        <CalendarHeader
          onViewChange={setView}
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        {view === 'Calendar' ? (
          <>
            <div id="weekdays">
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
              <div>Saturday</div>
              <div>Sunday</div>
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
                    console.log('d: ', d);
                    console.log('d.date: ', d.date);
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div id="listView">
            {events
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((event) => (
                <div className="event-item" key={event.date + event.title}>
                  {' '}
                  <p className="event-title">{event.title}</p>
                  <p className="event-date">{event.date}</p>
                  <p className="event-goals">{event.goals}</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {clicked && !eventForDate(clicked) && (
        <ViewEventModal
          onClose={() => setClicked(null)}
          onSave={(title, goals) => {
            setEvents([...events, { title, date: clicked, goals }]);
            setClicked(null);
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <ViewEventModal
          eventText={eventForDate(clicked).title}
          events={eventsForDate(clicked)}
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
