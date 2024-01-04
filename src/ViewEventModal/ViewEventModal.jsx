import React from 'react';

export const ViewEventModal = ({ onClose, events }) => {
  return (
    <>
      <div id="viewEventModal">
        <h2>Event</h2>

        <p id="eventText">
          {events.map((event) => (
            <div>
              <p>
                {event.title} - {event.date} - {event.goals}
              </p>
            </div>
          ))}
        </p>

        <button onClick={onClose} id="closeButton">
          Close
        </button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
