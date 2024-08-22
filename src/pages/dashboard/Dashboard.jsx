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
import Checkbox from "@mui/material/Checkbox";
import InfoIconTable from "../../assets/InfoIconTable.svg";
import PrintDataIcon from "../../assets/PrintDataIcon.svg";
import updateIcon from "../../assets/updateIcon.svg";
import JobSheetViewModal from "../../utils/modals/JobsheetViewModal/JobSheetViewModal";
import { Link } from "react-router-dom";
import BarcodeIcon from "../../assets/BarcodeIcon.svg";
import { useState } from "react";
import "./dashboard.css";
import { Constants } from "../../constants/Constant";
import { mockData } from "../../constants/MockData";
import Loader from "../../utils/Loader/Loader";
import CustomPagination from "../../components/Pagination/Custompagination";
import Footer from "../../components/footer/Footer";

const boxesData = [
  { label: "Unallocated", value: 500 },
  { label: "Allocated", value: 5 },
  { label: "Reappointment", value: 595 },
  { label: "Pending Part", value: 2 },
  { label: "Closed", value: 32 },
];

const cells = [
  "Action",
  "Date & Time",
  "Ticket No",
  "Jobsheet No",
  "Model",
  "Defect",
  "Bin",
  "Tray No",
  "Assigned To",
  "Info",
];

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState("Unallocated");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [jobSheetDetails,setJobSheetDetails] = useState()
  // const [loading, setLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const filterData = mockData[reportType].slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const openModal = (info) => {
    setLoading(true);
    setJobSheetDetails(info)
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleReportType = (type) => {
    setReportType(type);
    setPage(0);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (

    <Grid container>

      <Grid container>
        <Grid container>
          {loading && <Loader />}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box ml={2}>
              <h4>{Constants.dashboardMtd}</h4>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-simple-select-label">
                  {Constants.serviceCenter}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Service Center"
                  sx={{
                    ".MuiInputBase-root": {
                      height: "15vh",
                    },
                    ".MuiOutlinedInput-input": {
                      padding: "12px 14px",
                    },
                  }}
                >
                  <MenuItem>Delhi</MenuItem>
                  <MenuItem>Noida</MenuItem>
                  <MenuItem>Gurgaon</MenuItem>
                </Select>
              </FormControl>
            </Box>

          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box className="boxes-container" sx={{ display: "flex" }}>
          {boxesData.map((box, index) => (
            <Grid item md={3} sm={2} key={index}>
              <Box
                className={`box-Reappointment ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleReportType(box.label)}
              >
                <Box className="First-box-Reappointment">
                  <span>{box.label}</span>
                  <span>{box.value}</span>
                </Box>
              </Box>
            </Grid>
          ))}
        </Box>
      </Grid>

      <Grid container spacing={1} ml={1}>
        <Grid item xs={6} sm={6} md={3}>
          <InputLabel style={{ fontFamily: "Open Sans" }}>
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
        <Grid item xs={6} sm={6} md={3}>
          <InputLabel style={{ fontFamily: "Open Sans" }}>
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
            >
              {Constants.ticketNo}
            </Typography>
          </InputLabel>
          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="standard"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <InputLabel style={{ fontFamily: "Open Sans" }}>
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
            >
              {Constants.docketNo}
            </Typography>
          </InputLabel>
          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="standard"
          />
          <img
            src={BarcodeIcon}
            alt="barcode-icon"
            style={{ margin: "5px", cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
          >
            Tray No
          </Typography>

          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} ml={1}>
        <Grid item xs={3}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
          >
            Bin
          </Typography>

          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">
              {Constants.select}
            </InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} mt={5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#28A745",
              textTransform: "capitalize",
              "&:focus": { outline: "none" },
            }}
          >
            {Constants.search}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} ml={1}>
        <Grid item xs={3} mt={2}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", fontFamily: "Open Sans" }}
          >
            {Constants.assignToEngineer}
          </Typography>

          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">
              {Constants.select}
            </InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} mt={7}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#33499F",
              textTransform: "capitalize",
              "&:focus": { outline: "none" },
            }}
          >
            {Constants.assignBtn}
          </Button>
        </Grid>
      </Grid>

      {/* table  */}

      <Grid container sx={{mt:"2%"}}>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 600 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#2255A4" }}>
                  {cells.map((cell, index) => (
                    <TableCell
                      id="dashTableHead"
                      key={index}
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        width: "2000px",
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell
                      align="center"
                      // sx={{ paddingTop: 0.8, paddingBottom: 0 }}
                    >
                      <Checkbox />
                      <Link to="/repair-update">
                        {""}
                        <img
                          src={updateIcon}
                          alt="updateIcon"
                          className="reapirUpdata"
                        />
                      </Link>
                    </TableCell>

                    {Object.keys(row)?.map((item, index) => (
                      <TableCell key={index}>
                        {item == "Date & Time" ? row[item] : row[item]}
                      </TableCell>
                    ))}

                    <TableCell align="center">
                      <img
                        src={InfoIconTable}
                        alt="table-info-icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => openModal(row)}
                      />
                      <img
                        src={PrintDataIcon}
                        alt="table-info-icon"
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CustomPagination
              count={mockData[reportType].length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

        </Box>
      </Grid>


      <JobSheetViewModal
        isOpen={showModal}
        onClose={closeModal}
        modalHeader="Jobsheet View"
        showAssignedTo="Assigned To"
      />


      <Footer />
    </Grid>

  );
};

export default Dashboard;
