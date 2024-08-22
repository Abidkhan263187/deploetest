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
  Grid,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./partReturn.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ScannerComponent from "../../Kuldeep/Sccaner/ScannerComponent";
import { useNavigate } from "react-router-dom";

const options = [];

const partReturn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // add other form fields as needed
  });
  const navigate = useNavigate();
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
          {Constants.partReturn}
        </Typography>
        <Divider />
        <Grid
          container
          spacing={1}
          sx={{
            background: "#F5F8FF",
            margin: "10px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
            display: "flex", // Ensures the grid behaves as a flex container
            flexWrap: "nowrap", // Prevents wrapping to ensure buttons stay in one row
            justifyContent: "space-between", // Distributes space evenly between buttons
          }}
        >
          <Grid item sx={{ flexBasis: "22%" }}>
            {" "}
            {/* Adjusted to ensure all buttons fit */}
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              
              }}
              onClick={()=>{
                navigate("/inventory/dashboard")
              }}
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/inventory/stockgrn")
              }}
            >
              Stock GRN
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/Bufferstocktransfer")
              }}
            >
              Stock Transfer
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/Inventorypartreturn")
              }}
            >
              Part Return
            </Button>
          </Grid>
        </Grid>
        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Service Center"
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
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                  <TableCell style={{ color: "white" }}>Date & Time</TableCell>
                  <TableCell style={{ color: "white" }}>Ticket No</TableCell>
                  <TableCell style={{ color: "white" }}>Jobsheet No</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Defective Part Name
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Part Code</TableCell>
                  <TableCell style={{ color: "white" }}>Part Serial</TableCell>
                  <TableCell style={{ color: "white" }}>Status</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ float: "right", marginTop: "10px" }}>
            <Button
              variant="contained"
              style={{
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

export default partReturn;
