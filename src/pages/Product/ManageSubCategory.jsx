import React, { useContext, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar2";
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
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Footer from "../../components/footer/Footer";
import {
  getBrandMasterData,
  saveEditCategory,
  getCategoryMasterData,
  saveEditSubCategory,
  getSubCategoryMasterData,
  GetAllProductsReferenceData,
} from "../../API service/APIservice";
import Loader from "../../utils/Loader/Loader";
import Popups from "../../components/common/Popups";
import config from "../../components/common/config";
import DownloadModal from "../../components/common/DownloadModel";
import axios from "axios";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { Theme } from "../../ThemeProvider/ThemeProvider";
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
const brandOptDummyBody = {
  brandID: 0,
  status: 2,
  callType: 0 /* 0= default, 1= get by Id */,
};
const CatDummyBody = {
  brandID: 0,
  categoryID: 0,
  status: 2 /*show all */,
  callType: 0 /* 0 = default, 1= get by Id */,
};

const btnstyle = {
  backgroundColor: "#33499F",
  color: "white",
  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
  marginTop: "10px",
  marginBottom: "10px",
  width: "max-content",
};

const ManageSubCategory = () => {
  const { btnstyle } = useContext(Theme);
  const [value, setTabValue] = useState(2);
  const navigate = useNavigate();
  const { pageSize, DTempUrl } = config;
  const [brandOptList, setBrandOptList] = useState([]);
  const [catOptList, setCatOptList] = useState([]);
  const [subCatOptList, setSubCatOptList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [subCatSearchOptList, setSubCatSearchOptList] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("success");
  const [mssg, setMssg] = useState("message");
  const [catSearchList, setCatSearchList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const fileInputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    categoryID: 0,
    brandID: 0,
    subCategoryID: "0",
    subCategoryName: "",
    description: "",
    status: 1 /* 0= inactive, 1 = active */,
    callType: 0 /* 0= default for save, 1= edit, 2= toggle Active Status*/,
  });
  const SubCatDummy = {
    brandID: 0,
    categoryID: 0,
    subCategoryID: 0,
    status: 2 /*show all */,
    callType: 0 /* 0 = default, 1= get by Id */,
  };
  const [searchParams, setSearchParams] = useState({
    brandID: 0,
    categoryID: 0,
    subCategoryID: 0,
    status: 2 /*show all */,
    callType: 0,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate("/Product/managebrand");
    else if (newValue === 1) navigate("/Product/managecategory");
    else if (newValue === 2) navigate("/Product/managesubcategory");
    else if (newValue === 3) navigate("/Productmodel");
    else if (newValue === 4) navigate("/Productsku");
  };

  const handleCancelClick = () => {
    setFormData({
      categoryID: 0,
      brandID: 0,
      subCategoryID: "0",
      subCategoryName: "",
      description: "",
      status: 0 /* 0= inactive, 1 = active */,
      callType: 0,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("hit in useEffect");
        const brandOpt = await getBrandMasterData(brandOptDummyBody);
        setBrandOptList(brandOpt.brandMasterList);
        const subCatOpt = await getSubCategoryMasterData(SubCatDummy);
        setSubCatOptList(subCatOpt.subCategoryMasterList);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [flag]);

  const handleSaveSubCat = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log("formData", formData);
      let saveData = await saveEditSubCategory(formData);
      // console.log("saveData", saveData);
      setStatusModal(true);
      setFlag(!flag);
      setStatus(saveData.statusCode);
      setMssg(saveData.statusMessage);
    } catch (error) {
      console.log("getting erorr on save brand ", error);
    } finally {
      if (edit) {
        setEdit(false);
      }
      setFormData({
        categoryID: 0,
        brandID: 0,
        subCategoryID: "0",
        subCategoryName: "",
        description: "",
        status: 0 /* 0= inactive, 1 = active */,
        callType: 0,
      });
      setLoading(false);
    }
  };
  const handleBrandChange = async (event, value) => {
    const selectedBrandID = value ? value.brandID : "0";
    handleChange("brandID", selectedBrandID);

    if (selectedBrandID) {
      // setBrandID(selectedBrandID);
      try {
        const updatedCatDummyBody = {
          ...CatDummyBody,
          brandID: selectedBrandID,
        };
        const CatOpt = await getCategoryMasterData(updatedCatDummyBody);
        setCatOptList(CatOpt.categoryMasterList);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatOptList([]);
    }
  };

  const handleBrandSearchChange = async (value) => {
    const searchParamItem = value ? value : "0";
    if (searchParamItem) {
      try {
        const updatedCatDummyBody = {
          ...CatDummyBody,
          brandID: searchParamItem,
        };
        const CatOpt = await getCategoryMasterData(updatedCatDummyBody);
        setCatSearchList(CatOpt.categoryMasterList);
        const CatOpt2 = await getCategoryMasterData(updatedCatDummyBody);
        setCatOptList(CatOpt2.categoryMasterList);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatSearchList([]);
    }
  };
  const handleCategorySearchChange = async (value) => {
    const searchParamItem = value ? value : "0";
    const selectedBrandID = searchParams.brandID;
    if (searchParamItem) {
      try {
        const updatedSubDummyBody = {
          ...SubCatDummy,
          brandID: selectedBrandID,
          categoryID: searchParamItem,
        };
        const subCatOpt = await getSubCategoryMasterData(updatedSubDummyBody);
        setSubCatSearchOptList(subCatOpt.subCategoryMasterList);
        // console.log("SubCatOpt in search", subCatOpt);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setSubCatSearchOptList([]);
    }
  };
  const handleSearchChange = (fieldName, value) => {
    setSearchParams({ ...searchParams, [fieldName]: value });

    if (fieldName === "brandID") {
      handleBrandSearchChange(value);
    }
    if (fieldName === "categoryID") {
      handleCategorySearchChange(value);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    // console.log("searchParams", searchParams);
    try {
      const subCatOpt = await getSubCategoryMasterData(searchParams);
      setSubCatOptList(subCatOpt.subCategoryMasterList);
    } catch (error) {
      setStatusModal(true);

      setStatus(error.response.data.statusCode);
      setMssg(error.response.data.statusMessage);
      console.log("error in search on sub category", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    try {
      const subCatOpt = await getSubCategoryMasterData(SubCatDummy);
      setSubCatOptList(subCatOpt.subCategoryMasterList);
    } catch (error) {
      console.log("erorr on viewAll");
    } finally {
      setSearchParams({
        brandID: 0,
        categoryID: 0,
        subCategoryID: 0,
        status: 2 /*show all */,
        callType: 0,
      });
    }
  };

  const handleActive = async (index) => {
    // console.log("onActive", subCatOptList[index]);
    const postToEDit = subCatOptList[index];
    const updatedStatus = postToEDit.status == "1" ? "0" : "1";
    const updatedPostData = {
      brandID: postToEDit.brandID,
      categoryID: postToEDit.categoryID,
      subCategoryName: postToEDit.subCategoryName,
      subCategoryID: postToEDit.subCategoryID,
      description: postToEDit.description || "no desc",
      callType: 2,
      status: updatedStatus,
    };
    // console.log(`updated post data :${updatedStatus}`);
    try {
      // console.log("updatedPostData", updatedPostData);
      let status = await saveEditSubCategory(updatedPostData);
      toast.success(status.statusMessage);
      setFlag(!flag);
      const newTableData = [...subCatOptList];
      newTableData[index].status = updatedStatus;
      setSubCatOptList(newTableData);
    } catch (err) {
      console.log(
        `Error in handle active/inaactive product/spare price  ${err}`
      );
    }
  };

  const handleEdit = (index) => {
    setEdit(true);
    // console.log("form Data", subCatOptList[index]);
    setFormData({ ...subCatOptList[index], callType: "1" });
    handleBrandSearchChange(subCatOptList[index].brandID);
    // Set type to "2" when editing
  };

  const handleUpload = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files.length) {
      toast.error("Please select a file before uploading.");
      return;
    }
    let authKey = sessionStorage.getItem("authKey");
    setLoading(true);

    if (selectedFile) {
      try {
        // Prepare form data
        const formData = new FormData();
        formData.append("UploadedFile", selectedFile); // Set the key to UploadedFile

        // Perform file upload
        const uploadRes = await axios.post(
          "https://qa.nuralservice.com/FirebolttServiceAPI/api/User/BulkUploadSubCategoryMaster/1?callType=1",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authKey: authKey,
            },
          }
        );
        console.log("uploadRes", uploadRes.data);
        setMssg(uploadRes.data.statusMessage);
        setStatus(uploadRes.data.statusCode);
        setStatusModal(true);
        // Check for specific status code and invalid data link
        if (
          uploadRes.data.statusCode === "400" &&
          uploadRes.data.invalidDataLink
        ) {
          setDownloadLink(uploadRes.data.invalidDataLink);
          setModalOpen(true); // Open the modal with download link
        } else {
          // alert(uploadRes.data.statusMessage || "File uploaded successfully");
        }
      } catch (error) {
        // Handle errors
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );

        setMssg(error.response.data.statusMessage);
        setStatus(error.response.data.statusCode);
        setStatusModal(true);

        // alert(`Error uploading file: ${error.response?.data || error.message}`);
      } finally {
        // Clear selected file
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setLoading(false);
        setSelectedFile(null);
      }
    } else {
      setLoading(false);
      toast.error("Please select a file first.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validate file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid Excel file (.xlsx or .xls).");
      setSelectedFile(null);
      return;
    }

    // You can add additional validation for file structure here if necessary

    setSelectedFile(file);
    console.log("Selected file:", file);
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
            <Item>Product {">"} Sub Category </Item>
          </Stack>
        </Box>
        <hr />

        {/* BOX 1 - Add Panel */}
        <Grid
          container
          spacing={2}
          sx={{
            background: "#EFF3FE",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            marginLeft: "10px",
            padding: "15px 10px 40px 10px",
          }}
        >
          <Grid
            container
            sx={{ borderBottom: 1, borderBottomColor: "lightgrey" }}
          >
            <Tabs
              value={value}
              onChange={handleTabChange}
              textColor="Primary"
              indicatorColor="primary"
              aria-label="basic tabs example"
              sx={{
                "& .MuiTab-root:focus": {
                  outline: "none",
                },
              }}
            >
              <Tab label="Add Brand" />
              <Tab label="Add Category" />
              <Tab label="Add Sub Category" />
              <Tab label="Add Model" />
              <Tab label="Product Sku" />
            </Tabs>
          </Grid>
          <Toaster position="top-center" reverseOrder={false} />

          <form id="subCatFrom" onSubmit={handleSaveSubCat}>
            <Grid container rowSpacing={1} ml={1} mt={3}>
              <Grid item md={2} lg={3}>
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={brandOptList}
                  getOptionLabel={(option) => option.brandName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Brand"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                      required
                    />
                  )}
                  onChange={handleBrandChange}
                  value={
                    brandOptList.find(
                      (option) => option.brandID === formData.brandID
                    ) || null
                  }
                />
              </Grid>
              <Grid item ml={10} md={2} lg={3}>
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={catOptList}
                  getOptionLabel={(option) => option.categoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Category"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                      required
                    />
                  )}
                  onChange={(event, value) =>
                    handleChange("categoryID", value ? value.categoryID : "0")
                  }
                  value={
                    catOptList.find(
                      (option) => option.categoryID === formData.categoryID
                    ) || null
                  }
                />
              </Grid>
              <Grid item ml={12}>
                <TextField
                  label="Sub Category"
                  id="standard-basic"
                  variant="standard"
                  InputLabelProps={{
                    required: false, // Ensures the label shrinks as expected
                  }}
                  required
                  value={formData.subCategoryName}
                  onChange={(e) =>
                    handleChange("subCategoryName", e.target.value)
                  }
                />
              </Grid>
            </Grid>

            <Grid item md={10} lg={10} mt={5} xs={8}>
              <InputLabel id="demo-simple-select-standard-label">
                Description
              </InputLabel>
              <TextField
                fullWidth
                id="standard-basic"
                variant="standard"
                InputLabelProps={{
                  required: false, // Ensures the label shrinks as expected
                }}
                value={formData.description}
                required
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Grid>

            <Grid container mt={5}>
              <Grid container>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    style={btnstyle}
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    style={btnstyle}
                    // onClick={handleSaveSubCat}
                  >
                    {edit ? "Update" : "Save"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {/* Box 2- Bulk Upload */}
        <Grid
          container
          spacing={1}
          sx={{
            background: "#EFF3FE",
            marginLeft: "10px",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "30px 18px",
            fontWeight: 600,
          }}
        >
          <InputLabel sx={{ fontWeight: "600" }}>Bulk Upload</InputLabel>

          <Grid container sx={{ margin: "15px 0" }}>
            Upload File
          </Grid>

          {/* <Grid item gap={2}> */}
          <Grid container gap={2}>
            {/* <Grid item gap={2}> */}
            <Grid item xs={12} sm={6} md={2} lg={4}>
              {/* <input type="file" /> */}
              {/* latest code */}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={btnstyle}
              >
                Upload file
                <VisuallyHiddenInput
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  type="file"
                />
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                onClick={handleUpload}
                style={btnstyle}
              >
                Upload
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: "center" }}>
              <Link
                href={`${DTempUrl}/SubCategoryUploadTemplate.xlsx`}
                underline="none"
              >
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => GetAllProductsReferenceData(2)}
                underline="none"
              >
                {"Download Reference Code"}
              </Link>
            </Grid>
            {/* </Grid> */}
          </Grid>
          {/* </Grid> */}
        </Grid>

        {/* BOX 3 - List View */}
        <Grid
          sx={{
            background: "#EFF3FE",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            marginLeft: "10px",
            padding: "15px 10px 40px 10px",
          }}
        >
          <Grid
            sx={{
              marginLeft: "10px",
            }}
          >
            <p>List View</p>
          </Grid>

          <Grid container mt={3}>
            <Grid container>
              <Grid item md={2}>
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={brandOptList}
                  getOptionLabel={(option) => option.brandName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Brand"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchChange("brandID", value ? value.brandID : "0")
                  }
                  value={
                    brandOptList.find(
                      (option) => option.brandID === searchParams.brandID
                    ) || null
                  }
                />
              </Grid>
              <Grid item md={2} ml={12}>
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={catSearchList}
                  getOptionLabel={(option) => option.categoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Category"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchChange(
                      "categoryID",
                      value ? value.categoryID : "0"
                    )
                  }
                  value={
                    catSearchList.find(
                      (option) => option.categoryID === searchParams.categoryID
                    ) || null
                  }
                />
              </Grid>
              <Grid item md={2} ml={12}>
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={subCatSearchOptList}
                  getOptionLabel={(option) => option.subCategoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Sub Category"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchChange(
                      "subCategoryID",
                      value ? value.subCategoryID : "0"
                    )
                  }
                  value={
                    subCatSearchOptList.find(
                      (option) =>
                        option.subCategoryID === searchParams.subCategoryID
                    ) || null
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={5}>
            <Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  style={btnstyle}
                  onClick={handleSearch}
                >
                  Search
                </Button>{" "}
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  size="medium"
                  style={btnstyle}
                  onClick={handleView}
                >
                  View All
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#2255A4", textAlign: "center" }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Brand</TableCell>
                    <TableCell style={{ color: "white" }}>Category</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Sub Category
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subCatOptList.length > 0 ? (
                    subCatOptList.map((elem, ind) => (
                      <TableRow>
                        <TableCell>{elem.brandName}</TableCell>{" "}
                        <TableCell>{elem.categoryName}</TableCell>{" "}
                        <TableCell>{elem.subCategoryName}</TableCell>{" "}
                        <TableCell>{elem.description}</TableCell>{" "}
                        <TableCell align="left">
                          <IconButton
                            onClick={() => handleActive(ind)}
                            sx={{ "&:focus": { outline: "none" } }}
                          >
                            <img
                              src={
                                elem.status == "1"
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt={elem.status == "1" ? "Active" : "Inactive"}
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                          <IconButton
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={() => handleEdit(ind)}
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
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No Data Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      {loading && <Loader />}
      {statusModal && (
        <Popups status={status} mssg={mssg} setStatusModal={setStatusModal} />
      )}
      <Footer></Footer>
      <DownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        downloadLink={downloadLink}
      />
    </Sidebar>
  );
};

export default ManageSubCategory;
