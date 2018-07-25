import React from 'react';

const Modal = ({ room, date, confirmUnbook, declineUnbook }) => {
  return (
    <div className="modal">
      <p>
        Do you want to unbook room {+room + 1} on {date}
      </p>
      <button onClick={confirmUnbook}>Yes</button>
      <button onClick={declineUnbook}>No</button>
    </div>
  );
};
export default Modal;
