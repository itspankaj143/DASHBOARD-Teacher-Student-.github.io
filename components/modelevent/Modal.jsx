import { useState } from "react";
import style from "./Modal.module.css";

const Modal = ({
  setModalIsOpen,
  selectedEvent,
  children,
  handleBooking,
  eventsForCalendar,
}) => {
  const [bookedSuccessfully, setBookedSuccessfully] = useState(false);
  // if (!isOpen) return null Commented out conditional rendering check
  const handleClick = () => {
    setModalIsOpen((prev) => !prev); // Comment for toggling modal state
  };
  const handleBookingClick = () => {
    if (selectedEvent) {
      // Updating the selected event to mark it as booked
      const updatedEvent = { ...selectedEvent, booked: true };

      // Creating a new array with the updated event
      const updatedEvents = eventsForCalendar.map((event) =>
        event === selectedEvent ? updatedEvent : event
      );

      setBookedSuccessfully(true);
      handleBooking(updatedEvents);
    }
  };

  return (
    <>
      <div className={style.modal} onClick={() => handleClick()}>
        {" "}
      </div>
      <div className={style.modalcontent}>
        <span className={style.close} onClick={() => handleClick()}>
          &times;
        </span>
        {children}
        {bookedSuccessfully ? (
          <button
            className="border-2 border-blue-600 px-2 py-1 bg-slate-600 rounded-md text-white"
            disabled
          >
            BOOKED
          </button>
        ) : (
          <button
            className="border-2 border-blue-400 px-2 py-1 bg-slate-600 rounded-md text-white"
            onClick={handleBookingClick}
          >
            BOOK NOW
          </button>
        )}
      </div>
    </>
  );
};

export default Modal;
