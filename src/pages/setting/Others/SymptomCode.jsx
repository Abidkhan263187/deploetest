import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import {
  createSymptomCode,
  fetchSymptomCodeDropdown,
  getProductCategoryList,
  getSymptomCodeList,
  getSymptomGroupDropdownList,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";

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

const SymptomCode = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("five");
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [symptomList, setSymptomList] = useState([]);
  // const [symptomList, setSymptomList] = useState([]);
  const [symptomType, setSymptomType] = useState("");
  const [ViewSymptomType, setViewSymptomType] = useState("");
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [checkCategoryType, setCheckCategoryType] = useState("");
  const [symptomCodeList, setSymptomCodeList] = useState([]);
  const [symptomCodeDropdownList, setSymptomCodeDropdownList] = useState([]);
  const [symptomCodeValue, setSymptomCodeValue] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [symptomCode, setSymptomCode] = useState("");
  const [description, setDescription] = useState("");
  const [postData, setPostData] = useState({
    SymptomMasterID: "",
    SymptomCode: "",
    SymptomDescription: "",
    SymptomGroupMasterID: "",
    SymptomFor: "",
    ProductCategoryList: [],
    JobsheetType: [],
  });

  // handling symptom dropdown in save
  const handleSymptomDropdown = (event) => {
    setSymptomType(event.target.value);
  };
  // handling symptom dropdown in search
  const handleViewSymptomDropdown = (event) => {
    setViewSymptomType(event.target.value);
  };
  // handling category dropdown
  const handleCategoryDropdown = (event) => {
    setCategoryType(event.target.value);
  };

  // handling checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setCheckCategoryType(event.target.value);
  };

  // changing tabs

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

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    const updatedCheckboxes = {};
    Object.keys(checkboxes).forEach((key) => {
      updatedCheckboxes[key] = checked;
    });
    setSelectAll(checked);
    setCheckboxes(updatedCheckboxes);
  };
  const handlePostRequest = async () => {
    try {
      postData.SymptomMasterID = 0;
      postData.SymptomCode = symptomCode;
      postData.SymptomDescription = description;
      postData.SymptomGroupMasterID = symptomType;
      postData.SymptomFor = 0;
      // postData.JobsheetType = []

      const selectedProductCategories = Object.keys(checkboxes)
        .filter((key) => checkboxes[key])
        .map((key) => ({ productCategoryId: key }));

      postData.ProductCategoryList = selectedProductCategories;

      const data = await createSymptomCode(postData);
      alert(data.statusMessage);

      setPostData({
        SymptomMasterID: "",
        SymptomCode: "",
        SymptomDescription: "",
        SymptomGroupMasterID: "",
        SymptomFor: "",
        ProductCategoryList: [],
        JobsheetType: [],
      });
    } catch (err) {
      console.log(`Error posting data, ${err}`);
      throw err;
    }
  };
  // select all che ked
  useEffect(() => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    setSelectAll(allChecked);
  }, [checkboxes]);

  // symmptom dropdown api
  const fetchSymptomDropdownList = async () => {
    try {
      const data = await getSymptomGroupDropdownList();
      setSymptomList(data.symptomDataList);
    } catch (error) {
      console.log(`Error fetching SymptomGroup Dropdown List, ${error}`);
    }
  };

  const fetchProductCategoryList = async () => {
    try {
      const data = await getProductCategoryList();
      const categories = data.productCategoryMasterListData || [];
      setProductCategoryList(categories);

      // Initialize checkboxes state
      const initialCheckboxes = {};
      categories.forEach((category) => {
        initialCheckboxes[category.productCategoryID] = false;
      });
      setCheckboxes(initialCheckboxes);
    } catch (err) {
      console.error(
        `Error fetching Product Category List, ${
          err.response ? err.response.data : err.message
        }`
      );
    }
  };
  // symptom code dropdown
  const fetchSymptomDropdown = async () => {
    try {
      const data = await fetchSymptomCodeDropdown();
      setSymptomCodeDropdownList(data.symptionCodeFor);
    } catch (err) {
      console.log(`Error fetching Symptom Dropdown, ${err}`);
    }
  };
  const fetchSymptomCodeList = async () => {
    try {
      const data = await getSymptomCodeList();
      setSymptomCodeList(data.symptomCodeListData);
      // console.log(data.symptomCodeListData);
    } catch (error) {
      console.log(`Error fetching SymptomCode List, ${error}`);
    }
  };
  // calling api inside useEffect
  useEffect(() => {
    fetchSymptomDropdownList();
    fetchProductCategoryList();
    fetchSymptomCodeList();
    fetchSymptomDropdown();
  }, []);

  const handleSearch = () => {
    const filteredList = symptomCodeList.filter((item) => {
      return (
        (symptomCodeValue === "" || item.symptomCode === symptomCodeValue) &&
        (ViewSymptomType === "" || item.symptomGroupDesc === ViewSymptomType) &&
        (categoryType === "" || item.symptomFor === categoryType)
      );
    });
    setSymptomCodeList(filteredList);
  };
  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>Other &gt; Symptom Code</Item>
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
            "& .MuiTab-root:focus": {
              outline: "none",
            },
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
            <Grid item md={3}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { width: "20ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Symptom Code"
                  variant="standard"
                  value={symptomCode}
                  onChange={(e) => setSymptomCode(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { width: "20ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ width: "80%", width: "20ch" }}
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
            <Grid container>
              <Grid Grid item>
                <Box component="section" sx={{ p: 1, marginTop: "5px" }}>
                  Select Product Category
                </Box>
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAllChange}
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
                    {productCategoryList.map((category) => (
                      <Grid
                        item
                        xs={4}
                        md={3}
                        sx={{ alignContent: "flex-start" }}
                        key={category.productCategoryID}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                checkboxes[category.productCategoryID] || false
                              }
                              onChange={handleCheckboxChange}
                              name={category.productCategoryID} // Convert ID to string if necessary
                            />
                          }
                          label={category.categorySapCode} // Assuming each category has a name
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
          <Grid
            container
            justifyContent=""
            gap={2}
            sx={{ paddingTop: "4rem", m: 2 }}
          >
            <Grid item md={3}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "15rem",
                  margin: "auto",
                  ouline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Cancel
              </Button>
            </Grid>
            {/* <Grid item md={4}> */}
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
                Save
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
                sx={{ justifyContent: "center" }}
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
            <Grid item md={3}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "20ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Symptom Code"
                  variant="standard"
                />
              </Box>
            </Grid>
            <Grid item md={3}>
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
                  value={ViewSymptomType}
                  onChange={handleViewSymptomDropdown}
                  label="Age"
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
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Product Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryType}
                  onChange={handleCategoryDropdown}
                  label="Product Category"
                  placeholder="Select"
                  autoWidth
                >
                  {productCategoryList.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    productCategoryList.map((product) => (
                      <MenuItem
                        key={product.productCategoryID}
                        s
                        value={product.categorySapCode}
                      >
                        {product.categorySapCode}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3}>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  width: "10rem",
                  marginTop: "1.3rem",
                  marginLeft: "1rem",
                  ouline: "none",
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
                    <TableCell sx={{ color: "#fff" }}>Symptom Code</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Symptom Group</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {symptomCodeList.map((row, index) => (
                    <TableRow key={row}>
                      <TableCell>{row.symptomCode}</TableCell>
                      <TableCell>{row.symptomDescription}</TableCell>
                      <TableCell>{row.symptomGroupDesc}</TableCell>
                      <TableCell>{row.symptomFor}</TableCell>
                      <TableCell align="right">
                        {/* Action icons */}
                        <IconButton
                          onClick={() => handleActive(index``)}
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
                            alt="Active Bulb"
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
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default SymptomCode;
