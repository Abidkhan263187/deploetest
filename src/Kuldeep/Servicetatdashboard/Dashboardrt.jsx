import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stackedchart from "./Stackedbardchart.jsx";
import Donutchart from "./Donutchart.jsx";
import "./Dashboard.css";
import Barchart from "./Barchart.jsx";
import Table from "./Table.jsx";
import Sidebar from "../../pages/Sidebar/Sidebar2.jsx";
import { Constants } from "../../constants/Constant.jsx";
import { useNavigate } from "react-router-dom";
import { TATDashboardAPI } from "../../API service/APIservice.jsx";
import Loader from "../../utils/Loader/Loader.jsx";
const backgroundClasses = [
  "app-box01",
  "app-box02",
  "app-box03",
  "app-box04",
  "app-box05",
  "app-box06",
  "app-box07",
  "app-box08",
];
const Dashboardrt = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedServiceCenter, setSelectedServiceCenter] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const [performanceDrawerData, setPerformanceDrawerData] = useState([]);
  const [tatDrawerData, setTatDrawerData] = useState([]);
  const [callDrawerData, setCallDrawerData] = useState([]);
  const [closedCallRespData, setClosedCallRespData] = useState([]);
  const [callStatsData, setCallStatsData] = useState([]);
  const [regionBucketData, setRegionBucketData] = useState([]);
  const [stpNSTPData, setStpNSTPData] = useState([]);
  const [selectedStateID, setSelectedStateID] = useState("0");
  const [loading, setLoading] = useState(false);

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

  const data = {
    "North India": {
      Delhi: {
        "New Delhi": [
          { name: "Service Center 1" },
          { name: "Service Center 2" },
        ],
      },
      Haryana: {
        Gurugram: [{ name: "Service Center 3" }, { name: "Service Center 4" }],
      },
    },
    "South India": {
      Karnataka: {
        Bengaluru: [
          { name: "Service Center 1" },
          { name: "Service Center 2" },
          { name: "Service Center 3" },
        ],
        Mysuru: [{ name: "Service Center 4" }, { name: "Service Center 5" }],
      },
      "Tamil Nadu": {
        Chennai: [
          { name: "Service Center 6" },
          { name: "Service Center 7" },
          { name: "Service Center 8" },
        ],
        Coimbatore: [
          { name: "Service Center 9" },
          { name: "Service Center 10" },
        ],
      },
    },
  };

  const dummyTATBody = {
    dateFrom: "2024-07-01",
    dateTo: "2024-07-31",
    regionID: "0",
    stateID: "0",
    cityID: "0",
    serviceCenterID: "0",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await TATDashboardAPI(dates); // Replace with your API endpoint
      console.log("response", response);

      // Set state with the fetched data
      setPerformanceDrawerData(response.performanceDrawerData || []);
      setTatDrawerData(response.tatDrawerData || []);
      setCallDrawerData(response.callDrawerData || []);
      setClosedCallRespData(response.closedCallRespData || []);
      setCallStatsData(response.callStatsData || []);
      setRegionBucketData(response.regionBucketData || []);
      setStpNSTPData(response.stpNSTPData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, [dates]);

  const handleSearch = () => {
    setDates({
      dateFrom: formatDate(startDate),
      dateTo: formatDate(endDate),
      stateID: selectedStateID,
    });
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedState("");
    setSelectedCity("");
    setSelectedServiceCenter("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
    setSelectedServiceCenter("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedServiceCenter("");
  };

  const handleServiceCenterChange = (event) => {
    setSelectedServiceCenter(event.target.value);
  };

  const renderStates = () => {
    if (selectedRegion) {
      const states = Object.keys(data[selectedRegion] || {});
      return states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ));
    }
    return null;
  };

  const renderCities = () => {
    if (selectedRegion && selectedState) {
      const states = data[selectedRegion];
      if (states) {
        const cities = Object.keys(states[selectedState] || {});
        return cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ));
      }
    }
    return null;
  };

  const renderServiceCenters = () => {
    if (selectedRegion && selectedState && selectedCity) {
      const states = data[selectedRegion];
      if (states) {
        const cities = states[selectedState];
        if (cities) {
          const serviceCenters = cities[selectedCity];
          if (serviceCenters) {
            return serviceCenters.map((center) => (
              <option key={center.name} value={center.name}>
                {center.name}
              </option>
            ));
          }
        }
      }
    }
    return null;
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, overflowX:"auto" }}>
      <Sidebar>
        {/* <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.Servicetatdashboard}
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
            display: "flex", // Ensures the grid behaves as a flex container
            flexWrap: "nowrap", // Prevents wrapping to ensure buttons stay in one row
            // justifyContent: "space-between", // Distributes space evenly between buttons
          }}
        >
          <Grid item>
            {" "}
            {/* Adjusted to ensure all buttons fit */}
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%", // Full width of flex item
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
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
                fontWeight: "inherit",
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
            <Col
              style={{ width: "100%", margin: "10px", overflow: "hidden" }}
              lg={12}
              md={10}
              sm={10}
            >
              <hr />
              <Row>
                <Col xs={12} md={8} lg={2}>
                  <Col className="app-dates app-h1">
                    From date :<span className="app-compulsory">*</span>
                  </Col>
                  <Row className="">
                    <DatePicker
                      className="date-picker w-100 p-1"
                      selected={startDate}
                      onChange={(sdate) => setStartDate(sdate)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </Row>
                </Col>
                <Col xs={12} md={8} lg={2}>
                  <Col className="app-dates app-h1">
                    To date :<span className="app-compulsory">*</span>
                  </Col>
                  <Row className="">
                    <DatePicker
                      className="date-picker w-100 p-1"
                      selected={endDate}
                      onChange={(edate) => setEndDate(edate)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </Row>
                </Col>
                <Col className="" xs={12} md={8} lg={2}>
                  <Col className="app-dates app-h1 ">Region: </Col>
                  <Col className="select-custom">
                    <select
                      id="placeSelector"
                      value={selectedRegion}
                      onChange={handleRegionChange}
                    >
                      <option value="">Select</option>
                      {Object.keys(data).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Col> 
                <Col className="" xs={12} md={8} lg={2}>
                  <Col className="app-dates app-h1 ">State :</Col>
                  <Col className="select-custom">
                    <select
                      id="placeSelector"
                      value={selectedState}
                      onChange={handleStateChange}
                      disabled={!selectedRegion}
                    >
                      <option value="">Select</option>
                      {renderStates()}
                    </select>
                  </Col>
                </Col>
                <Col className="" xs={12} md={8} lg={2}>
                  <Col className="app-dates app-h1">City: </Col>
                  <Col className="select-custom">
                    <select
                      id="placeSelector"
                      value={selectedCity}
                      onChange={handleCityChange}
                      disabled={!selectedState}
                    >
                      <option value="">Select</option>
                      {renderCities()}
                    </select>
                  </Col>
                </Col>
                <Col  xs={12} md={8} lg={2}>
                  <Col className="app-dates app-h1">ServiceCenter: </Col>
                  <Col className="select-custom">
                    <select
                      id="placeSelector"
                      value={selectedServiceCenter}
                      onChange={handleServiceCenterChange}
                      disabled={!selectedCity}
                    >
                      <option value="">Select</option>
                      {renderServiceCenters()}
                    </select>
                  </Col>
                </Col>
                <Col style={{marginTop:'2%'}}  xs={12} md={8} lg={2}>
                  <Button
                    variant="contained"
                    sx={{
                      background: " #28A745",
                      textTransform: "none",
                      marginRight:"3%"
                    }}
                    onClick={handleSearch}
                    className="app-search"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
              <Row className="ms-0 mt-3 me-1 ">
                <Col className="app-calls-box">
                  <Row style={{ fontSize: "large" }} className="mt-2 ms-0 mb-0">
                    Performance
                  </Row>
                  <Row className="d-flex flex-wrap">
                    {performanceDrawerData.map((data, index) => (
                      <Col
                        key={data.drawerID}
                        className={`dashboard-box ${
                          backgroundClasses[index % backgroundClasses.length]
                        }`}
                        style={{
                          height: "90px",
                          width: "100px",
                          margin: "10px",
                        }}
                      >
                        <Row
                          id="performance_box_mssg"
                          className="text-center d-block font-weight-600 mt-2"
                        >
                          {data.drawerText}
                        </Row>
                        <Row className="align-items-center justify-content-center">
                          {data.drawerValue}
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </Col>
                &nbsp; &nbsp; &nbsp;
                <Col className="app-calls-box">
                  <Row style={{ fontSize: "large" }} className="mt-2 ms-0 ">
                    Overall TAT
                  </Row>
                  <Row className="d-flex flex-wrap">
                    {tatDrawerData.map((data, index) => (
                      <Col
                        key={data.drawerID}
                        className={`dashboard-box ${
                          backgroundClasses[index % backgroundClasses.length]
                        }`}
                        style={{
                          height: "90px",
                          width: "100px",
                          margin: "10px",
                        }}
                      >
                        <Row
                          id="performance_box_mssg"
                          className="text-center d-block font-weight-600 mt-2"
                        >
                          {data.drawerText}
                        </Row>
                        <Row className="align-items-center justify-content-center">
                          {data.drawerValue}
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              <Row className="app-calls-box mt-3 me-1 ms-0">
                <Row style={{ fontSize: "large" }} className="ms-0 mt-2">
                  Calls
                </Row>
                <Row className="d-flex flex-wrap mt-2">
                  {callDrawerData.map((data, index) => (
                    <Col
                      key={data.drawerID}
                      className={`dashboard-box ${
                        backgroundClasses[index % backgroundClasses.length]
                      }`}
                      style={{
                        height: "90px",
                        width: "90px",
                        margin: "0px 15px 15px 10px ",
                      }}
                    >
                      <Row
                        id="performance_box_mssg"
                        className="text-center d-block font-weight-600 mt-2"
                      >
                        {data.drawerText}
                      </Row>
                      <Row className="align-items-center justify-content-center">
                        {data.drawerValue}
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Row>
              <Row className="mt-4">
                <Col className="app-piechartscol">
                  <Card className="app-cards me-2">
                    <Card.Body className="tableContainer">
                      <Donutchart closedCallRespData={closedCallRespData} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="app-cards me-2">
                    <Card.Body className="tableContainer">
                      <Stackedchart callStatsData={callStatsData} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-4 mb-5">
                <Col className="me-4 ms-1 tableContainer">
                  <Table regionBucketData={regionBucketData} />
                </Col>
                <Col>
                  <Card className="app-cards me-2">
                    <Card.Body className="tableContainer">
                      <Barchart stpNSTPData={stpNSTPData} />
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

export default Dashboardrt;
