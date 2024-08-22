import {
  Box,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  styled,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./Resionmaster.css";
import axios from "axios";
import {
  getProductCategoryMaster,
  getReasonMasterDataListAPI,
  getReasonTypeMasterAPI,
  manageReasonMasterAPI,
} from "../../API service/APIservice";
import CustomPagination from "../../components/common/CustomPagination";
import config from "../../components/common/config";
import Loader from "../../utils/Loader/Loader";
import Popups, { Popups2 } from "../../components/common/Popups";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Theme } from "../../ThemeProvider/ThemeProvider";
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
const Resionmaster = () => {
  const { btnstyle } = useContext(Theme);

  const pageSize = config.pageSize;
  const [selectedFile, setSelectedFile] = useState(null);
  const [reasonTypeList, setReasonTypeList] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [allListData, setAllListData] = useState([]);
  const [searchId, setSearchId] = useState(0);
  const [dataSize, setDataSize] = useState(pageSize);
  const [flag, setFlag] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statusModal2, setStatusModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("success");
  const [mssg, setMssg] = useState("message");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [formData, setFormData] = useState({
    type: "1",
    reasonMasterID: "0",
    reasonTypeID: "",
    productCategoryID: "0",
    warrantyVoidReason: "",
  });
  const [dummyBody, setDummyBody] = useState({
    reasonTypeID: "0",
    productCategoryID: "0",
    pageIndex: "1",
    pageSize: pageSize,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const reasonTypeRes = await getReasonTypeMasterAPI();
        setReasonTypeList(reasonTypeRes.reasonTypeList);

        const productTypeRes = await getProductCategoryMaster();
        setProductCat(productTypeRes.productCategoryMasterListData);

        const allReasonDataRes = await getReasonMasterDataListAPI(dummyBody);
        setAllListData(allReasonDataRes.reasonMasterList);
        setTotalRecords(allReasonDataRes.totalRecords);
        setDataSize(allReasonDataRes.reasonMasterList.length);
      } catch (err) {
        setDataSize(0);
        setAllListData([]);
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dummyBody, flag]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post("/upload", formData);
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const handleDownload = () => {
    console.log("Downloading file...");
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSave = () => {
    // Determine the type based on the form data
    const formType = formData.reasonMasterID === "0" ? "1" : "2"; // "1" for new, "2" for edit

    // Construct payload for save
    const formDataToSend = {
      ...formData,
      type: formType, // Set type based on the operation
    };

    // Remove fields with empty string values
    Object.keys(formDataToSend).forEach(
      (key) =>
        (formDataToSend[key] === "" || formDataToSend[key] === null) &&
        delete formDataToSend[key]
    );

    // console.log("formDataToSend", formDataToSend);

    manageReasonMasterAPI(formDataToSend)
      .then((result) => {
        // console.log("result", result);
        setStatusModal(true);
        setFlag(!flag);
        setStatus(result.statusCode);
        setMssg(result.statusMessage);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setFlag(!flag);
        // Reset form data after save
        setFormData({
          type: "1", // Reset type to "1" for new entries
          reasonMasterID: "0",
          reasonTypeID: "",
          productCategoryID: "",
          warrantyVoidReason: "",
        });
        setSearchId(null);
      });
  };

  const handleSearchChange = (fieldName, value) => {
    setSearchId(value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const allReasonData = await getReasonMasterDataListAPI({
        reasonTypeID: "0",
        productCategoryID: searchId,
        pageIndex: "1",
        pageSize: pageSize,
      });
      setAllListData(allReasonData.reasonMasterList);
      setTotalRecords(allReasonData.totalRecords);
      setDataSize(allReasonData.reasonMasterList.length);
    } catch (error) {
      console.log("error on search", error.response);
      setAllListData([]);
      setStatusModal2(true);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = async () => {
    setFlag(!flag);
    try {
      const allReasonData = await getReasonMasterDataListAPI(dummyBody);
      setAllListData(allReasonData.reasonMasterList);
    } catch (err) {
      console.error("Failed to fetch all data", err);
    } finally {
      setSearchId(null);
    }
  };

  const handleEdit = (index) => {
    console.log("form Data", allListData[index]);

    setFormData({
      ...allListData[index],
      type: "2",
      warrantyVoidReason: allListData[index].reason || "",
    }); // Set type to "2" when editing
  };

  const handleActive = async (index) => {
    const postToEDit = allListData[index];
    const updatedStatus = postToEDit.status == "1" ? "0" : "1";
    const updatedPostData = {
      type: 3,
      reasonMasterID: postToEDit.reasonMasterID,
      reasonTypeID: postToEDit.reasonTypeID,
      productCategoryID: postToEDit.productCategoryID,
      warrantyVoidReason: postToEDit.warrantyVoidReason,
      status: updatedStatus,
    };
    // console.log(`updated post data :${updatedStatus}`);
    try {
      await manageReasonMasterAPI(updatedPostData);
      const newTableData = [...allListData];
      newTableData[index].status = updatedStatus;
      setAllListData(newTableData);
    } catch (err) {
      console.log(
        `Error in handle active/inaactive product/spare price  ${err}`
      );
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setDummyBody((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.resionMaster}
        </Typography>
        <Divider />
        <form onSubmit={handleSave}>
          <div className="textfield-box">
            <div className="line-textfield">
              <div className="Autocomplete">
                <Autocomplete
                  id="reason-type-autocomplete"
                  options={reasonTypeList}
                  getOptionLabel={(option) => option.reasonType}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Reason Type"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleFieldChange(
                      "reasonTypeID",
                      value ? value.reasonTypeID : "0"
                    )
                  }
                  value={
                    reasonTypeList.find(
                      (option) => option.reasonTypeID === formData.reasonTypeID
                    ) || null
                  }
                />
              </div>
              <div className="Autocomplete">
                <TextField
                  label="Warranty Void Reason"
                  onChange={(e) =>
                    handleFieldChange("warrantyVoidReason", e.target.value)
                  }
                  required
                  InputLabelProps={{
                    required: false, // Ensures the label shrinks as expected
                  }}
                  value={formData.warrantyVoidReason}
                  variant="standard"
                />
              </div>
              <div className="Autocomplete">
                <Autocomplete
                  id="product-category-autocomplete"
                  options={productCat}
                  getOptionLabel={(option) => option.categorySapCode}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Category"
                      variant="standard"
                      required
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleFieldChange(
                      "productCategoryID",
                      value ? value.productCategoryID : "0"
                    )
                  }
                  value={
                    productCat.find(
                      (option) =>
                        option.productCategoryID === formData.productCategoryID
                    ) || null
                  }
                />
              </div>
            </div>
            <div className="buttons">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                }}
                type="Submit"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="textfield-box">
            <div className="upload-excel">
              <p style={{ fontWeight: "bold" }}>Bulk Upload</p>
            </div>
            <div className="upload">
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
                    // ref={fileInputRef}
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
              <a
                href="#"
                onClick={handleDownload}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Download Template
              </a>
              <a
                href="#"
                onClick={handleDownload}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Download Reference Code
              </a>
            </div>
          </div>
        </form>
        <div className="textfield-box">
          <div className="upload-excel">
            <p>List View</p>
          </div>
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="search-product-category-autocomplete"
                options={productCat}
                getOptionLabel={(option) => option.categorySapCode}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Category"
                    variant="standard"
                  />
                )}
                onChange={(event, value) =>
                  handleSearchChange(
                    "productCategoryID",
                    value ? value.productCategoryID : ""
                  )
                }
                value={
                  productCat.find(
                    (option) => option.productCategoryID === searchId
                  ) || null
                }
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
              &nbsp; &nbsp; &nbsp;
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
                onClick={handleViewAll}
              >
                View All
              </Button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-heading">
                  <TableCell style={{ color: "white" }}>
                    Warranty Void Reason
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Product Category
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allListData.length > 0 ? (
                  allListData.map((elem, ind) => (
                    <TableRow key={ind}>
                      <TableCell>
                        {elem.reasonType ? elem.reasonType : "xxxx"}
                      </TableCell>
                      <TableCell>
                        {elem.productCategory ? elem.productCategory : "xxx"}
                      </TableCell>
                      <TableCell align="right">
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
          <div id="paginationDiv">
            <CustomPagination
              page={page}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
              dataSize={dataSize}
            />
          </div>
        </div>
        {loading && <Loader />}
        {statusModal && (
          <Popups status={status} mssg={mssg} setStatusModal={setStatusModal} />
        )}
        {statusModal2 && <Popups2 setStatusModal2={setStatusModal2} />}
      </Sidebar>
    </Box>
  );
};

export default Resionmaster;
