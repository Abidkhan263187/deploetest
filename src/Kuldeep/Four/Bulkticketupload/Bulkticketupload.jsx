import { Box, Divider, Typography, Button } from "@mui/material";
import { useState } from "react";
import Sidebar from "../../../pages/Sidebar/Sidebar2";
import { Constants } from "../../../constants/Constant";
import "./Bulkticketupload.css";

const Bulkticketupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here, e.g., use a file upload API
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };

  const handleDownload = () => {
    // Logic for downloading file
    console.log("Downloading file...");
  };

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.Bulkticketupload}
        </Typography>
        <Divider />

        <div className="textfield-box">
          <div className="upload-excel">
            <p style={{ fontWeight: "bold" }}>Bulk Upload</p>
          </div>

          <div className="upload">
            <div>
              <input
                className="input-bulkupload"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                }}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
            <div>
              <a
                href="#"
                onClick={handleDownload}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Download Template
              </a>
            </div>
            <div>
              <a
                href="#"
                onClick={handleDownload}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Download Reference Code
              </a>
            </div>
          </div>
        </div>
      </Sidebar>
    </Box>
  );
};

export default Bulkticketupload;
