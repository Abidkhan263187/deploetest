import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import PieChart from "./PieChart";
import Stackedchart from "./Stackedchart";
import Issuestatewisechart from "./Issuestatewisechart";
import "./Dashboard.css";
import DatePicker from "react-datepicker";
import Barchart from "./Barchart";
import Sidebar from "../../../pages/Sidebar/Sidebar2";
import { Constants } from "../../../constants/Constant";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { repairDashboardAPI } from "../../../API service/APIservice";
import Loader from "../../../utils/Loader/Loader";

// Mapping of state names to IDs
const stateIDMapping = {
  Assam: 0,
  "Arunachal Pradesh": 1,
  "Andhra Pradesh": 2,
  Bihar: 3,
  Chhattisgarh: 4,
  Goa: 5,
  Gujarat: 6,
  Haryana: 7,
  "Himachal Pradesh": 8,
  Jharkhand: 9,
  Karnataka: 10,
  Kerala: 11,
  "Madhya Pradesh": 12,
  Maharashtra: 13,
  Manipur: 14,
  Meghalaya: 15,
  Mizoram: 16,
  Nagaland: 17,
  Odisha: 18,
  Punjab: 19,
  Rajasthan: 20,
  Sikkim: 21,
  "Tamil Nadu": 22,
  Telangana: 23,
  Tripura: 24,
  "Uttar Pradesh": 25,
  Uttarakhand: 26,
  "West Bengal": 27,
};

const Dashboard = () => {
  const [selectedStateID, setSelectedStateID] = useState("0");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const indianStates = Object.keys(stateIDMapping); // Use keys for state names

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [dates, setDates] = useState({
    dateFrom: formatDate(startDate),
    dateTo: formatDate(endDate),
    stateID: selectedStateID,
  });
  const [drawerStatusData, setDrawerStatusData] = useState([]);
  const [problemWiseData, setProblemWiseData] = useState([]);
  const [stateWiseData, setStateWiseData] = useState([]);
  const [actionTakenData, setActionTakenData] = useState([]);
  const [callStatsData, setCallStatsData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let dashData = await repairDashboardAPI(dates);
        console.log(dashData);
        setDrawerStatusData(dashData.drawerStatusData);
        setProblemWiseData(dashData.problemWiseData);
        setStateWiseData(dashData.stateWiseData);
        setActionTakenData(dashData.actionTakenData);
        setCallStatsData(dashData.callStatsData);
      } catch (error) {
        console.log("error while getting dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dates]);

  const handleChange = (event) => {
    const stateName = event.target.value;
    const stateID = stateIDMapping[stateName] || "0"; // Default to "0" if stateName is not found
    setSelectedStateID(stateID);
  };

  const handleSearch = () => {
    setDates({
      dateFrom: formatDate(startDate),
      dateTo: formatDate(endDate),
      stateID: selectedStateID,
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Sidebar>
        {/* <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.Repairdashboard}
        </Typography> */}
        <Divider />
        {loading && <Loader />}
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
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Grid item sx={{ flexBasis: "30%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/repairdashboard");
              }}
            >
              Repair Dashboard
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "30%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/dashboardrt");
              }}
            >
              TAT Dashboard
            </Button>
          </Grid>
        </Grid>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <hr />
              <Row
                className="mt-2 d-flex align-items-end"
                style={{ gap: "10px" }}
              >
                <Col lg={2} md={4} sm={6} xs={10} className="mb-2">
                  <div className="app-dates">
                    From Date:<span className="app-compulsory">✱</span>
                  </div>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(sdate) => setStartDate(sdate)}
                      dateFormat="dd/MM/yyyy"
                      className="date-picker w-100"
                    />
                  </div>
                </Col>
                <Col lg={2} md={4} sm={6} xs={10} className="mb-2">
                  <div className="app-dates">
                    To Date:<span className="app-compulsory">✱</span>
                  </div>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(edate) => setEndDate(edate)}
                      dateFormat="dd/MM/yyyy"
                      className="date-picker w-100"
                    />
                  </div>
                </Col>
                <Col lg={2} md={4} sm={6} xs={10} className="mb-2">
                  <div className="app-dates">State:</div>
                  <div>
                    <div className="select-custom">
                      <select
                        id="states"
                        value={Object.keys(stateIDMapping).find(
                          (key) => stateIDMapping[key] === selectedStateID
                        )}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {indianStates.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  id="searchBtnDsh"
                  className="mb-2 d-flex justify-content-start"
                >
                  <Button
                    variant="contained"
                    sx={{
                      background: " #28A745",
                      textTransform: "none",
                    }}
                    className="app-search"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
              <Row className="app-calls-box mt-3 me-1 ms-0">
                <Row id="calls" className="ms-0 mt-2 font">
                  Calls
                </Row>
                <Row className="mt-3 ms-0 mb-0 d-flex flex-wrap">
                  {drawerStatusData.length > 0 &&
                    drawerStatusData.map((title, index) => (
                      <Col
                        key={index}
                        lg={1}
                        md={2}
                        sm={4}
                        xs={4}
                        style={{ width: "105px", height: "110px" }}
                        className={`app-box${
                          index + 1
                        } me-4 mb-3 justify-content-between p-2`}
                      >
                        <Row
                          style={{ fontSize: "12px" }}
                          className="justify-content-center app-boxh text-center mt-2"
                        >
                          {title.drawerText}
                        </Row>
                        <Row className="align-items-center justify-content-center">
                          {title.drawerValue}
                        </Row>
                      </Col>
                    ))}
                </Row>
              </Row>
              <Row className="mt-4">
                <Col lg={6} md={12} sm={12} className="mb-2 p-1">
                  <Card className="app-cards me-1">
                    <Card.Body className="tableContainer">
                      <PieChart problemWiseData={problemWiseData} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6} md={12} sm={12} className="mb-2">
                  <Card className="app-cards me-1 mt-1">
                    <Card.Body className="tableContainer">
                      <Issuestatewisechart stateWiseData={stateWiseData} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={6} md={12} sm={12} className="mb-2 p-1">
                  <Card className="app-cards me-1">
                    <Card.Body className="tableContainer">
                      <Barchart actionTakenData={actionTakenData} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6} md={12} sm={12} className="mb-2">
                  <Card className="app-cards me-1 mt-1">
                    <Card.Body className="tableContainer">
                      <Stackedchart callStatsData={callStatsData} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Sidebar>
    </Box>
  );
};

export default Dashboard;
