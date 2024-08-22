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
  Tabs,
  Tab,
  Stack,
  styled,
  Grid,
  Link,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../pages/Sidebar/Sidebar2";
import { Constants } from "../../../constants/Constant";
import "./productSku.css";
import {
  getBrandMasterData,
  getCategoryMasterData,
  getModelNameDropdownListAPI,
  getSubCategoryMasterData,
  getModelDropdownListAPI,
  manageSKUAPI,
  getSKUListAPI,
  GetAllProductsReferenceData,
} from "../../../API service/APIservice";
import Loader from "../../../utils/Loader/Loader";
import Popups, { Popups2 } from "../../../components/common/Popups";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/common/CustomPagination";
import config from "../../../components/common/config";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadModal from "../../../components/common/DownloadModel";
import toast, { Toaster } from "react-hot-toast";
import { Theme } from "../../../ThemeProvider/ThemeProvider";
const { DTempUrl, pageSize } = config;

const options = [];
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
const Is = [{ title: "Yes" }, { title: "No" }];
const dummygetmodalList = {
  brandID: "0",
  categoryID: "0",
  subCategoryID: "0",
  modelID: "0",
  pageIndex: "1",
  pageSize: pageSize,
};
const modelDummyDetail = {
  type: "0" /* 0: Model Code, 1: Model Name */,
  brandID: "0",
  categoryID: "0",
  subCategoryID: "0",
};
const brandOptDummyBody = {
  brandID: 0,
  status: 2,
};
const CatDummyBody = {
  brandID: 0,
  categoryID: 0,
  status: 2 /*show all */,
};
const SubCatDummy = {
  brandID: 0,
  categoryID: 0,
  subCategoryID: 0,
  status: 2 /*show all */,
};

