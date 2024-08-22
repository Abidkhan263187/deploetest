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
import "./defectcode.css";
import Sidebar from "../../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import {
  getDefectCodeList,
  getProductCategory,
  getProductCategoryList,
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

const DefectCode = () => {
  const pageSize = config.pageSize;
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("two");
  const [viewDefect, setViewDefect] = useState("");
  const [defectCodeList, setdefeCodeList] = useState([]);
  const [viewProduct, setViewProduct] = useState("");
  const [productList, setProductList] = useState([]);
  const [productBoxList, setProductBoxList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [checkCategoryType, setCheckCategoryType] = useState("");
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setCheckCategoryType(event.target.value);
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
  // api call for defect code dropdown
  const fetchDefectCodeDropdown = async () => {
    try {
      const data = await getDefectCodeList("", "", "0", pageIndex, pageSize);
      setdefeCodeList(data.defectCodeListData);
      setTotalRecords(data.totalRecord);
      setDataSize(data.defectCodeListData.length);
    } catch (err) {
      console.log(`Error in fectching defectcode list ${err}`);
    }
  };

  // api call  get product category dropdewn and
  const fetchProductDropdown = async () => {
    try {
      const data = await getProductCategoryList();
      setProductList(data.productCategoryMasterListData);
      console.log(
        "product list data ke darshan ",
        data.productCategoryMasterListData
      );
      console.log("product list ke darshan kre ", productList);
    } catch (err) {
      console.log(`Error fetching Product Dropdown List: ${err}`);
    }
  };
  // api call to get product category checkboxes
  const fetchProductCategoryCheckboxes = async () => {
    try {
      let defectCodeID = 118;
      const data = await getProductCategory(defectCodeID);
      setProductBoxList(data.productCategoryListData);
      console.log(
        "product category list me ye sab bhara h",
        data.productCategoryListData
      );
      console.log("product box list me ye sab bhara h", productBoxList);
    } catch (err) {
      console.log(`Error fetching Product Category Checkboxes: ${err}`);
    }
  };

  useEffect(() => {
    fetchDefectCodeDropdown();
    fetchProductDropdown();
    fetchProductCategoryCheckboxes();
  }, []);
  const handleChange = (event, newValue) => {
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  useEffect(() => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    if (selectAll !== allChecked) {
      setSelectAll(allChecked);
    }
  }, [checkboxes, selectAll]);

  return (
    <Sidebar>
      <Grid container>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>Other &gt; Defect Code</Item>
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
              onChange={handleChange}
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
                  label="Defect Code"
                  variant="standard"
                />
              </Box>
            </Grid>
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
                  label="Description"
                  variant="standard"
                />
              </Box>
            </Grid>

            <Grid container>
              <Grid item>
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
                        s
                        name="selectAll"
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
                    {productList.map((category) => (
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
            <Grid container spacing={2}>
              <FormControl component="fieldset">
                <Grid item>
                  <FormGroup row>
                    {productBoxList.map((product) => (
                      <Grid
                        item
                        sx={{ alignContent: "flex-start", marginLeft: "12px" }}
                        key={product.defectCodeProductmapID}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                checkboxes[product.defectCodeProductmapID] ||
                                false
                              }
                              onChange={handleCheckboxChange}
                              name={product.defectCodeProductmapID}
                            />
                          }
                          label={product.productCategoryName}
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
            <Grid item xs={12} sm={12} md={4}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "12rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "12rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
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
                sx={{
                  justifyContent: "center",
                  outline: "none",
                  "&:focus": { outline: "none" },
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
                  Defect Code
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={viewDefect}
                  onChange={(e) => {
                    setViewDefect(e.target.value);
                  }}
                  label="Defect Code"
                  placeholder="Select"
                  autoWidth
                >
                  {defectCodeList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    defectCodeList.map((item) => (
                      <MenuItem
                        key={item.defectCodeMasterID}
                        value={item.defectCodeMasterID}
                      >
                        {item.defectCode}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
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
                  value={viewProduct}
                  onChange={(e) => {
                    setViewProduct(e.target.value);
                  }}
                  label="Product Category"
                  placeholder="Select"
                  autoWidth
                >
                  {productList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    productList.map((item) => (
                      <MenuItem
                        key={item.productCategoryID}
                        value={item.productCategoryID}
                      >
                        {item.categorySapCode}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={4}>
              <Button
                variant="contained"
                // onClick={handleSearch}
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
                    <TableCell sx={{ color: "#fff" }}>Defect Code</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {defectCodeList.map((row, index) => (
                    <TableRow key={row}>
                      <TableCell>{row.defectCode}</TableCell>
                      <TableCell>{row.defectDescription}</TableCell>
                      <TableCell>xxxx</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleActive(index)}
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

export default DefectCode;
