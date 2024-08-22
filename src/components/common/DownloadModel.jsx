import React from "react";
import { Modal, Button } from "@mui/material";

const DownloadModal = ({ open, onClose, downloadLink }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          background: "white",
          margin: "100px auto",
          width: "300px",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <h4>Invalid Data Detected</h4>
        <p>Please download the file to review the errors.</p>
        <a href={downloadLink} download>
          <Button variant="contained" color="primary">
            Download File
          </Button>
        </a>
        <Button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default DownloadModal;
