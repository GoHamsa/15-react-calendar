import React from 'react';

export const CalendarHeader = ({
  onNext,
  onBack,
  onViewChange,
  dateDisplay,
}) => {
  return (
    <div id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button onClick={() => onViewChange('Calendar')} id="backButton">
          Calendar
        </button>
        <button onClick={() => onViewChange('List')} id="nextButton">
          List
        </button>
        <button onClick={onBack} id="backButton">
          Back
        </button>
        <button onClick={onNext} id="nextButton">
          Next
        </button>
      </div>
    </div>
  );
};
