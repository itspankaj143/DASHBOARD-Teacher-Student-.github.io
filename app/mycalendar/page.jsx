"use client";
// MyCalendar.js

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  // Your component logic goes here
  return (
    <div className="myCustomHeight">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 550, width: 1400, margin: "50px" }}
        {...props} // Pass other props to the Calendar component
      />
    </div>
  );
};

export default MyCalendar;
