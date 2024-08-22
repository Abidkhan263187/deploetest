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
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./pendingForDispatch.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ScannerComponent from "../../Kuldeep/Sccaner/ScannerComponent";

const options = [];

const pendingForDispatch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // add other form fields as needed
  });

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const [checkedRows, setCheckedRows] = useState({});

  const handleCheckboxChange = (rowIndex) => (event) => {
    setCheckedRows({
      ...checkedRows,
      [rowIndex]: event.target.checked,
    });
  };

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.warranty}
        </Typography>
        <Divider />

        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Engineer" variant="standard" />
                )}
              />
            </div>
            <div className="textinput-Createu">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="From Date"
                    onChange={(date) => handleDateChange(date, "startDate")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="textinput-Createu">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="To Date"
                    onChange={(date) => handleDateChange(date, "endDate")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>

          <div className="buttons">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="textfield-box">
          <div style={{ float: "right" }} className="textfield-box">
            {" "}
            <ScannerComponent />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-heading">
                  <TableCell style={{ color: "white" }}>Select</TableCell>
                  <TableCell style={{ color: "white" }}>Date & Time</TableCell>
                  <TableCell style={{ color: "white" }}>Ticket No</TableCell>
                  <TableCell style={{ color: "white" }}>Jobsheet No</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Part Requested
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Part Serial</TableCell>
                  <TableCell style={{ color: "white" }}>Issued On</TableCell>
                  <TableCell style={{ color: "white" }}>Status</TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* First Row */}
                {[...Array(3)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <Checkbox
                        checked={!!checkedRows[rowIndex]}
                        onChange={handleCheckboxChange(rowIndex)}
                        inputProps={{ "aria-label": "Select row" }}
                      />
                    </TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#33499F",
                          color: "white",
                          boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                        }}
                      >
                        Dispatch
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ float: "right", marginTop: "10px" }}>
            <Button
              variant="contained"
              style={{
                marginRight: "90px",
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Dispatch Selected
            </Button>
          </div>
          <div style={{ marginTop: "100px" }} className="buttons">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Allocate
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Sidebar>
    </Box>
  );
};

export default pendingForDispatch;
