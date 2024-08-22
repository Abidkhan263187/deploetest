import { useEffect, useState } from "react";
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
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  createUserRole,
  getBrandListDropdown,
  getCityList,
  getEntityNameDropdown,
  getEntityTypeListAPI,
  getRoleDropdownListAPI,
  getStateList_Dropdown,
  getUserListAPI,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import { Pages } from "@mui/icons-material";
import CustomPagination from "../../../components/common/CustomPagination";
import config from "../../../components/common/config";

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

const colList = [
  "Entity Type",
  "Role Name",
  "Mobile No",
  "Email",
  "User Name",
  "Password",
  "Action",
];

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

const User = () => {
  const classes = useStyles();
  const pageSize = config.pageSize;
  console.log(`page size = ${pageSize}`);
  const dummyGetList = {
    userDetailID: "0",
    roleID: "0",
    name: "",
    email: "",
    mobile: "",
    status: 0,
    pageIndex: 1,
    pageSize: pageSize,
  };
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [tabIndex, setTabIndex] = useState("three");
  // const [value, setValue] = useState(2);
  const [entityTypes, setEntityTypes] = useState([]);
  const [roleTypes, setRoleTypes] = useState([]);
  const [selectedRoleType, setSelectedRoleType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [viewRole, setViewRole] = useState("");
  const [postData, setPostData] = useState({
    type: "" /* 1: New, 2: Edit, 3: Status Update */,
    userDetailID: "",
    entityTypeID: "",
    entityID: "",
    roleID: "",
    name: "",
    mobile: "",
    email: "",
    userName: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
    stateID: "",
    cityID: "",
    brandList: [],
  });
  const [editIndex, setEditIndex] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [entityNameList, setEntityNameList] = useState("");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  // const [searchParams, setSearchParams] = useState({ ...dummyGetList });
  const [dataSize, setDataSize] = useState(5);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setPostData((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };
  const fetchEntityTypes = async () => {
    const data = await getEntityTypeListAPI();
    setEntityTypes(data.entityTypeList);
  };

  const handleUserRoleDropdown = (event) => {
    setViewRole(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(`name is ${checked}`);
    const updatedCheckboxes = { ...checkboxes, [name]: checked };
    setCheckboxes(updatedCheckboxes);
    // setPostData(...postData,brandList)
    const allChecked = Object.values(updatedCheckboxes).every(Boolean);
    setSelectAll(allChecked);
    console.log("val is :", event.target.value);
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    const updatedCheckboxes = {};
    brandList.forEach((category) => {
      updatedCheckboxes[category.brandName] = checked;
    });
    setCheckboxes(updatedCheckboxes);
  };

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

  //  api call for role
  const fetchRoleType = async (entityType) => {
    const data = await getRoleDropdownListAPI(entityType);
    setRoleTypes(data.roleList);
  };
  // api call for user list
  const fetchUserList = async (page, pageSize) => {
    try {
      const data = await getUserListAPI(
        "0",
        "0",
        "",
        "",
        "",
        "0",
        page,
        pageSize
      );
      // console.log("setting list data", data.userList);
      setTableData(data.userList);
      setTotalRecords(data.totalRecords);
      console.log(`total records are : ${data.totalRecords}`);
      setDataSize(data.userList.length);
      // alert(data.userList.length);

      // console.log(`i am fetchuserlist`, data.userList);
    } catch (errr) {
      console.error("Error fetching UserListAPI on page load:", errr);
    }
  };
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
      const data = await getCityList(city);
      setCityList(data.cityMasterList);
    } catch (err) {
      console.log(`Error in calling city list dropdown ${err}`);
    }
  };
  const fetchBrandListItems = async () => {
    try {
      const data = await getBrandListDropdown();
      // console.log("data", data)
      setBrandList(data.brandMasterListData_Drpdwn);
    } catch (err) {
      console.log("error- ");
    }
  };
  // entity name api call
  const fetchEntityNameDropdown = async () => {
    try {
      const data = await getEntityNameDropdown();
      setEntityNameList(data.primaryEntityListData);
    } catch (er) {
      console.log(`Error in fetchng Entity name dropwond ${err}`);
    }
  };

  const handlePostReqest = async () => {
    try {
      const newPostData = { ...postData };

      if (editIndex === null) {
        newPostData.type = 1;
        newPostData.userDetailID = 0;
      } else {
        newPostData.type = 2;
        newPostData.userDetailID = tableData[editIndex]?.userDetailID || 0;
        console.log("new post data is ", newPostData);
      }

      // Get selected brand names
      const selectedBrandNames = Object.keys(checkboxes).filter(
        (key) => checkboxes[key]
      );
      newPostData.brandList = selectedBrandNames.map((name) => ({
        brandCode: name,
      }));

      const response = await createUserRole(newPostData);
      alert(response.statusMessage);

      // Reset form data
      setPostData({
        type: "",
        userDetailID: "",
        entityTypeID: "",
        entityID: "",
        roleID: "",
        name: "",
        mobile: "",
        email: "",
        userName: "",
        password: "",
        addressLine1: "",
        addressLine2: "",
        pinCode: "",
        stateID: "",
        cityID: "",
        brandList: [],
      });
      setEditIndex(null);
      setCheckboxes({});
      setSelectAll(false);

      fetchUserList(page, pageSize);
    } catch (err) {
      console.error(`Error in creating/updating user: ${err}`);
    }
  };
  // Editing the rows status
  const handleActive = async (index) => {
    const dataToEdit = tableData[index];
    const updatedStatus = dataToEdit.status === "1" ? "0" : "1";
    const updatedData = { ...dataToEdit, type: 3, status: updatedStatus };

    try {
      await createUserRole(updatedData);
      fetchRoleType();
      fetchUserList(page, pageSize);
      const newTableData = [...tableData];
      newTableData[index].status = updatedStatus;
      setTableData(newTableData);
    } catch (err) {
      console.error(`Error in updating user active/inactive status: ${err}`);
    }
  };
  // Editing table data
  const handleEdit = (index) => {
    const dataToEdit = tableData[index];
    const initialCheckboxes = {};
    dataToEdit.brandList.forEach((brand) => {
      initialCheckboxes[brand.brandName] = true;
      console.log("================", initialCheckboxes[brand.brandName]);
    });

    setCheckboxes(initialCheckboxes);
    console.log(" data to edit is", dataToEdit);
    setEditIndex(index);
    setPostData({ ...dataToEdit, type: 2 });

    console.log({ ...dataToEdit, type: 2 });
  };

  useEffect(() => {
    fetchUserList(page, pageSize);
    fetchEntityTypes();
    fetchRoleType(0);
    fetchStateListItems();
    fetchBrandListItems();
    fetchEntityNameDropdown();
  }, [page]);

  useEffect(() => {
    if (editIndex !== null) {
      const user = tableData[editIndex];
      if (user) {
        const initialCheckboxes = {};
        user.brandList.forEach((brandID) => {
          initialCheckboxes[brandID.brandName] = true;
        });
        // console.log("initialCheckboxes setting ",initialCheckboxes)
        setCheckboxes(initialCheckboxes);
        setSelectAll(user.brandList.length === brandList.length);
      }
    }
  }, [editIndex, tableData, brandList]);

  const handleSearch = async () => {
    try {
      console.log(`handle search clicked`);
      const roleID = viewRole ? viewRole : "0";
      const nameValue = name ? name : "";
      const emailValue = email ? email : "";
      const mobileNo = mobile ? mobile : "";
      const statusVal = status ? status : "0";
      const pageIndexes = 1;
      const pageSizes = 10;

      console.log("Search parameters:", {
        roleID,
        nameValue,
        emailValue,
        mobileNo,
        statusVal,
        pageIndexes,
        pageSizes,
      });

      const data = await getUserListAPI(
        "0",
        roleID,
        nameValue,
        emailValue,
        mobileNo,
        statusVal,
        pageIndexes,
        pageSizes
      );
      setDataSize(data.userList.length);
      setTotalRecords(data.totalRecords);
      console.log("API response data:", data);

      if (data && data.userList) {
        setTableData(data.userList);
        console.log("Updated table data:", data.userList);
      } else {
        console.error("Invalid data received:", data);
        setTableData([]);
      }
    } catch (err) {
      console.error("Error in handling search:", err);
    }
  };

  return (
    <Sidebar>
      {/* {console.log("initialCheckboxes", checkboxes)} */}
      <Grid container>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>User Base &gt; User</Item>
          </Stack>
        </Box>

        {/* --------------box3--------------- */}
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
            <Grid item md={2.4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  User Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={viewRole}
                  onChange={handleUserRoleDropdown}
                  label="User Role"
                  placeholder="Select"
                  autoWidth
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
                  label="name"
                  value={name}
                  variant="standard"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                  value={email}
                  variant="standard"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={mobile}
                  variant="standard"
                  onChange={(e) => {
                    setmobile(e.target.value);
                  }}
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
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  label="Status"
                  placeholder="Select"
                  // autoWidth
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={2}>Inactive</MenuItem>
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

          {/* TABLE FOR BOX3 */}
          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "rgba(51, 73, 159, 1)",
                    width: "100%",
                    color: "red",
                  }}
                >
                  <TableRow sx={{ backgroundColor: "#2255A4" }}>
                    {colList.map((cell, index) => (
                      <TableCell key={index} sx={{ color: "#fff" }}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.length === 0 ? (
                    <TableCell colSpan={7}>
                      <p>No Records Found</p>
                    </TableCell>
                  ) : (
                    tableData.map((row, index) => (
                      <TableRow key={row.roleID}>
                        <TableCell>{row.entityType}</TableCell>
                        <TableCell>{row.roleName}</TableCell>
                        <TableCell>{row.mobile}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell align="right">
                          {/* active icon */}
                          <IconButton
                            onClick={() => handleActive(index)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              // src="/src/assets/activeBulb.svg"
                              src={
                                row.status === "1"
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt="Active Bulb"
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                          {/* edit icon */}
                          <IconButton
                            onClick={() => handleEdit(index)}
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
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container sx={{ width: "100%", paddingBottom: "20px" }}>
              <Grid item sx={{ width: "100%", paddingBottom: "20px" }}>
                <CustomPagination
                  page={page}
                  totalRecords={totalRecords}
                  onPageChange={handlePageChange}
                  dataSize={dataSize}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default User;
