import React, { useContext, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar2";
import {
  Box,
  Modal,
  Button,
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
  GetAllProductsReferenceData,
} from "../../API service/APIservice";
import { Flag } from "@mui/icons-material";
import Loader from "../../utils/Loader/Loader";
import Popups from "../../components/common/Popups";
import CustomPagination from "../../components/common/CustomPagination";
import config from "../../components/common/config";
import axios from "axios";
import DownloadModal from "../../components/common/DownloadModel";
import { Toaster, toast } from "react-hot-toast";
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


const ManageCategory = () => {
  const { btnstyle } = useContext(Theme);

  const [value, setTabValue] = useState(1);
  const { pageSize, DTempUrl } = config;
  const navigate = useNavigate();
  const [dataSize, setDataSize] = useState(5);
  const fileInputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [catList, setCatList] = useState([]);
  const [catSearchList, setCatSearchList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("success");
  const [mssg, setMssg] = useState("message");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [brandOptList, setBrandOptList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [formData, setFormData] = useState({
    categoryID: 0,
    brandID: 0,
    categoryName: "",
    description: "",
    status: 0 /* 0= inactive, 1 = active */,
    callType: 0 /* 0= default for save, 1= edit, 2= toggle Active Status*/,
  });
  const [searchParams, setSearchParams] = useState({
    brandID: 0,
    categoryID: 0,
    status: 2 /*show all */,
    callType: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("hit in useEffect");
        const brandOpt = await getBrandMasterData(brandOptDummyBody);
        setBrandOptList(brandOpt.brandMasterList);
        const CatOpt = await getCategoryMasterData(CatDummyBody);
        setCatList(CatOpt.categoryMasterList);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [flag]);

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
      categoryName: "",
      description: "",
      status: 0 /* 0= inactive, 1 = active */,
      callType: 0,
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };

  const handleSaveCat = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // console.log("formData", formData);
      let saveData = await saveEditCategory(formData);
      // console.log("saveData", saveData);
      setFlag(!flag);
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
        categoryName: "",
        description: "",
        status: 0 /* 0= inactive, 1 = active */,
        callType: 0,
      });
      setLoading(false);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
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
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatList([]);
    }
  };

  const handleSearchChange = (fieldName, value) => {
    setSearchParams({ ...searchParams, [fieldName]: value });

    if (fieldName === "brandID") {
      handleBrandSearchChange(value);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const CatOpt = await getCategoryMasterData(searchParams);
      setCatList(CatOpt.categoryMasterList);
    } catch (error) {
      console.log(error, "error while Searching...");
      setStatusModal(true);

      setStatus(error.response.data.statusCode);
      setMssg(error.response.data.statusMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = async () => {
    const CatOpt = await getCategoryMasterData(CatDummyBody);
    setCatList(CatOpt.categoryMasterList);
    setSearchParams({});
  };

  const handleActive = async (index) => {
    // console.log("onActive", catList[index]);
    const postToEDit = catList[index];
    const updatedStatus = postToEDit.status == "1" ? "0" : "1";
    const updatedPostData = {
      brandID: postToEDit.brandID,
      categoryID: postToEDit.categoryID,
      categoryName: postToEDit.categoryName,
      description: postToEDit.description || "no desc",
      callType: 2,
      status: updatedStatus,
    };
    // console.log(`updated post data :${updatedStatus}`);
    try {
      setFlag(!flag);
      let status = await saveEditCategory(updatedPostData);
      toast.success(status.statusMessage);
      const newTableData = [...catList];
      newTableData[index].status = updatedStatus;
      setCatList(newTableData);
    } catch (err) {
      console.log(
        `Error in handle active/inaactive product/spare price  ${err}`
      );
    }
  };
  const handleEdit = (index) => {
    setEdit(true);
    // console.log("form Data", catList[index]);
    setFormData({ ...catList[index], callType: "1" });
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
          "https://qa.nuralservice.com/FirebolttServiceAPI/api/User/BulkUploadCategoryMaster/1?callType=1",
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
          // toast.error(uploadRes.data.statusMessage || "File uploaded successfully");
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

        // toast.error(`Error uploading file: ${error.response?.data || error.message}`);
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
      // toast.error("Please upload a valid Excel file (.xlsx or .xls).");
      toast.error("Please upload a valid Excel file (.xlsx or .xls).");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
            <Item>Product {">"} Category </Item>
          </Stack>
        </Box>
        <hr />
        <Toaster position="top-center" reverseOrder={false} />
        {/* BOX 1 - Add Panel */}
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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
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
          </Box>
          <form onSubmit={handleSaveCat}>
            <Grid ml={1} mt={3}>
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
                        required
                      />
                    )}
                    onChange={(event, value) =>
                      handleChange("brandID", value ? value.brandID : "0")
                    }
                    value={
                      brandOptList.find(
                        (option) => option.brandID === formData.brandID
                      ) || null
                    }
                  />
                </Grid>
                <Grid item ml={12}>
                  <TextField
                    label="Category"
                    id="standard-basic"
                    variant="standard"
                    InputLabelProps={{
                      required: false, // Ensures the label shrinks as expected
                    }}
                    required
                    value={formData.categoryName}
                    onChange={(e) =>
                      handleChange("categoryName", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={10} ml={2} mt={5}>
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
                required
                value={formData.description}
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
                    style={btnstyle}
                    type="submit"
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
          spacing={2}
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
          <Grid>
            <InputLabel sx={{ fontWeight: "600", margin: "0" }}>
              Bulk Upload
            </InputLabel>
          </Grid>

          <Grid container sx={{ margin: "15px 0" }}>
            <label>Upload File </label>
          </Grid>
          <Grid container gap={2}>
            {/* <Grid item gap={2}> */}
            <Grid item xs={12} sm={6} md={2}>
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
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
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
                href={`${DTempUrl}/CategoryUploadTemplate.xlsx`}
                underline="none"
              >
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => GetAllProductsReferenceData(1)}
                underline="none"
              >
                {"Download Reference Code"}
              </Link>
            </Grid>
            {/* </Grid> */}
          </Grid>
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
              <Grid item md={2} ml={8}>
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
            </Grid>
          </Grid>

          <Grid container mt={5}>
            <Grid container>
              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  style={btnstyle}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              <Grid item md={2}>
                <Button
                  variant="contained"
                  size="medium"
                  style={btnstyle}
                  onClick={handleViewAll}
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
                  style={{
                    backgroundColor: "#2255A4",
                    textAlign: "center",
                  }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Brand</TableCell>
                    <TableCell style={{ color: "white" }}>Category</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catList.length > 0 ? (
                    catList.map((elem, ind) => (
                      <TableRow>
                        <TableCell>{elem.brandName}</TableCell>
                        <TableCell>{elem.categoryName}</TableCell>
                        <TableCell>
                          {elem.description ? elem.description : "no desc.."}
                        </TableCell>
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
                          <IconButton onClick={() => handleEdit(ind)}>
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
            {/* <CustomPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              dataSize={dataSize}
            /> */}
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

export default ManageCategory;