const dropDownDummy = {
  brandID: "0",
  categoryID: "0",
  subCategoryID: "0",
};

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
const productSku = () => {
  const navigate = useNavigate();
  const [value, setTabValue] = useState(4);
  const { btnstyle } = useContext(Theme);

  const [brandOptList, setBrandOptList] = useState([]);
  const [catOptList, setCatOptList] = useState([]);
  const [subCatOptList, setSubCatOptList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [SKUList, setSKUList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandID, setBrandID] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [modelOptList, setModelOptList] = useState([]);
  const [dataSize, setDataSize] = useState(pageSize);
  const [flag, setFlag] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [page, setPage] = useState(1);
  const [statusModal2, setStatusModal2] = useState(false);
  const [totalRecords, setTotalRecords] = useState(1);
  const [status, setStatus] = useState("");
  const [mssg, setMssg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const fileInputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [searchParams, setSearchParams] = useState({
    ...dummygetmodalList,
  });

  const [formData, setFormData] = useState({
    type: "1" /* 1: New, 2: Edit, 3: Status Update */,
    skuID: "0",
    skuCode: "",
    skuName: "",
    brandID: "0",
    categoryID: "0",
    subCategoryID: "0",
    modelID: "0",
    isReturnable: "",
    isStockMaintainBySystem: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SKUListArr = await getSKUListAPI(searchParams);
        setSKUList(SKUListArr.skuDataList);
        setTotalRecords(SKUListArr.totalRecords);
        setDataSize(SKUListArr.skuDataList.length);
        const brandOpt = await getBrandMasterData(brandOptDummyBody);
        setBrandOptList(brandOpt.brandMasterList);
        // const modelInfo = await getModelNameDropdownListAPI(modelDummyDetail);
        // setModdelDetailArr(modelInfo.modelDataList);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, [flag]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setFlag(!flag);
    console.log("newPage", newPage);
    setSearchParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
    console.log(searchParams);
  };

  const handleFieldChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleBrandChange = async (event, value) => {
    const selectedBrandID = value ? value.brandID : "0";
    handleFieldChange("brandID", selectedBrandID);

    if (selectedBrandID) {
      setBrandID(selectedBrandID);
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

  const handleCatChange = async (event, value) => {
    const selectedCatID = value ? value.categoryID : "0";
    handleFieldChange("categoryID", selectedCatID);

    if (selectedCatID) {
      setCategoryID(selectedCatID);
      try {
        const updatedSubDummyBody = {
          ...SubCatDummy,
          brandID: brandID,
          categoryID: selectedCatID,
        };
        const subCatOpt = await getSubCategoryMasterData(updatedSubDummyBody);
        setSubCatOptList(subCatOpt.subCategoryMasterList);
        // console.log("SubCatOpt", subCatOpt);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatOptList([]);
    }
  };

  const handleSubCat = async (event, value) => {
    const selectedCatID = value ? value.subCategoryID : "0";
    console.log(value);
    handleFieldChange("subCategoryID", selectedCatID);
    if (selectedCatID) {
      try {
        const updatedModelDummyBody = {
          ...dropDownDummy,
          brandID: brandID,
          categoryID: categoryID,
          subCategoryID: selectedCatID,
        };
        const subCatOpt = await getModelDropdownListAPI(updatedModelDummyBody);
        setModelOptList(subCatOpt.modelDataList);
        // console.log("SubCatOpt", subCatOpt);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatOptList([]);
    }
  };

  const handleSearchFieldChange = (fieldName, value) => {
    // console.log(value, fieldName);
    setSearchParams({ ...searchParams, [fieldName]: value });

    if (fieldName === "brandID") {
      handleBrandSearchChange(value);
    }

    if (fieldName === "categoryID") {
      handleCategorySearchChange(value);
    }
    if (fieldName === "subCategoryID") {
      handleSubCatSearchChange(value);
    }

    if (fieldName === "modelID") {
      handleModelSearchChange(value);
    }
  };

  const handleBrandSearchChange = async (value) => {
    // console.log("edit");
    const searchParamItem = value ? value : "0";
    if (searchParamItem) {
      // console.log("searchParamItem", searchParamItem);
      setBrandID(searchParamItem);
      try {
        const updatedCatDummyBody = {
          ...CatDummyBody,
          brandID: searchParamItem,
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

  const handleCategorySearchChange = async (value) => {
    const searchParamItem = value ? value : "0";
    const selectedBrandID = searchParams.brandID;
    if (searchParamItem) {
      setCategoryID(searchParamItem);
      try {
        const updatedSubDummyBody = {
          ...SubCatDummy,
          brandID: selectedBrandID,
          categoryID: searchParamItem,
        };
        const subCatOpt = await getSubCategoryMasterData(updatedSubDummyBody);
        setSubCatOptList(subCatOpt.subCategoryMasterList);
        // console.log("SubCatOpt in search", subCatOpt);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatOptList([]);
    }
  };

  const handleSubCatSearchChange = async (event, value) => {
    const selectedCatID = value ? value.subCategoryID : "0";
    const BI = value ? value.brandID : "0";
    const CI = value ? value.categoryID : "0";
    // console.log(BI, CI, selectedCatID);

    if (selectedCatID) {
      try {
        const updatedModelDummyBody = {
          ...dropDownDummy,
          brandID: BI,
          categoryID: CI,
          subCategoryID: selectedCatID,
        };
        const subCatOpt = await getModelDropdownListAPI(updatedModelDummyBody);
        setModelOptList(subCatOpt.modelDataList);
        // console.log("SubCatOpt", subCatOpt);
      } catch (err) {
        console.error("Failed to fetch category data", err);
      }
    } else {
      setCatOptList([]);
    }
  };

  const handleModelSearchChange = async (value) => {
    const searchParamItem = value ? value.modelID : "0";
    // console.log("searchParamItem in modal", searchParamItem);
    if (searchParamItem) {
      try {
        // Update searchParams with the selected modelID
        setSearchParams({ ...searchParams, modelID: searchParamItem });
      } catch (err) {
        console.error("Failed to handle model search change", err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      ...formData,
      isReturnable: formData.isReturnable === "Yes" ? "1" : "0",
      isStockMaintainBySystem:
        formData.isStockMaintainBySystem === "Yes" ? "1" : "0",
    };
    // Create a copy of formData to transform "Yes" to "1" and "No" to "0"
    const transformedData = { ...postData };

    // List of keys that need to be transformed
    const keysToTransform = ["isReturnable", "isStockMaintainBySystem"];

    // Transform the values
    keysToTransform.forEach((key) => {
      if (transformedData[key] === "Yes") {
        transformedData[key] = "1";
      } else if (transformedData[key] === "No") {
        transformedData[key] = "0";
      }
    });

    // Only keep the required keys
    const keysToKeep = [
      "type",
      "skuID",
      "skuCode",
      "skuName",
      "brandID",
      "categoryID",
      "subCategoryID",
      "modelID",
      "isReturnable",
      "isStockMaintainBySystem",
    ];

    const dataToSave = {};
    keysToKeep.forEach((key) => {
      dataToSave[key] = transformedData[key];
    });

    // console.log("dataToSave", dataToSave);

    try {
      let saveData = await manageSKUAPI(dataToSave);
      setFlag(!flag);
      setStatusModal(true);

      setStatus(saveData.statusCode);
      setMssg(saveData.statusMessage);
    } catch (error) {
      console.log("error on saving data", error);
    } finally {
      if (edit) {
        setEdit(false);
      }
      setFormData({
        type: "1" /* 1: New, 2: Edit, 3: Status Update */,
        skuID: "0",
        skuCode: "",
        skuName: "",
        brandID: "0",
        categoryID: "0",
        subCategoryID: "0",
        modelID: "0",
        isReturnable: "",
        isStockMaintainBySystem: "",
      });
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setFlag(!flag);
    setLoading(true);
    console.log("searchParams in finall search", searchParams);
    try {
      const SKUListArr = await getSKUListAPI(searchParams);
      console.log(SKUListArr);
    } catch (error) {
      setStatusModal2(true);
      setSKUList([]);
      console.error("Error fetching model list", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActive = async (index) => {
    const postToEDit = SKUList[index];
    const updatedStatus = postToEDit.status == "1" ? "0" : "1";
    const updatedPostData = {
      type: 3,
      skuCode: postToEDit.skuCode,
      skuID: postToEDit.skuID,
      skuName: postToEDit.skuName,
      modelID: postToEDit.modelID,
      brandID: postToEDit.brandID,
      categoryID: postToEDit.categoryID,
      subCategoryID: postToEDit.subCategoryID,
      isReturnable: postToEDit.isReturnable,
      isStockMaintainBySystem: postToEDit.isStockMaintainBySystem,
      status: updatedStatus,
    };
    // console.log(`updated post data :${updatedStatus}`);
    try {
      let active = await manageSKUAPI(updatedPostData);
      toast.success(active.statusMessage);
      setFlag(!flag);
      const newTableData = [...SKUList];
      newTableData[index].status = updatedStatus;
      setSKUList(newTableData);
    } catch (err) {
      console.log(
        `Error in handle active/inaactive product/spare price  ${err}`
      );
    }
  };

  const handleEdit = (index) => {
    const selectedSKU = SKUList[index];
    // console.log("first edit ", SKUList[index]);
    setEdit(true);
    const updatedFormData = {
      ...selectedSKU,
      type: "2",
      isReturnable: selectedSKU.isReturnableDesc,
      isStockMaintainBySystem: selectedSKU.isStockMaintainBySystemDesc,
    };

    setFormData(updatedFormData);

    // console.log("form Data", updatedFormData);
    handleBrandSearchChange(selectedSKU.brandID);
    handleCategorySearchChange(selectedSKU.categoryID);
    handleSubCatSearchChange(selectedSKU.subCategoryID);
    // Set type to "2" when editing
  };

  const handleViewAll = async () => {
    const SKUListArr = await getSKUListAPI(dummygetmodalList);
    setSKUList(SKUListArr.skuDataList);
    setSearchParams({});
  };

  const handleCancel = () => {
    setFormData({
      type: "1" /* 1: New, 2: Edit, 3: Status Update */,
      skuID: "0",
      skuCode: "",
      skuName: "",
      brandID: "0",
      categoryID: "0",
      subCategoryID: "0",
      modelID: "0",
      isReturnable: "0",
      isStockMaintainBySystem: "0",
    });
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate("/Product/managebrand");
    else if (newValue === 1) navigate("/Product/managecategory");
    else if (newValue === 2) navigate("/Product/managesubcategory");
    else if (newValue === 3) navigate("/Productmodel");
    else if (newValue === 4) navigate("/Productsku");
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
          "https://qa.nuralservice.com/FirebolttServiceAPI/api/User/BulkUploadPartPriceMaster/1?callType=1",
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
    <Box component="main">
      <Grid container sx={{ padding: "15px" }}>
        <Sidebar>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Stack spacing={2}>
              <Item>Product {">"} SKU</Item>
            </Stack>
          </Box>
          <Divider />
          {loading && <Loader />}
          {statusModal && (
            <Popups
              status={status}
              mssg={mssg}
              setStatusModal={setStatusModal}
            />
          )}
          <div className="textfield-box">
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
            <Toaster position="top-center" reverseOrder={false} />
            <form onSubmit={handleSave}>
              <div className="line-textfield">
                <div className="Autocomplete">
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={brandOptList}
                    getOptionLabel={(option) => option.brandName}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Select Brand"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={handleBrandChange}
                    value={
                      brandOptList.find(
                        (option) => option.brandID === formData.brandID
                      ) || null
                    }
                  />
                </div>{" "}
                <div className="Autocomplete">
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={catOptList}
                    getOptionLabel={(option) => option.categoryName}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Select Category"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={handleCatChange}
                    value={
                      catOptList.find(
                        (option) => option.categoryID === formData.categoryID
                      ) || null
                    }
                  />
                </div>
                <div className="Autocomplete">
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={subCatOptList}
                    getOptionLabel={(option) => option.subCategoryName}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Select Sub Category"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={handleSubCat}
                    value={
                      subCatOptList.find(
                        (option) =>
                          option.subCategoryID === formData.subCategoryID
                      ) || null
                    }
                  />
                </div>
                <div className="Autocomplete">
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={modelOptList}
                    getOptionLabel={(option) => option.modelName}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Select Model"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={(event, value) =>
                      handleFieldChange("modelID", value ? value.modelID : "0")
                    }
                    value={
                      modelOptList.find(
                        (option) => option.modelID === formData.modelID
                      ) || null
                    }
                  />
                </div>
              </div>
              <div className="line-textfield">
                <TextField
                  required
                  className="text"
                  id="standard-basic"
                  label="SKU Name"
                  variant="standard"
                  InputLabelProps={{
                    required: false, // Ensures the label shrinks as expected
                  }}
                  value={formData.skuName}
                  onChange={(e) => handleFieldChange("skuName", e.target.value)}
                />

                <TextField
                  required
                  className="text"
                  id="standard-basic"
                  label="SKU Code"
                  variant="standard"
                  InputLabelProps={{
                    required: false, // Ensures the label shrinks as expected
                  }}
                  value={formData.skuCode}
                  onChange={(e) => handleFieldChange("skuCode", e.target.value)}
                />
                <div className="Autocomplete"></div>
                <div className="Autocomplete"></div>
              </div>
              <div className="line-textfield">
                <div className="Autocomplete">
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={Is}
                    getOptionLabel={(Is) => Is.title}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Is Returnable"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={(event, value) =>
                      handleFieldChange(
                        "isReturnable",
                        value ? value.title : ""
                      )
                    }
                    value={
                      Is.find(
                        (option) => option.title === formData.isReturnable
                      ) || null
                    }
                  />
                </div>

                <div className="Autocomplete">
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={Is}
                    getOptionLabel={(Is) => Is.title}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Stock Maintain By System"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={(event, value) =>
                      handleFieldChange(
                        "isStockMaintainBySystem",
                        value ? value.title : ""
                      )
                    }
                    value={
                      Is.find(
                        (option) =>
                          option.title === formData.isStockMaintainBySystem
                      ) || null
                    }
                  />
                </div>
                <div className="Autocomplete"></div>
                <div className="Autocomplete"></div>
              </div>

              <div className="buttons">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33499F",
                    color: "white",
                    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33499F",
                    color: "white",
                    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  }}
                  type="submit"
                  // onClick={handleSave}
                >
                  {edit ? "Update" : "Save"}
                </Button>
              </div>
            </form>
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
              <Grid
                item
                xs={12}
                sm={6}
                md={2}
                sx={{ justifyContent: "center" }}
              >
                <Link
                  href={`${DTempUrl}/SKUMasterUploadTemplate.xlsx`}
                  underline="none"
                >
                  {" Download Template"}
                </Link>
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={3}>
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => GetAllProductsReferenceData(4)}
                  underline="none"
                >
                  {" Download Reference Code"}
                </Link>
              </Grid>{" "}
            </div>
          </div>

          <div className="textfield-box">
            <div className="upload-excel">
              <p>List View</p>
            </div>
            <div className="line-textfield">
              <div className="Autocomplete">
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={brandOptList}
                  getOptionLabel={(option) => option.brandName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchFieldChange(
                      "brandID",
                      value ? value.brandID : "0"
                    )
                  }
                  value={
                    brandOptList.find(
                      (option) => option.brandID === searchParams.brandID
                    ) || null
                  }
                />
              </div>
              <div className="Autocomplete">
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={catOptList}
                  getOptionLabel={(option) => option.categoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchFieldChange(
                      "categoryID",
                      value ? value.categoryID : "0"
                    )
                  }
                  value={
                    catOptList.find(
                      (option) => option.categoryID === searchParams.categoryID
                    ) || null
                  }
                />
              </div>
              <div className="Autocomplete">
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={subCatOptList}
                  getOptionLabel={(option) => option.subCategoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Sub Category"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchFieldChange(
                      "subCategoryID",
                      value ? value.subCategoryID : "0"
                    )
                  }
                  value={
                    subCatOptList.find(
                      (option) =>
                        option.subCategoryID === searchParams.subCategoryID
                    ) || null
                  }
                />
              </div>
              <div className="Autocomplete">
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={modelOptList}
                  getOptionLabel={(option) => option.modelName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Model"
                      variant="standard"
                      InputLabelProps={{
                        required: false, // Ensures the label shrinks as expected
                      }}
                    />
                  )}
                  onChange={(event, value) =>
                    handleSearchFieldChange(
                      "modelID",
                      value ? value.modelID : ""
                    )
                  }
                  value={
                    modelOptList.find(
                      (option) => option.modelID === searchParams.modelID
                    ) || null
                  }
                />
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>{" "}
              &nbsp;
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                onClick={handleViewAll}
              >
                View All
              </Button>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="table-heading">
                    <TableCell style={{ color: "white" }}>Brand</TableCell>
                    <TableCell style={{ color: "white" }}>Category</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Sub Category
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Model</TableCell>
                    <TableCell style={{ color: "white" }}>SKU Code</TableCell>
                    <TableCell style={{ color: "white" }}>SKU Name</TableCell>

                    <TableCell style={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* First Row */}
                  {SKUList.length > 0 ? (
                    SKUList.map((elem, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{elem.brandName}</TableCell>{" "}
                        <TableCell>{elem.categoryName}</TableCell>{" "}
                        <TableCell>{elem.subCategoryName}</TableCell>{" "}
                        <TableCell>{elem.modelName}</TableCell>{" "}
                        <TableCell>{elem.skuCode}</TableCell>{" "}
                        <TableCell>{elem.skuName}</TableCell>{" "}
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
                      <TableCell colSpan={6} align="center">
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
          {statusModal2 && <Popups2 setStatusModal2={setStatusModal2} />}
        </Sidebar>
        <DownloadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          downloadLink={downloadLink}
        />
      </Grid>
    </Box>
  );
};

export default productSku;
