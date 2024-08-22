import React, { useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar2";
import {
  Box,
  Grid,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import {
  getStateList_Dropdown,
  getCityListDropDown,
  createCity,
  getCityList,
} from "../../../API service/APIservice";
import CustomPagination from "../../../components/Pagination/Custompagination";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  // marginTop: `${theme.spacing(12.5)} !important`,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 700,
}));

const ManageCity = () => {
  const [editIndex, setEditIndex] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (newPage, newRowsPerPage) => {
    setPage(newPage);
    setRowsPerPage(newRowsPerPage);
  };

  // const [stateNames, setStateName] = useState("");
  const [stateList, setStateList] = useState([]);
  const [selectedStateAddPnl, setSelectedStateAddPnl] = useState("");
  const [selectedStateSrchPnl, setSelectedStateSrchPnl] = useState("");

  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [cityNames, setCityName] = useState("");
  const [TableRows, setTableRows] = useState([]);

  const [postData, setPostData] = useState({
    stateID: "",
    cityID: "",
    cityName: "",
    status: "",
    callType: "",
  });
  const [postSrchData, setPostSrchData] = useState({
    stateID: 0,
    cityID: 0,
    status: 2,
    callType: 0,
  });

  useEffect(() => {
    fetchStateListItems();
    fetchCityDataTable();
  }, []);

  useEffect(() => {
    fetchCityListItmes();
  }, [selectedStateSrchPnl]);

  const fetchStateListItems = async () => {
    try {
      const data = await getStateList_Dropdown();
      setStateList(data.stateMasterListData);
    } catch (err) {
      console.log("error- " + err);
    }
  };

  const fetchCityListItmes = async () => {
    try {
      postSrchData.stateID =
        selectedStateSrchPnl === 0 || selectedStateSrchPnl === ""
          ? 0
          : selectedStateSrchPnl;
      postSrchData.cityID = 0;
      postSrchData.status = 1;
      postSrchData.callType = 0;

      const data = await getCityList(postSrchData);
      setCityList(data.cityMasterList);

      setPostSrchData({
        stateID: 0,
        cityID: 0,
        status: 2,
        callType: 0,
      });
    } catch (err) {
      console.log("error- " + err);
    }
  };

  const fetchCityDataTable = async () => {
    try {
      postSrchData.stateID = 0;
      postSrchData.cityID = 0;
      postSrchData.status = 2;
      postSrchData.callType = 0;
      const data = await getCityList(postSrchData);

      setTableRows(data.cityMasterList);

      setPostSrchData({
        stateID: 0,
        cityID: 0,
        status: 2,
        callType: 0,
      });
    } catch (err) {
      console.log("error- " + err);
    }
  };

  const handleStateSelectionAddPnl = (e) => {
    setSelectedStateAddPnl(e.target.value);
  };

  const handleStateSrchPnl = (e) => {
    setSelectedStateSrchPnl(e.target.value);
  };
  const handleSaveCity = async () => {
    try {
      if (editIndex === null || editIndex === "") {
        postData.stateID = selectedStateAddPnl;
        postData.cityID = 0;
        postData.cityName = cityNames;
        postData.status = 1;
        postData.callType = 0;

        const response = await createCity(postData);

        if (response.statusCode === "200") {
          alert("success -" + response.statusMessage);
        } else if (response.statusCode === "401") {
          alert("unauthorised - " + response.statusMessage);
        } else {
          alert(response.statusMessage);
        }
      } else {
        postData.stateID = selectedStateAddPnl;
        postData.cityID = editIndex;
        postData.cityName = cityNames;
        postData.status = 1;
        postData.callType = 1;
        const response = await createCity(postData);

        if (response.statusCode === "200") {
          alert("success -" + response.statusMessage);
        } else if (response.statusCode === 401) {
          alert("unauthorised - " + response.statusMessage);
        } else {
          console.log("error came in else " + response.statusMessage);
          alert(response.statusMessage);
        }
      }

      setPostData({
        stateID: "",
        cityID: "",
        cityName: "",
        status: "",
        callType: "",
      });
      setCityName("");
      setSelectedStateAddPnl("");
      fetchCityDataTable();
      setEditIndex("");
    } catch (error) {
      console.log("exception -", error);
    }
  };

  const handleCitySelection = (e) => {
    // console.log(e.target.value);
    setSelectedCity(e.target.value);
  };

  const handleCitySearch = async () => {
    try {
      postSrchData.stateID =
        selectedStateSrchPnl === 0 || selectedStateSrchPnl === ""
          ? 0
          : selectedStateSrchPnl;
      postSrchData.cityID = selectedCity === "" ? 0 : selectedCity;

      postSrchData.status = 2;
      postSrchData.callType = 0;
      const data = await getCityList(postSrchData);

      setTableRows(data.cityMasterList);

      setPostSrchData({
        stateID: 0,
        cityID: 0,
        status: 2,
        callType: 0,
      });

      // setSelectedCity("");
      // setSelectedStateSrchPnl("");
    } catch (error) {
      console.log("error-", error);
    }
  };

  const handleStatus = async (cityId, index) => {
    const activeStatus = TableRows[index].status;

    try {
      postData.callType = 2;
      postData.stateID = 0;
      postData.cityID = cityId;
      postData.cityName = "";
      postData.status = activeStatus === 1 ? 0 : 1;

      console.log("postData");
      const response = await createCity(postData);

      if (response.statusCode === "200") {
        alert("success -" + response.statusMessage);
      } else if (response.statusCode === "401") {
        alert("unauthorised - " + response.statusMessage);
      } else {
        alert(response.statusMessage);
      }

      fetchCityDataTable();
    } catch (error) {
      console.log("error-", error);
    }
  };

  const handleEditCity = (cityId, index) => {
    console.log(TableRows[index]);

    const stateId =
      stateList.find((state) => state.stateName === TableRows[index].state)
        ?.stateID || "";
    setSelectedStateAddPnl(stateId);
    //setCityName(TableRows[index].name);
    setCityName(TableRows[index].city);
    setEditIndex(cityId);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setSelectedStateSrchPnl("");
    setSelectedCity("");
    fetchCityDataTable();
  };

  return (
    <Sidebar>
      <Grid container sx={{ padding: "15px" }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>Location {">"} City</Item>
          </Stack>
        </Box>
        <hr />

        <Grid
          sx={{
            background: "#EFF3FE",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "15px 10px 40px 10px",
          }}
        >
          <Grid
            sx={{
              marginLeft: "10px",
            }}
          >
            <p>Add City</p>
            <hr />

            <Box
              display="flex"
              alignItems="center"
              gap={10}
              my={1}
              mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <div>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, width: "80%", width: "20ch" }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedStateAddPnl}
                    onChange={handleStateSelectionAddPnl}
                    label="State"
                    placeholder="Select"
                    autoWidth
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
              </div>

              <div>
                <TextField
                  id="standard-basic"
                  label="City"
                  variant="standard"
                  value={cityNames}
                  onChange={(e) => {
                    setCityName(e.target.value);
                    //console.log(e.target.value);
                  }}
                />
              </div>
            </Box>

            <Grid item md={4} mt={4}>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSaveCity}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                  background: "#33499F",
                }}
              >
                {editIndex !== "" ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Search Panel */}

        <Grid
          sx={{
            background: "#EFF3FE",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <p className="ml-10">List View </p>
          <Box
            display="flex"
            alignItems="center"
            gap={4}
            my={1}
            mb={5}
            sx={{ flexWrap: "wrap" }}
          >
            <div>
              <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedStateSrchPnl}
                  onChange={handleStateSrchPnl}
                  label="State"
                  placeholder="Select"
                  autoWidth
                >
                  {stateList.length === 0 ? (
                    <MenuItem>
                      <em>--Select--</em>
                    </MenuItem>
                  ) : (
                    stateList.map((stateList) => (
                      <MenuItem
                        key={stateList.stateID}
                        value={stateList.stateID}
                      >
                        {stateList.stateName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedCity}
                  onChange={handleCitySelection}
                  label="State"
                  placeholder="Select"
                  autoWidth
                >
                  {cityList.length === 0 ? (
                    <MenuItem>
                      <em>--Select--</em>
                    </MenuItem>
                  ) : (
                    cityList.map((city) => (
                      <MenuItem key={city.cityId} value={city.cityId}>
                        {city.city}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>

            <div>
              <Button
                variant="contained"
                size="medium"
                onClick={handleCitySearch}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                  background: "#33499F",
                }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={handleCancel}
                sx={{
                  width: "15rem",
                  // margin: "auto",
                  marginLeft: "20px",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                  background: "#33499F",
                }}
              >
                Cancel
              </Button>
            </div>
            {/* </Grid> */}
          </Box>

          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#2255A4", textAlign: "center" }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>S.No</TableCell>
                    <TableCell style={{ color: "white" }}>State</TableCell>
                    <TableCell style={{ color: "white" }}>City</TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TableRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row, index) => (
                    <TableRow key={row.cityId}>
                      <TableCell component="th" scope="row">
                        {row.sNo}
                      </TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleStatus(row.cityId, index)}
                          sx={{ "&:focus": { outline: "none" } }}
                        >
                          {row.status === 1 ? (
                            <img
                              src="/src/assets/activeBulb.svg"
                              alt="active"
                              width="18"
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "2px",
                              }}
                            />
                          ) : (
                            <img
                              src="/src/assets/inactiveBulb.svg"
                              alt="active"
                              width="18"
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "2px",
                              }}
                            />
                          )}
                        </IconButton>
                        <IconButton
                          sx={{ "&:focus": { outline: "none" } }}
                          onClick={() => handleEditCity(row.cityId, index)}
                        >
                          <img
                            src="/src/assets/editIcon.svg"
                            alt="active"
                            width="20"
                            style={{
                              cursor: "pointer",
                              position: "relative",
                              top: "2px",
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CustomPagination
              count={TableRows.length}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </Sidebar>
  );
};

export default ManageCity;
