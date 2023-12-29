import style from "./Modal.module.css";

const Modal = ({ setModalIsOpen, children }) => {
  // if (!isOpen) return null;
  const handleClick = () => {
    setModalIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={style.modal} onClick={() => handleClick()}> </div>
      <div className={style.modalcontent}>
        <span className={style.close} onClick={() => handleClick()}>
          &times;
        </span>
        {children}
      </div>
    </>
  );
};

export default Modal;
