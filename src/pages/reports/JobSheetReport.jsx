import Sidebar from "../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import "./jobSheetReports.css";

import CustomDatePicker from "../../utils/DatePicker/CustomDatePicker";
import { Constants } from "../../constants/Constant";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import apiClient, {
  fetchServiceCenterDropdown,
  getDateTypeDropdown,
  getEngineerDropdown,
  getEntityTypeListAPI,
  getJobStatus,
  getRegionDropdown,
  getStateList_Dropdown,
  getWarrantyDropdown,
} from "../../API service/APIservice";
import exportToExcel from "../../components/Export to excel/ExportToExcel";
const JobSheetReport = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [regionList, setRegionList] = useState([]);
  const [region, setRegion] = useState("");
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState("");
  const [warranty, setWarranty] = useState("");
  const [warrantyList, setWarrantyList] = useState([]);
  const [jobStatusList, setJobStatusList] = useState([]);
  const [jobStatus, setJobStatus] = useState("");
  const [dateTypeList, setDateTypeList] = useState([]);
  const [date, setDate] = useState("");
  const [entityTypes, setEntityTypes] = useState([]);
  const [entityVal, setEntityVal] = useState("");
  const [serviceCenterList, setServiceCenterList] = useState([]);
  const [serviceCenter, setServiceCenter] = useState("");
  const [engineerList, setEngineerList] = useState([]);
  const [EngineerName, setEngineerName] = useState("");

  const data = [
    { name: "John Doe", age: 28, city: "New York" },
    { name: "Jane Smith", age: 34, city: "Los Angeles" },
    // Add more data as needed
  ];
  const handleExport = () => {
    console.log(`I am clicked`);
    exportToExcel(data, "MyData");
  };
  //   api call for region
  const fetchRegionDropdown = async () => {
    try {
      const data = await getRegionDropdown("0");
      setRegionList(data.regionList);
    } catch (err) {
      console.log(`Error fetching region dropdown ${err}`);
      throw err;
    }
  };

  // api call for state
  const getStateDropdown = async () => {
    try {
      const data = await getStateList_Dropdown();
      setStateList(data.stateMasterListData);
    } catch (err) {
      console.log(`Error fetching state dropdown ${err}`);
      throw err;
    }
  };

  //   api call for warranty
  const fetchWarrantyDropdown = async () => {
    try {
      const data = await getWarrantyDropdown();
      setWarrantyList(data.warrantyStatusList);
    } catch (err) {
      console.log(`Error fetching warranty dropdown ${err}`);
      throw err;
    }
  };
  //   api call for job status
  const fetchJobStatusDropdown = async () => {
    try {
      const data = await getJobStatus();
      setJobStatusList(data.jobsheetStatusList);
    } catch (err) {
      console.log(`Error fetching job status dropdown ${err}`);
      throw err;
    }
  };
  // api call for date type
  const fetchDateTypeDropdown = async () => {
    try {
      const data = await getDateTypeDropdown();
      setDateTypeList(data.dateTypeList);
    } catch (err) {
      console.log(`Error fetching date type dropdown ${err}`);
      throw err;
    }
  };
  const fetchEntityTypes = async () => {
    try {
      const data = await getEntityTypeListAPI();
      setEntityTypes(data.entityTypeList);
    } catch (err) {
      console.log("Error in fetching entity types");
      throw err;
    }
  };

  //   api call for service center
  const getServiceCenterDropdown = async () => {
    try {
      // const entityTypeID = entityVal ? entityVal :""
      const data = await fetchServiceCenterDropdown("0", "0");
      setServiceCenterList(data.serviceCenterList);
    } catch (err) {
      console.log("Error in fetching service center dropdown");
      throw err;
    }
  };
  // api call for engineer
  const fetchEngineerDropdown = async (serviceID) => {
    try {
      const data = await getEngineerDropdown(serviceID);
      setEngineerList(data.engineerList);
    } catch (err) {
      console.log(`Error fetching engineer dropdown ${err}`);
      throw err;
    }
  };
  useEffect(() => {
    fetchRegionDropdown();
    getStateDropdown();
    fetchWarrantyDropdown();
    fetchJobStatusDropdown();
    fetchDateTypeDropdown();
    fetchEntityTypes();
    getServiceCenterDropdown();
    fetchEngineerDropdown();
  }, []);
  return (
    <Sidebar>
      <Grid container>
        {/* tabs  */}
        <Grid
          className="tabs"
          container
          //   spacing={}
          gap={3}
          sx={{
            background: "#F5F8FF",
            margin: "10px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
            display: "flex",
            flexWrap: "nowrap",
            // justifyContent: "center",
          }}
        >
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                height: "auto",
                fontWeight: "600",
                fontSize: "small",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "x-small",
                  padding: theme.spacing(0.5, 1),
                },
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/reports/jobsheetreports");
              }}
            >
              Jobsheet Master
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="medium"
              fullWidth
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                fontSize: "small",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "x-small",
                  padding: theme.spacing(0.5, 1),
                  width: "100%",
                },
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/reports/opencallreports");
              }}
            >
              Open Call
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                fontSize: "small",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "x-small",
                  padding: theme.spacing(0.5, 1),
                },
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/reports/storestockreports");
              }}
            >
              Store Stock
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                fontSize: "small",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "x-small",
                  padding: theme.spacing(0.5, 1),
                },
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/reports/engineerstockreports");
              }}
            >
              Engineer Stock
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                fontSize: "small",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "x-small",
                  padding: theme.spacing(0.5, 1),
                },
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/reports/cannibalizationreports");
              }}
            >
              Cannibalization
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            background: "#EFF3FE",
            marginLeft: "10px",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
          }}
        >
          <Grid container flex-basis={"auto"}>
            <Grid item xs={4} sm={4} md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Service Center
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={serviceCenter}
                  onChange={(e) => {
                    setServiceCenter(e.target.value);
                    fetchEngineerDropdown(e.target.value);
                  }}
                  label="Service Center"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {serviceCenterList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    serviceCenterList.map((center) => (
                      <MenuItem
                        key={center.serviceCenterID}
                        value={center.serviceCenterID}
                      >
                        {center.serviceCenterName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Engineer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={EngineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  label="Engineer"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {engineerList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    engineerList.map((center) => (
                      <MenuItem
                        key={center.engineerID}
                        value={center.engineerID}
                      >
                        {center.engineerFullName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Region
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  label="Entity Type"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {regionList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    regionList.map((region) => (
                      <MenuItem key={region.regionID} value={region.regionID}>
                        {region.regionName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Date Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={date} // Bind to postData.entityTypeID
                  onChange={(e) => setDate(e.target.value)}
                  label="Date Type"
                  placeholder="Select"
                  sx={{ minWidth: "280px" }}
                >
                  {dateTypeList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    dateTypeList.map((date) => (
                      <MenuItem key={date.dateTypeID} value={date.dateTypeID}>
                        {date.dateType}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ minWidth: "200px", maxWidth: "280px" }}
                >
                  <DatePicker />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ minWidth: "200px", maxWidth: "280px" }}
                >
                  <DatePicker />
                </DemoContainer>
              </LocalizationProvider>
            </Grid> */}
            <Grid item xs={4}>
              <CustomDatePicker label={Constants.fromDate} />
            </Grid>

            <Grid item xs={4}>
              <CustomDatePicker label={Constants.toDate} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={4}>
              <TextField
                id="standard-basic"
                label="Model Name"
                variant="standard"
                sx={{ minWidth: "280px" }}
              />
            </Grid>
            <Grid item md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="Entity Type"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {stateList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    stateList.map((state) => (
                      <MenuItem key={state.stateID} value={state.stateID}>
                        {state.stateName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Warranty
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  label="Warranty"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {warrantyList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    warrantyList.map((warranty) => (
                      <MenuItem
                        key={warranty.warrantyStatusID}
                        value={warranty.warrantyStatusID}
                      >
                        {warranty.warrantyStatus}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}></Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Entity Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={entityVal} // Bind to postData.entityTypeID
                  onChange={(e) => setEntityVal(e.target.value)}
                  label="Entity Type"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {entityTypes.length == 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    entityTypes.map((entityType) => (
                      <MenuItem
                        key={entityType.entityTypeID}
                        value={entityType.entityTypeID}
                      >
                        {entityType.entityType}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Job Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={jobStatus} // Bind to postData.entityTypeID
                  onChange={(e) => setJobStatus(e.target.value)}
                  label="Job Status"
                  placeholder="Select"
                  //   autoWidth
                  sx={{ minWidth: "280px" }}
                >
                  {jobStatusList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    jobStatusList.map((job) => (
                      <MenuItem
                        key={job.jobsheetStatusID}
                        value={job.jobsheetStatusID}
                      >
                        {job.jobsheetStatus}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}></Grid>
          </Grid>
          <Grid container>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleSubmit}
                sx={{ mt: 3 }}
                onClick={handleExport}
              >
                Export to Excel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Sidebar>
  );
};

export default JobSheetReport;
