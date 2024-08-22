import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";
import "./ScannerComponent.css";
import qrCodeImage from "../../assets/qr-code.png";

const ScannerComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setIsModalOpen(false); // Close modal after capture
  }, [webcamRef]);

  return (
    <div className="Scanner">
      <img
        src={image || qrCodeImage}
        alt="Click to open scanner"
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: "pointer", width: "50px", height: "35px" }}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Scanner Modal"
        className="modal-content"
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          height={400}
        />
        <button onClick={capture}>Capture photo</button>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ScannerComponent;
