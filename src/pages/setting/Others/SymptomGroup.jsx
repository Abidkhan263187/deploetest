import React, { useEffect, useState } from "react";
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
import {
  createSymptomGroup,
  getSymptomGroupDropdownList,
  getSymptomGroupListAPI,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import config from "../../../components/common/config";
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

const PriceGroup = () => {
  const pageSize = config.pageSize;
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState("four");
  const [symptomList, setSymptomList] = useState([]);
  const [symptomType, setSymptomType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  const [postData, setPostData] = useState({
    type: `` /* 1: New, 2: Edit, 3: Status Update */,
    symptomGroupID: ``,
    symptomGroup: ``,
    symptomGroupDescription: ``,
  });

  useEffect(() => {
    fetchSymptomGroupList();
  }, [page]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const urlMap = {
      one: "/reports",
      two: "/setting/others/defectcode",
      three: "/setting/others/repaircode",
      four: "/setting/others/symptomgroup",
      five: "/setting/others/symptomcode",
      six: "/reports",
    };
    if (urlMap[newValue]) {
      navigate(urlMap[newValue]);
    }
  };
  const fetchSymptomGroupList = async () => {
    try {
      const data = await getSymptomGroupListAPI("0", pageIndex, pageSize);
      setTableData(data.symptomDataList);
      setTotalRecords(data.totalRecords);
      setDataSize(data.symptomDataList.length);
    } catch (err) {
      console.log(`Error fetching SymptomGroup List, ${err}`);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  //handle edit
  const handleEdit = (index) => {
    // Populate form fields with the details of the country being edited
    const symtomToEdit = tableData[index];
    setEditIndex(index);
    setPostData({
      ...symtomToEdit,
      type: 2,
      symptomGroupID: symtomToEdit.symptomID,
    }); // Set the postData state with the country data directly
    console.log(postData);
  };
  // handle active
  const handleActive = async (index) => {
    const symtomToEdit = tableData[index];
    const updatedPostData = {
      type: 3,
      symptomGroupID: symtomToEdit.symptomID,
      symptomGroup: symtomToEdit.symptomGroup,
      symptomGroupDescription: symtomToEdit.symptomGroupDescription,
    };

    // setPostData(updatedPostData); // Set the state first

    // Use a callback to ensure state is updated before making the API call
    await createSymptomGroup(updatedPostData);
    fetchSymptomGroupList();

    // alert(response.statusMessage); // Uncomment if you want to show an alert
  };

  // handle post request
  const handlePostReqest = async () => {
    try {
      if (editIndex === null) {
        // const isNameDuplicate = tableData.some(
        //   (symptomGroup, index) =>
        //     index !== editIndex &&
        //     symptomGroup.symptomGroup.toUpperCase() !==
        //       postData.symptomGroup.toUpperCase()
        // );

        // if (isNameDuplicate) {
        //   alert("Symptom Group already exist");
        //   return;
        // }
        postData.type = 1;
        postData.symptomGroupID = 0;
        const response = await createSymptomGroup(postData);
        alert(response.statusMessage);
        setPostData({
          type: "",
          symptomGroupID: "",
          symptomGroup: "",
          symptomGroupDescription: "",
        });
      } else {
        // const editedSymptomGroup = tableData[editIndex];
        postData.type = 2;
        const response = await createSymptomGroup(postData);
        alert(response.statusMessage);
        setPostData({
          type: "",
          symptomGroupID: "",
          symptomGroup: "",
          symptomGroupDescription: "",
        });
        // const isSymptomGroupExist = tableData.some((symptom) =>{
        //   symptom.symptomGroup.toUpperCase() === postData.symptomGroup.toUpperCase();
        // });

        console.log("object");
      }
      fetchSymptomGroupList();
    } catch (err) {
      console.log(`Error Saving symptom Group, ${err}`);
    }
    fetchSymptomGroupList();
    fetchSymptomDropdownList();
  };

  const handleSymptomDropdown = (event) => {
    setSymptomType(event.target.value);
  };

  const fetchSymptomDropdownList = async () => {
    try {
      const data = await getSymptomGroupDropdownList();
      setSymptomList(data.symptomDataList);
    } catch (error) {
      console.log(`Error fetching SymptomGroup Dropdown List, ${error}`);
    }
  };
  useEffect(() => {
    fetchSymptomDropdownList();
  }, []);

  const handleSearch = async () => {
    try {
      const symptomID = symptomType ? symptomType : "0";
      const pageIndex = "1";
      const pageSize = "36";
      const data = await getSymptomGroupListAPI(symptomID, pageIndex, pageSize);
      setTableData(data.symptomDataList);
    } catch (err) {
      console.log(`Error fetching SymptomGroup List, ${err}`);
    }
  };

  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>Other &gt; Symptom Group</Item>
          </Stack>
        </Box>

        {/* box 1 */}
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
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs"
              variant={isSmallScreen ? "scrollable" : "standard"}
              scrollButtons={isSmallScreen ? "auto" : "off"}
              sx={{ "& .MuiTab-root:focus": { outline: "none" } }}
            >
              <Tab value="one" label="MSL" />
              <Tab value="two" label="Defect Code" />
              <Tab value="three" label="Repair Code" />
              <Tab value="four" label="Symptom Group" />
              <Tab value="five" label="Symptom Code" />
              <Tab value="six" label="Feedback Code" />
            </Tabs>
          </Grid>
          <Grid item md={3}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                style={{ width: "80%" }}
                id="standard-basic"
                label="Symptom Group"
                value={postData.symptomGroup}
                variant="standard"
                onChange={(e) => {
                  const symptomGroupName = e.target.value;
                  setPostData({
                    ...postData,
                    symptomGroup: symptomGroupName,
                  });
                  console.log(postData);
                }}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                style={{ width: "80%" }}
                id="standard-basic"
                label="Description"
                variant="standard"
                value={postData.symptomGroupDescription}
                onChange={(e) => {
                  const symptomGroupDes = e.target.value;
                  setPostData({
                    ...postData,
                    symptomGroupDescription: symptomGroupDes,
                  });
                  console.log(postData);
                }}
              />
            </Box>
          </Grid>
          <Grid
            container
            justifyContent=""
            gap={1}
            sx={{ paddingTop: "4rem", m: 1 }}
          >
            <Grid item md={3}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
                onClick={() => {
                  setPostData({
                    symptomGroup: "",
                    symptomGroupDescription: "",
                  });
                  setEditIndex(null);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item md={4}>
              <Button
                variant="contained"
                size="medium"
                onClick={handlePostReqest}
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

        {/* box 2 */}
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
          <Grid container gap={2}>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ justifyContent: "center" }}
              >
                Choose file
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                sx={{
                  width: "9.5rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: "center" }}>
              <Link href="#" underline="none">
                Download Template
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="#" underline="none">
                Download Reference Code
              </Link>
            </Grid>
          </Grid>
        </Grid>
        {/* box 3 */}
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
          <Grid container sx={{ margin: "auto", justifyContent: "" }} gap={1}>
            <Grid item md={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Symptom Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={symptomType}
                  onChange={handleSymptomDropdown}
                  label="Symptom Group"
                  placeholder="Select"
                  autoWidth
                >
                  {symptomList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    symptomList.map((symptomGroup) => (
                      <MenuItem
                        key={symptomGroup.symptomID}
                        value={symptomGroup.symptomID}
                      >
                        {symptomGroup.symptomGroup}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={4} sx={{ marginTop: "25px" }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                style={{
                  width: "15rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
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
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Symptom Group</TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Description
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={row.symptomID}>
                      <TableCell>{row.symptomGroup}</TableCell>
                      <TableCell>{row.symptomGroupDescription}</TableCell>
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
                            alt={row.status === "1" ? "Active " : "Inactive"}
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
            <div id="paginationDiv">
              <CustomPagination
                page={page}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                dataSize={dataSize}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default PriceGroup;
