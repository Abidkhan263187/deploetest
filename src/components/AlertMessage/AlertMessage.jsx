import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./alertMessage.css";

const AlertMessage = ({ statusCode, statusMessage }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (statusCode) {
      setShowPopup(true);
    }
  }, [statusCode]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    console.log(`I am alert`)

  };

  let statusType;
  switch (statusCode) {
    case 200:
      statusType = "success";
      break;
    case 400:
    case 500:
    case 404:
      statusType = "error";
      break;
    default:
      statusType = "info";
  }

  return (
    <div>
      <div className={`background ${showPopup ? "show" : ""}`}></div>
      <div className={`message ${showPopup ? "comein" : ""} ${statusType}`}>
        <div className={`check ${showPopup ? "scaledown" : ""}`}>&#10004;</div>
        <p>{statusType.charAt(0).toUpperCase() + statusType.slice(1)}</p>
        <p>{statusMessage}</p>
        <button id="ok" onClick={togglePopup}>
          OK
        </button>
      </div>
    </div>
  );
};

AlertMessage.propTypes = {
  statusCode: PropTypes.number,
  statusMessage: PropTypes.string,
};

export default AlertMessage;
