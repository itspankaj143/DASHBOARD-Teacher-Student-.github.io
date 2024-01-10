"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./page.module.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";

const localizer = momentLocalizer(moment);

function App() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    title: "",
    dateTime: "",
    duration: "",
  });
  const router = useRouter();
  const [allEvents, setAllEvents] = useState([]);
  const currentDate = new Date();
  const [fetchDataFlag, setFetchDataFlag] = useState(false);

  useEffect(() => {
    // Fetch data from the API when the component mounts or when fetchDataFlag changes
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/timeslot");
        console.log(response.data);
        setAllEvents(response.data.timeSlot || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Initial data fetch
    if (fetchDataFlag) {
      fetchData(); // Fetch data again if fetchDataFlag changes
      setFetchDataFlag(false); // Reset flag after fetching data
    }
  }, [fetchDataFlag]);

  console.log("allEvents---------", allEvents);

  async function handleAddEvent() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/timeslot",
        newEvent
      );
      console.log(response.data);
      // const addedEvent = {
      //   title: response.data.title,
      //   start: new Date(response.data.dateTime),
      //   end: new Date(response.data.dateTime),
      //   duration: response.data.duration,
      // };
      // Update allEvents state with the newly added event
      setAllEvents([...allEvents, response.data]);
      setFetchDataFlag(true); // Set flag to fetch data again
      setNewEvent({
        name: "",
        title: "",
        dateTime: "",
        duration: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  }

  // Transform events data for the Calendar component
  const transformedEvents = allEvents.map((event) => ({
    title: event.title,
    start: new Date(event.dateTime),
    end: new Date(event.dateTime),
    duration: event.duration,
  }));

  console.log(transformedEvents);

  function handleLogout() {
    // Redirect to login page on logout button click
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    router.push("/login");
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className="">TEACHER DASHBOARD</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.container}>
        <div className={styles.App}>
          <input
            className={styles.all}
            type="text"
            placeholder="NAME"
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            className={styles.all}
            type="text"
            placeholder="COURSE NAME"
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            className={styles.dpicker}
            placeholderText="SELECT DATE"
            minDate={currentDate}
            selected={newEvent.dateTime}
            onChange={(dateTime) => setNewEvent({ ...newEvent, dateTime })}
          />
          <input
            className={styles.all}
            type="text"
            value={newEvent.duration}
            onChange={(event) =>
              setNewEvent((prev) => ({
                ...prev,
                duration: event.target.value,
              }))
            }
            placeholder="DURATION"
          />
          <button
            style={{ marginTop: "10px" }}
            onClick={handleAddEvent}
            className="border-2 bg-gray-500 px-4 py-2 rounded-md text-white"
          >
            Add Event
          </button>
        </div>
        <div>
          {transformedEvents && (
            <Calendar
              className={styles.mobile_calendar}
              localizer={localizer}
              events={transformedEvents}
              startAccessor={transformedEvents.start}
              endAccessor={transformedEvents.end}
              style={{ height: 550, width: 950, margin: "50px" }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
