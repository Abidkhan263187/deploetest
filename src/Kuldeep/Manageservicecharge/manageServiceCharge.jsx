import {
  Box,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./manageServiceCharge.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const options = [];

const Is = [
  { title: "Category Wise" },
  { title: "Subcategory Wise" },
  { title: "Defect Code Wise" },
];

const manageServiceCharge = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
  });

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

  // Function to handle date changes
  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.manageservicecharge}
        </Typography>
        <Divider />

        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={Is}
                getOptionLabel={(Is) => Is.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Service Change Type"
                    variant="standard"
                  />
                )}
              />
            </div>{" "}
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Category"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Subcategory"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Repair Code"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>
          <div className="line-textfield">
            <TextField
              className="text"
              id="standard-basic"
              label="Price"
              variant="standard"
            />
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Valid From"
                    onChange={(date) => handleDateChange(date, "startDate")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="buttons">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="textfield-box">
          <div className="upload-excel">
            <p style={{ fontWeight: "bold" }}>Bulk Upload</p>
          </div>

          <div className="datetwo">
            {" "}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Valid From"
                    onChange={(date) => handleDateChange(date, "startDate")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
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
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
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
            </div>{" "}
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
            </div>{" "}
          </div>
        </div>

        <div className="textfield-box">
          <div className="upload-excel">
            <p>List View</p>
          </div>
          <div className="line-textfield">
            <div style={{ width: "15%" }}>
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Item Code" variant="standard" />
                )}
              />
            </div>
            <div style={{ width: "15%" }}>
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="standard" />
                )}
              />
            </div>
            <div style={{ width: "15%" }}>
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subcategory"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div style={{ width: "15%" }}>
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Defect Code"
                    variant="standard"
                  />
                )}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Price As On"
                  onChange={(date) => handleDateChange(date, "startDate")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="buttons">
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                Search
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                View All
              </Button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-heading">
                  <TableCell style={{ color: "white" }}>part Name</TableCell>
                  <TableCell style={{ color: "white" }}>Item Code</TableCell>
                  <TableCell style={{ color: "white" }}>Category</TableCell>
                  <TableCell style={{ color: "white" }}>Subcategory</TableCell>
                  <TableCell style={{ color: "white" }}>Defect Code</TableCell>
                  <TableCell style={{ color: "white" }}>Price</TableCell>
                  <TableCell style={{ color: "white" }}>Valid From</TableCell>
                  <TableCell style={{ color: "white" }}>Vaild Till</TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* First Row */}
                <TableRow>
                  <TableCell>xxxxx</TableCell>
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>{" "}
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>{" "}
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>
                </TableRow>
                {/* Second Row */}
                <TableRow>
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>{" "}
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>{" "}
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>{" "}
                  <TableCell>xxxxx</TableCell> <TableCell>xxxxx</TableCell>
                  <TableCell>xxxxx</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Sidebar>
    </Box>
  );
};

export default manageServiceCharge;
