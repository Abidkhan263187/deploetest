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
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../Sidebar/Sidebar2";
import "./ticketAcknowledge.css";
import TicketAcknowledgeModal from "../../utils/modals/ticketModal/TicketAcknowledgeModal";
import { useState, useEffect } from "react";
import BarcodeIcon from "../../assets/BarcodeIcon.svg";
import Loader from "../../utils/Loader/Loader";
import Footer from "../../components/footer/Footer";
import { Constants } from "../../constants/Constant";
import { getTicketListAPI } from "../../API service/APIservice";
import { END_POINT_GET_TICKET_LIST } from "../../Services/Api/EndPoints/index.js";
import CustomPagination from "../../components/common/CustomPagination.jsx";
import { useSelector } from "react-redux";
// import '../../App.css'
import config from "../../components/common/config.js";
const currentDate = new Date();
const firstDayOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CustomDatePicker = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={(e) => onChange(new Date(e.target.value))}
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      size="small"
    />
  );
};

const TicketAcknowledge = () => {
  const pageSize = config.pageSize;
  const dummyGetList = {
    ticketNo: "",
    airWayBillNo: "",
    type: "0",
    fromDate: formatDate(firstDayOfMonth),
    toDate: formatDate(currentDate),
    customerState: "",
    customerCity: "",
    pinCode: "",
    mobileNo: "",
    invoiceNo: "",
    pageIndex: "1",
    pageSize: pageSize,
  };

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [dataSize, setDataSize] = useState(pageSize);
  const [searchParams, setParams] = useState({
    ...dummyGetList,
  });

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const TicketListArr = await getTicketListAPI(searchParams);
        setTotalRecords(TicketListArr.totalRecords);
        console.log("length", TicketListArr.ticketDataList.length);
        setDataSize(TicketListArr.ticketDataList.length);
        const ticketDataWithActions = TicketListArr.ticketDataList.map(
          (ticket) => ({
            ...ticket,
            openModal,
          })
        );
        setTicketList(ticketDataWithActions);
      } catch (error) {
        // console.log("error while getting list ", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const TicketListArr = await getTicketListAPI(searchParams);
      setTotalRecords(TicketListArr.totalRecords);
      setDataSize(TicketListArr.ticketDataList.length);
      const ticketDataWithActions = TicketListArr.ticketDataList.map(
        (ticket) => ({
          ...ticket,
          openModal,
        })
      );
      setTicketList(ticketDataWithActions);
    } catch (error) {
      setTicketList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (name, date) => {
    const formattedDate =
      date instanceof Date ? date.toISOString().split("T")[0] : date;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: formattedDate,
    }));
  };

  const columns = [
    { field: "ticketNo", headerName: "Ticket No", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "customerMobile", headerName: "Customer Mobile", width: 150 },
    { field: "product", headerName: "Product", width: 200 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "defect", headerName: "Defect", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal(params.row)}
          disabled={ticketList.length === 0}
        >
          {Constants.acknowledgeBtn}
        </Button>
      ),
    },
  ];

  return (
    <Box component="main" sx={{ overflowX: "hidden" }}>
      <Sidebar>
        <Grid container sx={{ width: "100%", overflow: "hidden" }}>
          {loading && <Loader />}

          <Typography variant="h6" component="h6" m={2} className="typography">
            {Constants.ticketAcknowledge}
          </Typography>

          <Divider />
          <Grid container spacing={2} m={2}>
            <Grid item xs="auto" sx={{ width: 160 }}>
              <FormControl variant="outlined" sx={{ mt: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {Constants.type}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="type"
                  value={searchParams.type}
                  onChange={handleChange}
                  label="Type"
                  sx={{ width: "150px", height: "45px", mt: "2px" }}
                >
                  <MenuItem value="0">Pending</MenuItem>
                  <MenuItem value="1">Hold</MenuItem>
                  <MenuItem value="2">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            &nbsp;&nbsp;
            <Grid item xs="auto" sx={{ width: 250, mt: "10px" }}>
              <CustomDatePicker
                label={Constants.fromDate}
                value={searchParams.fromDate}
                onChange={(date) => handleDateChange("fromDate", date)}
              />
            </Grid>
            <Grid item xs="auto" sx={{ width: 250, mt: "10px" }}>
              <CustomDatePicker
                label={Constants.toDate}
                value={searchParams.toDate}
                onChange={(date) => handleDateChange("toDate", date)}
              />
            </Grid>
            &nbsp;&nbsp;
            <Grid item xs="auto" sx={{ width: 120, mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  height: "35px",
                  width: "100%",
                  backgroundColor: "#28A745",
                }}
                onClick={handleSearch}
              >
                {Constants.search}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ alignItems: "end" }} m={2}>
            <Grid item xs={3}>
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
                variant="outlined"
                name="ticketNo"
                value={searchParams.ticketNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={3} mt={4}>
              <img
                src={BarcodeIcon}
                alt="barcode-icon"
                style={{ cursor: "pointer" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} ml={1} sx={{ width: "100%", mb: "5%" }}>
            <Grid item xs={12} sx={{ overflowX: "auto" }}>
              <Paper sx={{ height: 400, width: "95%", overflowX: "auto" }}>
                <div style={{ width: "90%", position: "relative" }}>
                  {ticketList.length === 0 && (
                    <Typography
                      variant="h6"
                      component="h6"
                      align="center"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "gray",
                      }}
                    >
                      No rows
                    </Typography>
                  )}
                  <DataGrid
                    rows={
                      ticketList.length > 0
                        ? ticketList
                        : [
                            {
                              id: 0,
                              ticketNo: "",
                              customerName: "",
                              customerMobile: "",
                              product: "",
                              model: "",
                              defect: "",
                              status: "",
                              action: "",
                            },
                          ]
                    }
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.ticketNo}
                    hideFooterPagination
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    className="custom-data-grid"
                  />
                  <CustomPagination
                    page={page}

                    totalRecords={totalRecords}

                    onPageChange={handlePageChange}
                    dataSize={dataSize}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Sidebar>
      <Footer />
      <TicketAcknowledgeModal
        isOpen={showModal}
        onClose={closeModal}
        ticket={selectedTicket}
      />
    </Box>
  );
};

export default TicketAcknowledge;
