import React from 'react';

export const DeleteEventModal = ({ onDelete, onClose, events }) => {
  return (
    <>
      <div id="deleteEventModal">
        <h2>Event</h2>

        <p id="eventText">
          {events.map((event) => (
            <div>
              <p>
                {event.title} - {event.date}
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
