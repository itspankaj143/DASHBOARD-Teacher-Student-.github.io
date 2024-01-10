import React from "react";
import { Views } from "react-big-calendar";

const CustomToolbar = ({ currentView, onViewChange }) => {
  const changeView = (view) => {
    onViewChange(view);
  };

  return (
    <div className="toolbar">
      <button
        onClick={() => changeView(Views.MONTH)}
        disabled={currentView === Views.MONTH}
      >
        Month
      </button>
      <button
        onClick={() => changeView(Views.WEEK)}
        disabled={currentView === Views.WEEK}
      >
        Week
      </button>
      <button
        onClick={() => changeView(Views.DAY)}
        disabled={currentView === Views.DAY}
      >
        Day
      </button>
    </div>
  );
};

export default CustomToolbar;
