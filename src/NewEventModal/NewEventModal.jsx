import React, { useState } from 'react';

export const NewEventModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [goals, setGoals] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  return (
    <>
      <div id="newEventModal">
        <h2>New Event</h2>

        <input
          className={error ? 'error' : ''}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="eventTitleInput"
          placeholder="Event Title"
        />
        <input
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          id="eventGoalsInput"
          placeholder="Goals"
        />

        <button
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title, goals || 'Scheduled');
            } else {
              setError(true);
            }
          }}
          id="saveButton"
        >
          Save
        </button>

        <button onClick={onClose} id="cancelButton">
          Cancel
        </button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
