"use client";
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styles from "./page.module.css";
import axios from "axios";
import Modal from "../../components/modelevent/Modal";
const localizer = momentLocalizer(moment);
import abc from "../../components/modelevent/Modal.module.css";
import { useRouter } from 'next/navigation';

const SCal = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsForCalendar, setEventsForCalendar] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/timeslot");
        setAllEvents(response.data.timeSlot || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const transformedEvents = allEvents.map((event) => ({
  //   name: event.name,
  //   title: event.title,
  //   start: new Date(event.dateTime),
  //   end: new Date(event.dateTime),
  //   duration: event.duration,
  //   booked: false,
  // }));

  useEffect(() => {
    const transformedEvents = allEvents.map((event) => ({
      ...event,
      start: new Date(event.dateTime),
      end: new Date(event.dateTime),
    }));
    setEventsForCalendar(transformedEvents);
  }, [allEvents]);

  const handleClick = (event) => {
    if (!event.booked) {
      setSelectedEvent(event);
      setModalIsOpen(true);
    }
  };

  const handleBooking = () => {
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
    // localStorage.removeItem('token'); 
    router.push('/login');

  }
  return (
    <>
      <div className={styles.outer}>
        <h2 className="text-center font-bold text-4xl border-2 bg-gray-400 rounded-md w-[90%] mx-auto shadow-md p-1">
          BOOK YOUR SESSION
        </h2>
        <button
      onClick={handleLogout}
      className="absolute top-1 right-28 px-4 py-2 rounded-md bg-red-500 text-white"
    >
      Logout
    </button>
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
                className: event.booked ? `${styles['booked-slot']} ${styles['blur-effect']}` : `${styles['free-slot']}`,
                style: {
                  pointerEvents: event.booked ? 'none' : 'auto',
                },
              })}
              startAccessor="start"
              endAccessor="end"
              selectable
              style={{ height: 550, width: 950, margin: "50px" }}
            />
          )}
        </div>
      </div>

      {modalIsOpen && (
        <Modal
          setModalIsOpen={setModalIsOpen}
          selectedEvent={selectedEvent}
          handleBooking={handleBooking}
        >
          <p className={abc.h2}>NAME:- {selectedEvent.name}</p>
          <p className={abc.p}>TITLE:- {selectedEvent.title}</p>
          <p className={abc.p}>Duration:- {selectedEvent.duration}</p>
          <button
            className="border-2 border-blue-400 px-2 py-1 bg-slate-600 rounded-md text-white"
            onClick={() => handleBooking()}
          >
            BOOK NOW
          </button>
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
