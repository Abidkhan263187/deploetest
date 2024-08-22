import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar2";
import { useState } from "react";
import PartIssueModal from "../../utils/modals/PartIssueModal/PartIssueModal";
import Footer from "../../components/footer/Footer";
import { Constants } from "../../constants/Constant";
import Loader from "../../utils/Loader/Loader";

const boxesData = [
  { label: "Part Requested", value: 40 },
  { label: "Part Issued", value: 32 },
];

const cells = [
  "Date & Time",
  "Ticket No",
  "Jobsheet No",
  "Model",
  "Defect",
  "Bin",
  "Part Requested",
  "Status",
];

const dataArray = [
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
];

const PartIssue = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 3000);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  return (
    <Box component="main" style={{width:"120%"}}>
        {loading && <Loader />}
      <Sidebar>
        <Box component="main" sx={{ m: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box ml={2}>
              <h4>{Constants.dashboard}</h4>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-simple-select-label">
                {Constants.serviceCenter}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={Constants.serviceCenter}
                >
                  <MenuItem>Delhi</MenuItem>
                  <MenuItem>Noida</MenuItem>
                  <MenuItem>Gurgaon</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider />

          <Box
            className="boxes-container"
            sx={{ display: "flex", overflowX: "hidden" }}
          >
            {boxesData.map((box, index) => (
              <Box key={index} className="box-Reappointment">
                <Box className="First-box-Reappointment">
                  <span className="Firstline-Reappointment">{box.label}</span>
                  <span className="secoundline-Reappointment">{box.value}</span>
                </Box>
              </Box>
            ))}
          </Box>

          <Grid container spacing={1} m={1}>
            <Grid item xs={3}>
              <InputLabel>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
                >
                     {Constants.jobsheetNo}
                </Typography>
              </InputLabel>

              <TextField
                id="standard-basic"
                placeholder="Search"
                variant="standard"
              />
            </Grid>

            <Grid item xs={3}>
              <InputLabel>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
                >
                  {Constants.engineer}
                </Typography>
              </InputLabel>
              <TextField
                id="standard-basic"
                placeholder="Search"
                variant="standard"
              />
            </Grid>

            <Grid item xs={3} mt={3}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#28A745", textTransform: "capitalize" }}
              >
                 {Constants.search}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} m={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#2255A4" }}>
                      {cells.map((cell, index) => (
                        <TableCell
                          key={index}
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataArray.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((value, cellIndex) => (
                          <TableCell key={cellIndex} align="center">
                            {value}
                          </TableCell>
                        ))}

                        <TableCell >
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#33499F",
                              textTransform: "capitalize",
                            }}
                            onClick={openModal}
                          >
                          {Constants.issueBtn}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <PartIssueModal
             isOpen={showModal} 
             onClose={closeModal} 
            />
          </Grid>
        </Box>
        <br/>
        <br/>
        <Footer/>
      </Sidebar>
    </Box>
  );
};

export default PartIssue;
