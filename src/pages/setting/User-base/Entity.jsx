import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./entity.css";
import axios from "axios";
import {
  getBrandListDropdown,
  getCityList,
  getEntityTypeListAPI,
  getRoleDropdownListAPI,
  getRoleListAPI,
  getStateList_Dropdown,
} from "../../../API service/APIservice";
import { Category } from "@mui/icons-material";
import Sidebar from "../../Sidebar/Sidebar2";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

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

const useStyles = makeStyles({
  labelPlacementStart: {
    flexDirection: "row-reverse",
  },
});

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Entity = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState("one");
  const [age, setAge] = useState();
  // const [checkboxes, setCheckboxes] = useState({
  //   Category1: false,
  //   Category2: false,
  //   Category3: false,
  //   Category4: false,
  // });

  // const [selectAll, setSelectAll] = useState("");
  const [entityTypes, setEntityTypes] = useState([]);
  const [uploadEntity, setUploadEntity] = useState("");
  const [viewEntity, setViewEntity] = useState("");
  const [roleTypes, setRoleTypes] = useState([]);
  const [selectedRoleType, setSelectedRoleType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    entityName: "",
    email: "",
    mobileNo: "",
    status: "",
  });
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const [brandList, setBrandList] = useState([]);
  const [stateName, setStateName] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityList, setCityList] = useState([]);

  const fetchStateListItems = async () => {
    try {
      const data = await getStateList_Dropdown();
      setStateList(data.stateMasterListData);
      // fetchCityDropdown(data.stateID);
      // console.log(data.stateMasterListData);
      // console.log(selectedStateAddPnl.stateID)
    } catch (err) {
      console.log("error- " + err);
    }
  };
  const fetchCityDropdown = async (stateID) => {
    try {
      const city = {
        stateID: stateID,
        cityID: 0,
        status: 2,
        callType: 0,
      };
      console.log(`city is rendered`);
      const data = await getCityList(city);
      setCityList(data.cityMasterList);
      console.log("city list is :", data.cityMasterList);
    } catch (err) {
      console.log(`Error in calling city list dropdown ${err}`);
    }
  };

  const fetchRoleType = async (entityType) => {
    const data = await getRoleDropdownListAPI(entityType);
    console.log(data.roleList);
    setRoleTypes(data.roleList);
    console.log(roleTypes);
  };

  // const fetchRoleList = async (entityType) => {
  //   const data = await getRoleListAPI();
  //   setTableData(data.roleList);
  //   console.log(data.roleList);
  // };
  const fetchBrandListItems = async () => {
    try {
      const data = await getBrandListDropdown();
      setBrandList(data.brandMasterListData_Drpdwn);
      // console.log(data.brandMasterListData_Drpdwn);
    } catch (err) {
      console.log("error- ");
    }
  };

  const fetchEntityTypes = async () => {
    try{

      const data = await getEntityTypeListAPI();
      setEntityTypes(data.entityTypeList);
    }
    catch(err) {
      console.log(`Error in fetching entity types ${err}`);
      throw err
    }
  };
  useEffect(() => {
    fetchEntityTypes();
    fetchBrandListItems();
    fetchStateListItems();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_REACT_BASE_URL}/GetEntityTypeListAPI/1`, {
  //       headers: {
  //         authKey: "52eb0bf5-248d-4eb1-8eab-59dd7c5602d5",

  //       },
  //     })
  //     .then((response) => {
  //       setEntityTypes(response.data.entityTypeList);
  //     })
  //     .catch((error) => console.error("Error fetching entity types:", error));
  // }, []);

  // useEffect(() => {
  //   console.log("Updated entityTypes:", entityTypes); // Log entityTypes after it is updated
  // }, [entityTypes]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    if (newValue === "one") {
      navigate("/setting/userbase/entity");
    } else if (newValue === "two") {
      navigate("/setting/userbase/role");
    } else if (newValue === "three") {
      navigate("/setting/userbase/user");
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedCheckboxes = { ...checkboxes, [name]: checked };
    setCheckboxes(updatedCheckboxes);

    const allChecked = Object.values(updatedCheckboxes).every(Boolean);
    setSelectAll(allChecked);
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    const updatedCheckboxes = {};
    brandList.forEach((category) => {
      updatedCheckboxes[category.brandID] = checked;
    });
    setCheckboxes(updatedCheckboxes);
  };

  const handleRoleDropdown = (event) => {
    const selectedValue = event.target.value;
    setSelectedRoleType(selectedValue);
  };
  const handleEntityDropdown = (event) => {
    const selectedValue = event.target.value;
    setUploadEntity(selectedValue);
    fetchRoleType(selectedValue);
  };
  const handleViewEntityDropdown = (event) => {
    const selectedValue = event.target.value;
    setViewEntity(selectedValue);
  };

  // useEffect(() => {
  //     if (editIndex !== null) {
  //       const user = tableData[editIndex];
  //       if (user) {
  //         const initialCheckboxes = {};
  //         user.brandList.forEach((brandID) => {
  //           initialCheckboxes[brandID] = true;
  //         });
  //         setCheckboxes(initialCheckboxes);
  //         setSelectAll(user.brandList.length === brandList.length);
  //       }
  //     }
  //   }, [editIndex, tableData, brandList]);
  useEffect(() => {
    const fetchInitialRoles = async () => {
      try {
        const data = await getRoleListAPI("0");
        setTableData(data.roleList);
      } catch (error) {
        console.error("Error fetching RoleListAPI on page load:", error);
      }
    };
    fetchInitialRoles();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      const entityTypeID = viewEntity ? viewEntity : "0";

      // Call getRoleListAPI with the entityTypeID
      const data = await getRoleListAPI(entityTypeID);

      // Filter the role list based on searchParams, ensuring optional parameters are handled correctly
      const filteredRoles = data.roleList.filter((role) => {
        const matchesEntityName =
          !searchParams.entityName ||
          (role.entityName &&
            role.entityName.includes(searchParams.entityName));
        const matchesEmail =
          !searchParams.email ||
          (role.email && role.email.includes(searchParams.email));
        const matchesMobileNo =
          !searchParams.mobileNo ||
          (role.mobileNo && role.mobileNo.includes(searchParams.mobileNo));
        const matchesStatus =
          !searchParams.status || role.status === searchParams.status;

        return (
          matchesEntityName && matchesEmail && matchesMobileNo && matchesStatus
        );
      });

      // Update the table data with the filtered roles if there is data matching all the filters, otherwise, set an empty array
      setTableData(filteredRoles.length > 0 ? filteredRoles : []);
      console.log(filteredRoles);
    } catch (error) {
      console.error("Error fetching RoleDropdownListAPI:", error);
    }
  };

  return (
    <Sidebar>
      <Grid container>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>User Base &gt; Entity type</Item>
          </Stack>
        </Box>

        {/* ----------------Box 1---------------------- */}

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
          <Grid
            container
            sx={{ borderBottom: 1, borderBottomColor: "lightgrey" }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              textColor="Primary"
              indicatorColor="primary"
              aria-label="secondary tabs"
              sx={{
                "& .MuiTab-root:focus": {
                  outline: "none",
                },
              }}
            >
              <Tab value="one" label="Entity Type" />
              <Tab value="two" label="Role" />
              <Tab value="three" label="User" />
            </Tabs>
          </Grid>

          <Grid container spacing={2} direction="row">
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                // sx={{ m: 1, width: "22ch", minWidth: "100px" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Entity Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={uploadEntity}
                  onChange={handleEntityDropdown}
                  label="Entity Type"
                  placeholder="Select"
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
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "225ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "87%" }}
                  id="standard-basic"
                  label="Entity Name"
                  c
                  variant="standard"
                />
              </Box>
            </Grid>

            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedRoleType}
                  onChange={handleRoleDropdown}
                  label="Role"
                  placeholder="Select"
                >
                  {roleTypes.length == 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    roleTypes.map((roleType) => (
                      <MenuItem key={roleType.roleID} value={roleType.roleID}>
                        {roleType.roleName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Address Line 1"
                  variant="standard"
                />
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "20ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Address Line 2"
                  variant="standard"
                />
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Pincode"
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "20ch", minWidth: "100px" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={postData.stateID}
                  // onChange={(e) => {
                  //   setPostData({
                  //     ...postData,
                  //     stateID: e.target.value,
                  //   });
                  //   fetchCityDropdown(e.target.value);
                  // }}

                  value={stateName}
                  onChange={(e) => {
                    setStateName(e.target.value);
                    fetchCityDropdown(e.target.value);
                  }}
                  label="State"
                  placeholder="Select"
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
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "20ch", minWidth: "100px" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={postData.cityID}
                  // onChange={(e) => {
                  //   setPostData({
                  //     ...postData,
                  //     cityID: e.target.value,
                  //   });
                  // }}

                  value={cityName}
                  onChange={(e) => {
                    setCityName(e.target.value);
                  }}
                  label="City"
                  placeholder="Select"
                >
                  {cityList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
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
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Contact Person Name"
                  variant="standard"
                />
              </Box>
            </Grid>

            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Mobile No"
                  variant="standard"
                />
              </Box>
            </Grid>

            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Service Tax No"
                  variant="standard"
                />
              </Box>
            </Grid>

            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Pan No"
                  variant="standard"
                />
              </Box>
            </Grid>
            {/* ----------------date------------------- */}
            {/*             
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker" />
                  </DemoContainer>
            </LocalizationProvider>
            */}

            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="GSTIN No"
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>

          {/*brand checkboxes */}
          <Grid container>
            <Grid Grid item>
              <Box component="section" sx={{ p: 1, marginTop: "5px" }}>
                Brand Mapping
              </Box>
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={selectAll} />}
                  value={selectAll}
                  onChange={handleSelectAllChange}
                  label="Select All"
                  sx={{ p: "10px" }}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid container>
            <FormControl component="fieldset">
              <Grid item>
                <FormGroup row>
                  {brandList.map((category) => (
                    <Grid
                      item
                      xs={4}
                      md={3}
                      sx={{ alignContent: "flex-start" }}
                      key={category.brandID} // Corrected key to use brandID
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkboxes[category.brandID] || false} // Set checked state based on checkboxes state
                            onChange={(e)=>{
                              // console.log(`inside scheckboxes ${e.target}`)
                              console.log(`working`)
                              handleCheckboxChange
                            }} // Handle individual checkbox change
                            name={category.brandID.toString()}
                            
                          />
                        }
                        label={category.brandName}
                        sx={{ margin: "0 50px 10px 0px" }}
                        classes={{
                          labelPlacementStart: classes.labelPlacementStart,
                        }}
                      />
                    </Grid>
                  ))}
                </FormGroup>
              </Grid>
            </FormControl>
          </Grid>
          {/* buttons */}
          <Grid container spacing={2}>
            <Grid container justifyContent="center">
              <Grid item j md={4}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    width: "15.625rem",
                    margin: "5px",
                    outline: "none",
                    "&:focus": { outline: "none" },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    width: "15.625rem",
                    margin: "5px",
                    outline: "none",
                    "&:focus": { outline: "none" },
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* -----------------------------Box 2-------------------------- */}
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
          <Grid>
            <InputLabel sx={{ fontWeight: "600", margin: "0" }}>
              Bulk Upload
            </InputLabel>
          </Grid>

          <Grid container sx={{ margin: "15px 0" }}>
            <label>Upload</label>
          </Grid>
          <Grid container spacing={2}>
            {/* <Grid item gap={2}> */}
            <Grid item xs={12} sm={6} md={3}>
              {/* <input type="file" /> */}

              {/* latest code */}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ justifyContent: "center" }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} md={2}>
              <Button
                variant="contained"
                sx={{ width: "9.5rem", "&:focus": { outline: "none" } }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ justifyContent: "center" }}>
              <Link href="#" underline="none">
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="#" underline="none">
                {"Download Reference Code"}
              </Link>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>
        {/* -----------------------------Box 3-------------------------- */}
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
          <Grid>
            <label>List View</label>
          </Grid>

          <Grid container sx={{ margin: "auto", justifyContent: "center" }}>
            <Grid item md={2}>
              <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Entity Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={viewEntity}
                  onChange={handleViewEntityDropdown}
                  label="Entity Type"
                  placeholder="Select"
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

            <Grid item md={2.4}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Entity Name"
                  variant="standard"
                  onChange={handleSearchChange}
                />
              </Box>
            </Grid>
            <Grid item md={2.4}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={handleSearchChange}
                />
              </Box>
            </Grid>
            <Grid item md={2.4}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Mobile No"
                  variant="standard"
                  onChange={handleSearchChange}
                />
              </Box>
            </Grid>
            <Grid item md={2.4}>
              <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  label="Age"
                  placeholder="Select"
                  onChange={handleSearchChange}
                  // autoWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/*  search button  */}
          <Grid container gap={2}>
            <Button
              variant="contained"
              onClick={handleSearch}
              style={{
                width: "120px",
                margin: "5px 7px",
                outline: "none",
                "&:focus": { outline: "none" },
              }}
            >
              Search
            </Button>
          </Grid>

          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            {/* TABLE FOR BOX3 */}

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "100%",
                    color: "red",
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Entity Type</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Entity Names</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Primary Entity</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Mobile No</TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.roleID}>
                      <TableCell>{row.entityType}</TableCell>
                      <TableCell>{row.roleName}</TableCell>
                      <TableCell>{row.roleName}</TableCell>
                      <TableCell>{row.roleName}</TableCell>
                      <TableCell>{row.roleName}</TableCell>
                      <TableCell align="right">
                        {/* active icon */}
                        <IconButton
                          onClick={() => handleActive(rowId)}
                          sx={{
                            outline: "none",
                            "&:focus": { outline: "none" },
                          }}
                        >
                          <img
                            src="/src/assets/activeBulb.svg"
                            alt="Active Bulb"
                            height={"20px"}
                            width={"20px"}
                          />
                        </IconButton>
                        {/* edit icon */}
                        <IconButton
                          onClick={() => handleEdit(rowId)}
                          sx={{
                            outline: "none",
                            "&:focus": { outline: "none" },
                          }}
                        >
                          <img
                            src="/src/assets/edit.svg"
                            alt="Edit"
                            height={"20px"}
                            width={"20px"}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Sidebar>
  );
};

export default Entity;
