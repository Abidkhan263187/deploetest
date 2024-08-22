import React, { useEffect, useState } from "react";
import "./popups.css"; // Import CSS for styles
import successIcon from "../../assets/success.png"; // Import success icon image
import failureIcon from "../../assets/fail.png"; // Import failure icon image
import warningIcon from "../../assets/exlanation.png"; // Import warning icon image
import { getStatusMessage } from "./getStatusMessage";

const Popups = ({ status, mssg, setStatusModal }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [logo, setLogo] = useState(null);

  const handleOkClick = () => {
    go(50); // go function call with different parameter
  };

  const go = (time) => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setStatusModal(false);
    }, time);
  };

  useEffect(() => {
    switch (status) {
      case "200":
        setLogo(successIcon);
        break;
      case "404":
        setLogo(failureIcon);
        break;
      default:
        setLogo(warningIcon);
        break;
    }
  }, [status]);

  // Dynamically determine background color based on status
  const getBackgroundColor = () => {
    switch (status) {
      case "200":
        return "#71C341";
      case "404":
        return "#DE401A";
      default:
        return "#F58634";
    }
  };

  return (
    <div className="popup-container">
      <div className={showPopup ? "bb" : "bb hidden"}></div>
      <div className={`message ${showPopup ? "comein" : ""}`}>
        <div
          className={`check ${showPopup ? "scaledown" : ""}`}
          style={{ backgroundColor: getBackgroundColor() }}
        >
          {logo && <img src={logo} alt={status} />}
        </div>
        <p>{status ? getStatusMessage(status) : "Empty Status"}</p>
        <p>{mssg ? mssg : "Empty Message"}</p>

        <button
          style={{ backgroundColor: getBackgroundColor() }}
          onClick={handleOkClick}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Popups2 = ({ setStatusModal2 }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleOkClick = () => {
    go(50); // go function call with different parameter
  };

  const go = (time) => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setStatusModal2(false);
    }, time);
  };

  return (
    <div className="popup-container">
      <div className={showPopup ? "bb" : "bb hidden"}></div>
      <div className={`message ${showPopup ? "comein" : ""}`}>
        <div
          className={`check ${showPopup ? "scaledown" : ""}`}
          style={{ backgroundColor: "#F58634" }}
        >
          <img src={warningIcon} alt={"Not Found"} />
        </div>
        <p>{404}</p>
        <p>Data Not Found</p>
        <button style={{ backgroundColor: "#F58634" }} onClick={handleOkClick}>
          OK
        </button>
      </div>
    </div>
  );
};

export { Popups, Popups2 };
export default Popups;
