"use client";
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar,
  momentLocalizer,
  Views,
  Props,
  globalizeLocalizer,
} from "react-big-calendar";
import globalize from "globalize";
import "moment-timezone";

moment.tz.setDefault("America/Los_Angeles");

// const localizer = globalizeLocalizer(globalize);
import styles from "./page.module.css";
import axios from "axios";
import Modal from "../../components/modelevent/Modal";
const localizer = momentLocalizer(moment);
import moment from "moment";
import abc from "../../components/modelevent/Modal.module.css";
import { useRouter } from "next/navigation";
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar";

const SCal = () => {
  const [allEvents, setAllEvents] = useState([]); // State to hold all events
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State to manage selected event
  const [eventsForCalendar, setEventsForCalendar] = useState([]); // State to manage events for calendar
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const router = useRouter();
  // console.log(eventsForCalendar);
  useEffect(() => {
    // Fetch all events when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/timeslot");
        console.log(response.data);
        setAllEvents(response.data.timeSlot || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  // const transformedEvents = allEvents.map((event) => ({
  //   name: event.name,
  //   title: event.title,
  //   start: new Date(event.dateTime),
  //   end: new Date(event.dateTime),
  //   duration: event.duration,
  //   booked: false,
  // }));

  useEffect(() => {
    // Transform events for the calendar when 'allEvents' changes
    const transformedEvents = allEvents.map((event) => ({
      ...event,
      start: new Date(event.dateTime),
      end: new Date(event.dateTime),
    }));
    console.log(transformedEvents);
    setEventsForCalendar(transformedEvents);
  }, [allEvents]); // Re-run effect when 'allEvents' changes

  const handleClick = (event) => {
    // Handle click on calendar events
    if (!event.booked) {
      setSelectedEvent(event);
      setModalIsOpen(true);
    }
  };

  const handleBooking = () => {
    // Handle booking an event
    if (selectedEvent) {
      const updatedEvents = eventsForCalendar.map((event) =>
        event === selectedEvent ? { ...event, booked: true } : event
      );
      setAllEvents(updatedEvents); // Update allEvents with the booked status
      setModalIsOpen(false);
      alert("BOOKED SUCCESSFULLY");
    }
  };
  function handleLogout() {
    // Logout function
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    router.push("/login");
  }

  const handleViewChange = (view) => {
    setCurrentView(view);
    console.log(view);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className="text-white">BOOK YOUR SESSION</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* <div>
        <input type="radio" name="" id="" />
      </div> */}

      <div className={styles.container}>
        {eventsForCalendar && (
          <Calendar
            className={styles.calendar}
            localizer={localizer}
            events={eventsForCalendar}
            onSelectEvent={(event) => {
              handleClick(event);
            }}
            eventPropGetter={(event) => ({
              className: event.booked
                ? `${styles["booked-slot"]} ${styles["blur-effect"]}`
                : `${styles["free-slot"]}`,
              style: {
                pointerEvents: event.booked ? "none" : "auto",
              },
              title: event.booked ? "Booked" : "", // Show 'Booked' or 'Free' on hover
            })}
            startAccessor={eventsForCalendar.start}
            endAccessor={eventsForCalendar.end}
            selectable
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            toolbar={(props) => (
              <CustomToolbar
                {...props}
                currentView={currentView}
                onViewChange={handleViewChange}
              />
            )}
            defaultView={currentView}
            style={{ height: 550, width: 1400, margin: "50px" }}
          />
        )}
      </div>

      {modalIsOpen && (
        <Modal
          setModalIsOpen={setModalIsOpen}
          selectedEvent={selectedEvent}
          handleBooking={handleBooking}
          eventsForCalendar={eventsForCalendar}
        >
          <p className={abc.h2}>NAME:- {selectedEvent.name}</p>
          <p className={abc.p}>TITLE:- {selectedEvent.title}</p>
          <p className={abc.p}>Duration:- {selectedEvent.duration}</p>
          {/* <button
            className="border-2 border-blue-400 px-2 py-1 bg-slate-600 rounded-md text-white"
            onClick={() => handleBooking()}
          >
            BOOK NOW
          </button> */}
        </Modal>
      )}
    </>
  );
};

export default SCal;

// "use client";
// import React, { useEffect, useState } from "react";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import ModelEvent from "../modelevent/page";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import styles from "./page.module.css";
// import axios from "axios";

// const localizer = momentLocalizer(moment);

// const SCal = () => {
//   // const [modal, setModal] = useState(false);
//   // const [details, setDetails] = useState({});
//   const [allEvents, setAllEvents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/timeslot");
//         // console.log(response.data)
//         setAllEvents(response.data.timeSlot || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // console.log(allEvents);

//   const transformedEvents = allEvents.map((event) => ({
//     name:event.name,
//     title: event.title,
//     start: new Date(event.dateTime),
//     end: new Date(event.dateTime),
//     duration: event.duration,
//   }));
//   console.log(transformedEvents)

//   return (
//     <div className={styles.outer}>
//       <h2 className="text-center font-bold text-4xl border-2 bg-gray-400 rounded-md w-[90%] mx-auto shadow-md  p-1" >BOOK YOUR SESSION</h2>
//       <div className={styles.container}>
//         {transformedEvents && (
//           <Calendar
//             className={styles.calendar}
//             localizer={localizer}
//             events={transformedEvents}
//             onSelectEvent={(event) => handleClick(event)}
//             startAccessor="start"
//             endAccessor="end"
//             selectable
//             style={{ height: 550, width: 950, margin: "50px" }}
//           />
//         )}
//       </div>
//       {/* {modal && (
//         <ModelEvent className={styles.modal} close={Close} details={details} />
//       )} */}
//     </div>
//   );
// };

// export default SCal;

// "use client";
// import React from "react";

// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import ModelEvent from "../modelevent/page";
// import { useState } from "react";
// import styles from "./page.module.css";

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";

// const localizer = momentLocalizer(moment);

// const SCal = ({ allEvents }) => {
//   const [modal, setModal] = useState(false);
//   const [details, setDetails] = useState({});

//   const handleClick = (e) => {
//     setModal(true);
//     console.log(modal);
//     setDetails({ title: e.title, date: e.start, students: e.students });
//   };

//   const Close = () => {
//     setModal(false);
//   };

//   return (
//     <div className={styles.outer}>
//       <h2 className={styles.h2}>Join Class</h2>
//       <div className={styles.container}>
//         <Calendar
//           className={styles.calendar}
//           localizer={localizer}
//           events={allEvents}
//           onSelectEvent={(event) => {
//             console.log(event.title);
//             console.log(event.start);
//             console.log(event.students);
//             handleClick(event);
//           }}
//           startAccessor="start"
//           endAccessor="end"
//           selectable
//           style={{ height: 500, margin: "100px" }}
//         />
//       </div>
//       {modal && (
//         <ModelEvent className={styles.modal} close={Close} details={details} />
//       )}
//     </div>
//   );
// };

// export default SCal;

// "use client"
// import React from 'react'
// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import locales from 'date-fns/locale/en-US';
// import startOfWeek from "date-fns/startOfWeek";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ModelEvent from "../modelevent/page"
// import { useState } from 'react';
// import styles from "./page.module.css"

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales
// });

// const SCal = ({allEvents}) => {
//   const [modal,setModal] = useState(false);
//   const [details,setDetails] = useState({})

//   const handleClick=(e)=>{
//     setModal(true);
//     console.log(modal);
//     setDetails({title:e.title,date:e.start,students:e.students})
//   }

//   const Close=()=>{
//     setModal(false);
//   }
//   return (
//     <div className={styles.outer}>
//     <h2 className={styles.h2}>Join Class</h2>
//     <div className={styles.container}>

//         <Calendar
//         className={styles.calendar}
//           localizer={localizer}
//           events={allEvents}
//           onSelectEvent={(event)=>{
//             console.log(event.title)
//             console.log(event.start)
//             console.log(event.students)
//             handleClick(event);
//           }

//         }
//           startAccessor="start"
//           endAccessor="end"
//           selectable
//           style={{ height: 500, margin: "100px" }}
//         />
//     </div>
//         {modal && <ModelEvent className={styles.modal} close={Close} details={details}/>}
//     </div>

//   )
// }

// export default SCal;
