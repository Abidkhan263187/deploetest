import React, { useContext, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar2";
import { Toaster, toast } from "react-hot-toast";

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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Footer from "../../components/footer/Footer";
import {
  createBrand,
  GetAllProductsReferenceData,
  getBrandListDropdown,
  getBrandListTable,
  getBrandReferenceDataPathLink,
} from "../../API service/APIservice";
// import CustomPagination from "../../../components/Pagination/Custompagination";
import CustomPagination from "../../components/Pagination/Custompagination";
import config from "../../components/common/config";
import axios from "axios";
import DownloadModal from "../../components/common/DownloadModel";
import Loader from "../../utils/Loader/Loader";
import Popups, { Popups2 } from "../../components/common/Popups";
import "./index.css";
import { Theme } from "../../ThemeProvider/ThemeProvider";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  // marginTop: `${theme.spacing(12.5)} !important`,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 600,
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

const ManageBrand = () => {
  const { btnstyle } = useContext(Theme);
  const { pageSize, DTempUrl } = config;
  const [editIndex, setEditIndex] = useState("");
  const [value, setTabValue] = useState(0);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (newPage, newRowsPerPage) => {
    setPage(newPage);
    setRowsPerPage(newRowsPerPage);
  };

  const [brandList, setBrandList] = useState([]);
  const [TableRows, setTableRows] = useState([]);
  const [refDataPath, setRefDataPath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  const [statusModal2, setStatusModal2] = useState(false);

  const [status, setStatus] = useState("");
  const [mssg, setMssg] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    brandID: "",
    brandName: "",
    description: "",
    status: "",
    callType: "",
  });

  const [postSrchData, setPostSrchData] = useState({
    brandID: 0,
    status: 2,
    callType: 0,
  });

  useEffect(() => {
    fetchBrandListItems();
    fetchBrandDataTable();
  }, []);

  const fetchBrandListItems = async () => {
    try {
      const data = await getBrandListDropdown();
      // console.log("data", data)
      setBrandList(data.brandMasterListData_Drpdwn);
    } catch (err) {
      console.log("error- ");
    }
  };

  const fetchBrandDataTable = async () => {
    try {
      postSrchData.brandID = 0;
      postSrchData.status = 2;
      postSrchData.callType = 0;
      const data = await getBrandListTable(postSrchData);

      // /  console.log("first", data.brandMasterList)
      setTableRows(data.brandMasterList);

      setPostSrchData({
        brandID: 0,
        status: 2,
        callType: 0,
      });
    } catch (err) {
      console.log("error- " + err);
    }
  };

  const handleSrchCancel = () => {
    setSelectedBrand("");
    fetchBrandDataTable();
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
          "https://qa.nuralservice.com/FirebolttServiceAPI/api/User/BulkUploadBrandMaster/1?callType=1",
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

  const handleStatus = async (brandId, index) => {
    const activeStatus = TableRows[index].status;

    try {
      postData.callType = 2;
      postData.brandID = brandId;
      postData.brandName = "";
      postData.description = "";
      postData.status = activeStatus === 1 ? 0 : 1;

      const response = await createBrand(postData);

      if (response.statusCode === "200") {
        toast.success(response.statusMessage);
      } else if (response.statusCode === "401") {
        toast.error("unauthorised - " + response.statusMessage);
      } else {
        toast.error(response.statusMessage);
      }

      fetchBrandDataTable();
    } catch (error) {
      console.log("error-", error);
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

  const handleSearchBrand = async () => {
    setLoading(true);
    try {
      postSrchData.brandID = selectedBrand === "" ? 0 : selectedBrand;
      postSrchData.status = 2;
      postSrchData.callType = 0;

      const data = await getBrandListTable(postSrchData);
      setTableRows(data.brandMasterList);

      setPostSrchData({
        brandID: 0,
        status: 2,
        callType: 0,
      });
    } catch (error) {
      console.log("error-", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBrand = (brandId, index) => {
    setEdit(true);
    setBrandName(TableRows[index].brandName);
    setBrandDesc(TableRows[index].description);
    setEditIndex(brandId);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 0) navigate("/Product/managebrand");
    else if (newValue === 1) navigate("/Product/managecategory");
    else if (newValue === 2) navigate("/Product/managesubcategory");
    else if (newValue === 3) navigate("/Productmodel");
    else if (newValue === 4) navigate("/Productsku");
  };

  const handleCancelClick = () => {
    setBrandName("");
    setBrandDesc("");
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isNewBrand = editIndex === null || editIndex === "";
      const postData = {
        brandID: isNewBrand ? 0 : editIndex,
        brandName,
        description: brandDesc,
        status: 1,
        callType: isNewBrand ? 0 : 1,
      };

      const response = await createBrand(postData);

      setStatusModal(true);
      if (response) {
        setMssg(response.statusMessage);
        setStatus(response.statusCode);
      } else {
        setMssg("Brand with same name already exists");
        setStatus("400");
      }

      resetForm();
      fetchBrandDataTable();
    } catch (error) {
      toast("enter in error");
    } finally {
      if (edit) {
        setEdit(false);
      }
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPostData({
      brandID: "",
      brandName: "",
      description: "",
      status: "",
      callType: "",
    });

    setBrandName("");
    setBrandDesc("");
    setEditIndex("");
  };

  return (
    <Sidebar>
      <Grid container sx={{ padding: "15px" }} className="uniform-font-size">
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>Product {">"} Brand</Item>
          </Stack>
        </Box>
        <hr />
        {loading && <Loader />}
        {statusModal && (
          <Popups status={status} mssg={mssg} setStatusModal={setStatusModal} />
        )}
        {statusModal2 && <Popups2 setStatusModal2={setStatusModal2} />}
        {/* BOX 1 - Add Panel */}
        <Toaster position="top-center" reverseOrder={false} />

        <Grid
          className="uniform-font-size"
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
                fontSize: "16px",
              }}
            >
              <Tab label="Add Brand" />
              <Tab label="Add Category" />
              <Tab label="Add Sub Category" />
              <Tab label="Add Model" />
              <Tab label="Product Sku" />
            </Tabs>
          </Box>

          <form onSubmit={handleSaveBrand}>
            <Grid item md={3} ml={1} mt={3}>
              <InputLabel id="demo-simple-select-standard-label">
                <strong>Brand </strong>
              </InputLabel>
              <TextField
                requiredc
                id="standard-basic"
                variant="standard"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Grid>

            <Grid item md={10} ml={1} mt={5}>
              <InputLabel id="demo-simple-select-standard-label">
                <strong>Description </strong>
              </InputLabel>
              <TextField
                fullWidth
                required
                id="standard-basic"
                variant="standard"
                value={brandDesc}
                onChange={(e) => setBrandDesc(e.target.value)}
              />
            </Grid>

            <Grid container mt={5}>
              <Grid container>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={btnstyle}
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={btnstyle}
                    type="submit"
                  >
                    {editIndex !== "" ? "Update" : "Save"}
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
            <label>Upload</label>
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
                sx={btnstyle}
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
              <Button variant="contained" onClick={handleUpload} sx={btnstyle}>
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: "center" }}>
              <Link
                href={`${DTempUrl}/BrandUploadTemplate.xlsx`}
                underline="none"
              >
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => GetAllProductsReferenceData(0)}
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
            marginTop: "5px",
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

          <Grid item md={3} ml={1} mt={3}>
            <FormControl
              variant="standard"
              sx={{ m: 1, width: "80%", width: "20ch" }}
            >
              Brand
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                placeholder="Select"
                autoWidth
              >
                {brandList.length === 0 ? (
                  <MenuItem>
                    <em>--Select--</em>
                  </MenuItem>
                ) : (
                  brandList.map((brand) => (
                    <MenuItem key={brand.brandID} value={brand.brandID}>
                      {brand.brandName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item mt={3} md={3} xs={12} sm={6}>
            <Button
              variant="contained"
              size="medium"
              sx={btnstyle}
              onClick={handleSearchBrand}
            >
              Search
            </Button>
            &nbsp; &nbsp; &nbsp;
            <Button
              variant="contained"
              size="medium"
              sx={btnstyle}
              onClick={handleSrchCancel}
            >
              Cancel
            </Button>
          </Grid>

          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            <TableContainer className="table-container" component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#2255A4", textAlign: "center" }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>SNo</TableCell>
                    <TableCell style={{ color: "white" }}>Brand</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TableRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row, index) => (
                    <TableRow key={row.brandID}>
                      <TableCell>{row.sNo}</TableCell>
                      <TableCell>{row.brandName}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleStatus(row.brandID, index)}
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
                          onClick={() => handleEditBrand(row.brandID, index)}
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
      <DownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        downloadLink={downloadLink}
      />
      <Footer></Footer>
    </Sidebar>
  );
};

export default ManageBrand;
