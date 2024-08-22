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
  useMediaQuery,
  useTheme,
  FormHelperText,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import Sidebar from "../../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import {
  createRepairCode,
  getDefectCodeList,
  getRepairCodeDropdown,
  getRepairCodeList,
} from "../../../API service/APIservice";
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

const useStyles = makeStyles({
  labelPlacementStart: {
    flexDirection: "row-reverse",
  },
  validationText: {
    color: "red",
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

const RepairCode = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const pageSize = config.pageSize;
  const [value, setValue] = useState("three");
  const [age, setAge] = useState("");
  const [repairCode, setRepairCode] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [checkboxes, setCheckboxes] = useState({
    defectCode1: false,
    defectCode2: false,
    defectCode3: false,
    defectCode4: false,
  });
  const [selectAll, setSelectAll] = useState(false);
  const [repairList, setRepairList] = useState([]);
  const [repairItem, setRepairItem] = useState("");
  const [tableData, setTableData] = useState([]);
  const [defectCodeData, setDefectCodeData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [postData, setPostData] = useState({
    type: 1,
    repairCodeID: 0,
    repairCode: "",
    repairCodeDesc: "",
    isPartRequired: 1,
    defectCodeList: [{ defectCode: "" }], // Ensure the defectCode is initialized
  });

  const [rowsPerPage, setRowPerPage] = useState(5);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === "one") {
      navigate("/reports");
    } else if (newValue === "two") {
      navigate("/setting/others/defectcode");
    } else if (newValue === "three") {
      navigate("/setting/others/repaircode");
    } else if (newValue === "four") {
      navigate("/setting/others/symptomgroup");
    } else if (newValue === "five") {
      navigate("/setting/others/symptomcode");
    } else if (newValue === "six") {
      navigate("/reports");
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newCheckboxes = {
      ...checkboxes,
      [name]: checked,
    };
    setCheckboxes(newCheckboxes);

    const selectedDefectCodes = Object.keys(newCheckboxes)
      .filter((key) => newCheckboxes[key])
      .map((key) => ({ defectCodeID: Number(key) })); // Assuming defectCodeMasterID is a number

    setPostData({
      ...postData,
      defectCodeList: selectedDefectCodes,
    });

    setSelectAll(Object.values(newCheckboxes).every(Boolean));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    const newCheckboxes = Object.fromEntries(
      Object.keys(checkboxes).map((key) => [key, checked])
    );
    setSelectAll(checked);
    setCheckboxes(newCheckboxes);

    const selectedDefectCodes = checked
      ? Object.keys(newCheckboxes).map((key) => ({ defectCodeID: Number(key) }))
      : [];

    setPostData({
      ...postData,
      defectCodeList: selectedDefectCodes,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!repairCode) {
      newErrors.repairCode = "Repair Code is required";
    } else if (repairCode.length < 5) {
      newErrors.repairCode = "Repair Code must be at least 5 characters.";
    }
    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 50) {
      newErrors.description = "Description must be at least 50 characters.";
    }
    if (!age) {
      newErrors.age = "Part Required selection is required";
    }
    if (!Object.values(checkboxes).some((checked) => checked)) {
      newErrors.checkboxes = "At least one Defect Code must be selected.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Save form data
      console.log("Form data is valid, saving...");
    } else {
      console.log("Form data is invalid, please correct errors");
    }
  };

  const handleSearch = async () => {
    try {
      console.log(`this is handlesearch`);
      const repairCodeID = repairItem ? repairItem : "0";
      const pageIndex = "1";
      const pageSize = "10";

      const data = await getRepairCodeList(repairCodeID, pageIndex, pageSize);
      if (data && data.repairCodeList) {
        setTableData(data.repairCodeList);
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.log(`Error in handle Search ${err}`);
    }
  };
  const handleViewRepairCode = (event) => {
    setRepairItem(event.target.value);
  };

  // create repair code
  const handlePostRequest = async () => {
    try {
      // Ensure defectCodeList is correctly transformed
      const defectCodeList = postData.defectCodeList
        .map((defect) => {
          return defect.defectCode ? { defectCode: defect.defectCode } : null;
        })
        .filter((defect) => defect !== null); // Remove any null entries

      const requestData = {
        ...postData,
        defectCodeList: defectCodeList,
      };

      console.log("Request data:", requestData);

      let response;
      if (editIndex === null) {
        requestData.type = 1;
        requestData.repairCodeID = 0;
        response = await createRepairCode(requestData);
      } else {
        requestData.type = 2;
        response = await createRepairCode(requestData);
        setEditIndex(null);
      }
      alert(response.statusMessage);

      setPostData({
        type: 1,
        repairCodeID: 0,
        repairCode: "",
        repairCodeDesc: "",
        isPartRequired: 1,
        defectCodeList: [{ defectCode: "" }],
      });
    } catch (err) {
      console.log(`Error in Creating/ editing repair code ${err}`);
    }
    fetchRepiarCodeDropdown();
    fetchDefectCodeCheckbox();
    fetchRepairCodeList();
  };

  const handleActive = async (index) => {
    const postToEdit = tableData[index];
    console.log(tableData[index].defectCodeList);
    console.log(`table status, ${tableData[index].status}`);
    const updatedStatus = 1;
    // const updatedStatus = postToEdit.status === 1 ? 0 : 1;
    // console.log(`postToEdit: ${JSON.stringify(postToEdit)}`);

    // Create the updated post data with only the relevant defect codes
    const updatedPostData = {
      type: 3,
      repairCodeID: postToEdit.repairCodeID,
      repairCode: postToEdit.repairCode,
      repairCodeDesc: postToEdit.repairCodeDesc,
      isPartRequired: postToEdit.isPartRequired,
      status: updatedStatus,
      // defectCodeList: postToEdit.defectCodeList.map((defect) => ({
      //   defectCode: defect.defectCode,
      // })),
      defectCodeList: postToEdit.defectCodeList,
    };

    console.log("Updated post data:", JSON.stringify(updatedPostData.status));

    try {
      const response = await createRepairCode(updatedPostData);
      alert(response.statusMessage);
      fetchRepairCodeList();
      console.log("Updated post data:", JSON.stringify(updatedPostData.status));
    } catch (err) {
      console.log(`Error in active/inactive status: ${err}`);
    }
  };

  const handleEdit = async (index) => {
    const postToEdit = tableData[index];
    postToEdit.isPartRequiredDesc === "Yes" ? "1" : "0";
    setEditIndex(index);
    console.log(postToEdit);

    setPostData({
      type: 2,
      repairCodeID: postToEdit.repairCodeID,
      ...postToEdit,
    });
  };

  // repair code dropdown api call
  const fetchRepiarCodeDropdown = async () => {
    try {
      const data = await getRepairCodeDropdown();
      setRepairList(data.repairCodeList);
    } catch (err) {
      console.log(`Error fetching repair code dropdown ${err}`);
    }
  };

  // repair code list api call
  const fetchRepairCodeList = async () => {
    try {
      const data = await getRepairCodeList("0", pageIndex, pageSize);
       console.log("data-============",data)
      setTableData(data.repairCodeList);
      setTotalRecords(data.totalRecords);
      setDataSize(data.repairCodeList.length);

      // console.log("repair code list is ",data.repairCodeList)
    } catch (err) {
      console.log(`Error in feching Rapair code List ${err}`);
    }
  };

  // defect code dropdown/checkboxes
  const fetchDefectCodeCheckbox = async () => {
    try {
      const data = await getDefectCodeList("", "", "0", "1", "1000");
      setDefectCodeData(data.defectCodeListData);
    } catch (err) {
      console.log(`Error in fectching defectcode list ${err}`);
    }
  };

  useEffect(() => {
    fetchRepiarCodeDropdown();
    fetchDefectCodeCheckbox();
    fetchRepairCodeList();
  }, []);
  useEffect(() => {
    fetchRepairCodeList();
  }, [page]);
  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>Other &gt; Repair Code</Item>
          </Stack>
        </Box>
        {/* Box 1*/}
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
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs"
              variant={isSmallScreen ? "scrollable" : "standard"}
              scrollButtons={isSmallScreen ? "auto" : false}
              sx={{
                "& .MuiTab-root:focus": {
                  outline: "none",
                },
              }}
            >
              <Tab value="one" label="MSL" />
              <Tab value="two" label="Defect Code" />
              <Tab value="three" label="Repair Code" />
              <Tab value="four" label="Symptom Group" />
              <Tab value="five" label="Symptom Code" />
              <Tab value="six" label="Feedback Code" />
            </Tabs>
          </Grid>

          <Grid container>
            {/* repair code */}
            <Grid item md={3}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { width: "20ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="repair-code"
                  label="Repair Code"
                  variant="standard"
                  value={postData.repairCode}
                  onChange={(e) => {
                    setPostData({ ...postData, repairCode: e.target.value });
                  }}
                  error={!!errors.repairCode}
                  helperText={errors.repairCode}
                  FormHelperTextProps={{ className: classes.validationText }}
                />
              </Box>
            </Grid>
            {/* repair description */}
            <Grid item md={3}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { width: "20ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="description"
                  label="Description"
                  variant="standard"
                  value={postData.repairCodeDesc}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      repairCodeDesc: e.target.value,
                    });
                  }}
                  error={!!errors.description}
                  helperText={errors.description}
                  FormHelperTextProps={{ className: classes.validationText }}
                />
              </Box>
            </Grid>
            {/* isPartRequired */}
            <Grid item md={4}>
              <FormControl
                variant="standard"
                sx={{ width: "20ch" }}
                error={!!errors.age}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Part Required
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={postData.isPartRequired}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      isPartRequired: e.target.value,
                    });
                  }}
                  label="Part Required"
                  placeholder="Select"
                  autoWidth
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* defect code Checkboxes */}
            <Grid container>
              <Grid item>
                <Box component="section" sx={{ p: 1, marginTop: "5px" }}>
                  Select Defect Code
                </Box>
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectAll}
                        // value={defectCode}
                        onChange={handleSelectAllChange}
                        sx={{ marginLeft: "15px" }}
                      />
                    }
                    label="Select All"
                    sx={{ p: "10px" }}
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <FormControl component="fieldset">
                <Grid item>
                  <FormGroup row>
                    {defectCodeData.map((defectValue) => (
                      <Grid
                        item
                        sx={{ alignContent: "flex-start", marginLeft: "12px" }}
                        key={defectValue.defectCodeMasterID}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                checkboxes[defectValue.defectCodeMasterID] ||
                                false
                              }
                              onChange={handleCheckboxChange}
                              name={defectValue.defectCodeMasterID}
                            />
                          }
                          label={defectValue.defectCode}
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
          </Grid>
          <Grid container justifyContent="" gap={2} sx={{ paddingTop: "4rem" }}>
            <Grid item md={4}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "15rem",
                  margin: "auto",
                  ouline: "none",
                  "&:focus": { outline: "none" },
                }}
                onClick={() => {
                  setPostData({
                    type: "",
                    repairCode: "",
                    repairCodeDesc: "",
                    isPartRequired: "",
                    defectCodeList: [],
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
                sx={{
                  width: "15rem",
                  margin: "auto",
                  ouline: "none",
                  "&:focus": { outline: "none" },
                }}
                onClick={handlePostRequest}
              >
                {editIndex === null ? "Save" : "Update"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Box 2 */}
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
                sx={{
                  justifyContent: "center",
                  "& .MuiTab-root:focus": {
                    outline: "none",
                  },
                }}
              >
                Upload file
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
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="#" underline="none">
                {"Download Reference Code"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
        {/* Box 3 */}

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
                  Repair Code
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={repairItem}
                  onChange={handleViewRepairCode}
                  label="Repair Code"
                  placeholder="Select"
                  autoWidth
                >
                  {repairList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    repairList.map((item) => (
                      <MenuItem
                        key={item.repairCodeID}
                        value={item.repairCodeID}
                      >
                        {item.repairCode}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={4}>
              <Button
                variant="contained"
                onClick={handleSearch}
                style={{
                  width: "10rem",
                  marginTop: "1.3rem",
                  marginLeft: "1rem",
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
                    backgroundColor: "#1976d2",
                    width: "100%",
                    color: "red",
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Repair Code</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Part Required</TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                      <TableRow key={row}>
                        <TableCell>{row.repairCode}</TableCell>
                        <TableCell>{row.repairCodeDesc}</TableCell>
                        <TableCell>{row.isPartRequiredDesc}</TableCell>
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
                                row.status === 1
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt={
                                row.status === 1
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              // src="/src/assets/activeBulb.svg"
                              // alt="Active Bulb"
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
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(newPage) => {
                setPage(newPage);
              }}
              onRowsPerPageChange={(e) => {
                setRowPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            /> */}
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

export default RepairCode;
