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
  Button,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import {
  createRole,
  getEntityTypeListAPI,
  getRoleListAPI,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/common/CustomPagination";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
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

const Role = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabIndex, setTabIndex] = useState("two");
  const [entityTypes, setEntityTypes] = useState([]);
  const [uploadEntity, setUploadEntity] = useState("");
  const [viewEntity, setViewEntity] = useState("");
  const [tableData, setTableData] = useState([]);
  const [postData, setPostData] = useState({
    type: "",
    entityTypeID: "",
    roleID: "",
    roleName: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  // const [searchParams, setParams] = useState({
  //   ...postData,
  // });

  // const [page, setPage] = useState(1);
  // const [tatalRecords, setTotalRecords] = useState(1)
  // const [dataSize, setDataSize] = useState(5);

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);

  //   setParams((prevParams) => ({
  //     ...prevParams,
  //     pageIndex: newPage.toString(),
  //   }));
  // };

  const fetchEntityTypes = async () => {
    const data = await getEntityTypeListAPI();
    setEntityTypes(data.entityTypeList);
  };

  useEffect(() => {
    fetchEntityTypes();
  }, []);

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

  // const handleEntityDropdown = (event) => {
  //   const selectedValue = event.target.value;
  //   setUploadEntity(selectedValue);
  //   setPostData((prevState) => ({
  //     ...prevState,
  //     entityTypeID: selectedValue,
  //   }));
  // };

  const handleEntityDropdown = (event) => {
    const selectedValue = event.target.value;
    setPostData((prevData) => ({
      ...prevData,
      entityTypeID: selectedValue,
    }));
    // console.log(` event print :${selectedValue}`);
    setUploadEntity(selectedValue); // Maintain the previous state for uploadEntity if needed
  };

  const handleViewEntityDropdown = (event) => {
    const selectedValue = event.target.value;
    setViewEntity(selectedValue);
  };

  useEffect(() => {
    const fetchInitialRoles = async () => {
      try {
        const data = await getRoleListAPI("0");
        setTableData(data.roleList);
        // console.log(data.roleList);
      } catch (error) {
        console.error("Error fetching RoleListAPI on page load:", error);
      }
    };
    fetchInitialRoles();
  }, []);

  const handleSearch = async () => {
    try {
      const entityTypeID = viewEntity ? viewEntity : "0";
      const data = await getRoleListAPI(entityTypeID);
      setTableData(data.roleList);
    } catch (error) {
      console.error("Error fetching RoleDropdownListAPI:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const dataToPost = {
        type: editIndex === null ? "1" : "2",
        entityTypeID: uploadEntity,
        roleID: editIndex === null ? "0" : postData.roleID,
        roleName: postData.roleName,
      };

      console.log("Posting data:", dataToPost);

      const response = await createRole(dataToPost);
      console.log(response);
      alert(response.statusMessage);

      setPostData({
        type: "" /* 1: New, 2: Edit, 3: Status Update */,
        entityTypeID: "",
        roleID: "",
        roleName: "",
      });
      setEditIndex(null);
    } catch (err) {
      console.error("Error creating new role:", err);
    }

    fetchEntityTypes();
  };

  // const handleEdit = async (index) => {
  //   const roleToEdit = tableData[index];
  //   setEditIndex(index);
  //   setPostData({ ...roleToEdit, type: 2 });
  //   setUploadEntity(roleToEdit.entityTypeID);
  //   console.log("post data is ", postData);
  // };

  const handleActive = async (index) => {
    const roleToEdit = tableData[index];
    const updatedStatus = roleToEdit.status === "1" ? "0" : "1"; // Toggle status
    const updatedPostData = {
      ...roleToEdit,
      type: 3,
      status: updatedStatus, // Add the status to the payload
    };
    // const updatedPostData = {
    //   type: 3,
    //   entityTypeID: roleToEdit.entityTypeID, // Ensure correct field name
    //   roleID: roleToEdit.roleID,
    //   roleName: roleToEdit.roleName,
    //   status: updatedStatus, // Add the status to the payload
    // };

    try {
      await createRole(updatedPostData);
      fetchEntityTypes();
      console.log("Updated post data:", updatedPostData);
      // Update the local state to reflect the status change
      const newTableData = [...tableData];
      newTableData[index].status = updatedStatus;
      setTableData(newTableData);
    } catch (err) {
      console.error(
        "Error creating role:",
        err.response?.data || err.message || err
      );
    }
  };

  const handleEdit = (index) => {
    const roleToEdit = tableData[index];
    console.log(roleToEdit);

    setEditIndex(index);
    setPostData({ ...roleToEdit, type: 2 });
    handleEntityDropdown(roleToEdit.entityTypeID);
    setUploadEntity(roleToEdit.entityType);
  };

  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>User Base &gt; Role</Item>
          </Stack>
        </Box>
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
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs"
              variant={isSmallScreen ? "scrollable" : "standard"}
              scrollButtons={isSmallScreen ? "auto" : "off"}
              sx={{ "& .MuiTab-root:focus": { outline: "none" } }}
            >
              <Tab value="one" label="Entity" />
              <Tab value="two" label="Role" />
              <Tab value="three" label="User" />
            </Tabs>
          </Grid>

          <Grid container>
            <Grid item md={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Entity type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={postData.entityTypeID} // Bind to postData.entityTypeID
                  onChange={handleEntityDropdown}
                  label="Entity Type"
                  placeholder="Select"
                  autoWidth
                >
                  {entityTypes.length === 0 ? (
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
              <Box
                component="form"
                sx={{ "& > :not(style)": { width: "20ch" }, m: 1 }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Role Name"
                  variant="standard"
                  value={postData.roleName}
                  onChange={(e) =>
                    setPostData((prevState) => ({
                      ...prevState,
                      roleName: e.target.value,
                    }))
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent=""
            gap={2}
            sx={{ paddingTop: "4rem", m: 2 }}
          >
            <Grid item md={4}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  setPostData({
                    type: "" /* 1: New, 2: Edit, 3: Status Update */,
                    entityTypeID: "",
                    roleID: "",
                    roleName: "",
                  });
                  setEditIndex(null);
                }}
                sx={{
                  width: "15rem",
                  margin: "auto",
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
                onClick={handlePostRequest}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                {editIndex !== null ? "Update" : "Save"}
              </Button>
            </Grid>
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

          <Grid container sx={{ margin: "auto", justifyContent: "" }}>
            <Grid item md={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
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
                  autoWidth
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
          </Grid>
          <Grid container>
            <Button
              variant="contained"
              onClick={handleSearch}
              style={{
                width: "15rem",
                marginTop: "1.3rem",
                marginLeft: "0.5rem",
                outline: "none",
                "&:focues": { outline: "none" },
              }}
            >
              Search
            </Button>
          </Grid>

          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table" borderAxis="both">
                <TableHead
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "100%",
                    color: "red",
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Entity Type</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Role Name</TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={row.roleID}>
                      <TableCell>{row.entityType}</TableCell>
                      <TableCell>{row.roleName}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleActive(index)}
                          sx={{
                            outline: "none",
                            "&:focus": { outline: "none" },
                          }}
                        >
                          <img
                            src={
                              row.status === "1"
                                ? "/src/assets/activeBulb.svg"
                                : "/src/assets/inactiveBulb.svg"
                            }
                            alt={
                              row.status === "1"
                                ? "Active Bulb"
                                : "Inactive Bulb"
                            }
                            height={"20px"}
                            width={"20px"}
                          />
                        </IconButton>
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <CustomPagination
              pages={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              dataSize={dataSize}
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default Role;
