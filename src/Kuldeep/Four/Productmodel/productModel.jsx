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
  styled,
  Grid,
  Link,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../pages/Sidebar/Sidebar2";
import { Constants } from "../../../constants/Constant";
import "./productModel.css";
import {
  GetAllProductsReferenceData,
  getBrandMasterData,
  getCategoryMasterData,
  getModelListAPI,
  getModelNameDropdownListAPI,
  getSubCategoryMasterData,
  manageModelAPI,
} from "../../../API service/APIservice";
import Loader from "../../../utils/Loader/Loader";
import Popups from "../../../components/common/Popups";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import config from "../../../components/common/config";
import DownloadModal from "../../../components/common/DownloadModel";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast, { Toaster } from "react-hot-toast";
import { Theme } from "../../../ThemeProvider/ThemeProvider";
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
const options = [];
const Is = [{ title: "Yes" }, { title: "No" }];
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
const SubCatDummy = {
  brandID: 0,
  categoryID: 0,
  subCategoryID: 0,
  status: 2 /*show all */,
  callType: 0 /* 0 = default, 1= get by Id */,
};
const modelDummyDetail = {
  type: "0" /* 0: Model Code, 1: Model Name */,
  brandID: "0",
  categoryID: "0",
  subCategoryID: "0",
};

const dummygetmodalList = {
  brandID: "0",
  categoryID: "0",
  subCategoryID: "0",
  modelID: "0",
  pageIndex: "1",
  pageSize: "50",
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
const productModel = () => {
  const { btnstyle } = useContext(Theme);
  const navigate = useNavigate();
  const [value, setTabValue] = useState(3);
  const { pageSize, DTempUrl } = config;
  const [brandOptList, setBrandOptList] = useState([]);
  const [catOptList, setCatOptList] = useState([]);
  const [subCatOptList, setSubCatOptList] = useState([]);
  const [brandID, setBrandID] = useState(null);
  const [statusModal, setStatusModal] = useState(false);
  const [flag, setFlag] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [status, setStatus] = useState("success");
  const [mssg, setMssg] = useState("message");
  const [categoryID, setCategoryID] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchParams, setSearchParams] = useState({
    brandID: "0",
    categoryID: "0",
    subCategoryID: "0",
    modelID: "0",
    pageIndex: "1",
    pageSize: "10",
  });
  const fileInputRef = useRef(null);
  const [modelDetailArr, setModdelDetailArr] = useState([]);

  const [formData, setFormData] = useState({
    type: "1" /* 1: New, 2: Edit, 3: Status Update */,
    modelID: "0",
    modelCode: "",
    modelName: "",
    brandID: "",
    categoryID: "",
    subCategoryID: "",
    isSystemGeneratedSerial: "0",
    isSerialised: "0",
    isRepairable: "0",
    isReturnable: "0",
    isStockMaintainBySystem: "0",
  });

  const handleBrandChange = async (event, value) => {
    const selectedBrandID = value ? value.brandID : "";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modalListres = await getModelListAPI(dummygetmodalList);
        setModalList(modalListres.modelDataList);
        const brandOpt = await getBrandMasterData(brandOptDummyBody);
        setBrandOptList(brandOpt.brandMasterList);
        // const modelInfo = await getModelNameDropdownListAPI(modelDummyDetail);
        // setModdelDetailArr(modelInfo.modelDataList);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    // console.log("run in Product");

    fetchData();
  }, [flag]);

  // Function to handle file selection

  const handleEdit = (index) => {
    setEdit(true);
    const selectedModal = modalList[index];
    // console.log("first edit ", modalList[index]);

    const updatedFormData = {
      ...selectedModal,
      type: "2",
      isReturnable: selectedModal.isReturnableDesc,
      isStockMaintainBySystem: selectedModal.isStockMaintainBySystemDesc,
      isSystemGeneratedSerial: selectedModal.isSystemGeneratedSerialDesc,
      isSerialised: selectedModal.isSerialisedDesc,
      isRepairable: selectedModal.isRepairableDesc,
    };

    setFormData(updatedFormData);
    // console.log("form Data", modalList[index]);
    handleBrandSearchChange(modalList[index].brandID);
    handleCategorySearchChange(modalList[index].categoryID); // Set type to "2" when editing
  };

  const handleFieldChange = (fieldName, value) => {
    // console.log(formData[fieldName], value);
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleBrandSearchChange = async (value) => {
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
        const subCatOpt = await getModelNameDropdownListAPI(
          updatedModelDummyBody
        );
        setModdelDetailArr(subCatOpt.modelDataList);
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
  // Function to handle file upload
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
          "https://qa.nuralservice.com/FirebolttServiceAPI/api/User/BulkUploadModelMaster/1?callType=1",
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
        }
        //  else {
        //   toast.success(
        //     uploadRes.data.statusMessage || "File uploaded successfully"
        //   );
        // }
      } catch (error) {
        // Handle errors
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );
        setMssg(error.response.data.statusMessage);
        setStatus(error.response.data.statusCode);
        setStatusModal(true);
        toast.error(
          `Error uploading file: ${error.response?.data || error.message}`
        );
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
      alert("Please upload a valid Excel file (.xlsx or .xls).");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      ...formData,
      isReturnable: formData.isReturnable === "Yes" ? "1" : "0",
      isSystemGeneratedSerial:
        formData.isSystemGeneratedSerial === "Yes" ? "1" : "0",
      isSerialised: formData.isSerialised === "Yes" ? "1" : "0",
      isRepairable: formData.isRepairable === "Yes" ? "1" : "0",

      isStockMaintainBySystem:
        formData.isStockMaintainBySystem === "Yes" ? "1" : "0",
    };
    // Create a copy of formData to transform "Yes" to "1" and "No" to "0"
    const transformedData = { ...postData };

    // List of keys that need to be transformed
    const keysToTransform = [
      "isSystemGeneratedSerial",
      "isSerialised",
      "isRepairable",
      "isReturnable",
      "isStockMaintainBySystem",
    ];

    // Transform the values
    keysToTransform.forEach((key) => {
      if (transformedData[key] === "Yes") {
        transformedData[key] = "1";
      } else if (transformedData[key] === "No") {
        transformedData[key] = "0";
      }
    });

    // console.log("transformedData", transformedData);

    try {
      let saveData = await manageModelAPI(transformedData);
      setStatusModal(true);
      setFlag(!flag);
      setStatus(saveData.statusCode);
      setMssg(saveData.statusMessage);
    } catch (error) {
      console.log("error on saving data", error);
    } finally {
      setFormData({
        type: "1" /* 1: New, 2: Edit, 3: Status Update */,
        modelID: "0",
        modelCode: "",
        modelName: "",
        brandID: "",
        categoryID: "",
        subCategoryID: "",
        isSystemGeneratedSerial: "",
        isSerialised: "",
        isRepairable: "",
        isReturnable: "",
        isStockMaintainBySystem: "",
      });
      if (edit) {
        setEdit(false);
      }
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    // console.log("searchParams in finall search", searchParams);
    try {
      const modalListRes = await getModelListAPI(searchParams);
      setModalList(modalListRes.modelDataList);
      // console.log("modalListRes", modalListRes);
    } catch (error) {
      setStatusModal(true);

      setStatus(error.response.data.statusCode);
      setMssg(error.response.data.statusMessage);
      console.error("Error fetching model list", error);
      setModalList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = async () => {
    setSearchParams({
      brandID: "0",
      categoryID: "0",
      subCategoryID: "0",
      modelID: "0",
      pageIndex: "1",
      pageSize: "10",
    });
    const modalListres = await getModelListAPI(dummygetmodalList);
    setModalList(modalListres.modelDataList);
  };

  const handleActive = async (index) => {
    const postToEDit = modalList[index];
    const updatedStatus = postToEDit.status == "1" ? "0" : "1";
    const updatedPostData = {
      type: 3,
      modelID: postToEDit.modelID,
      modelCode: postToEDit.modelCode,
      modelName: postToEDit.modelName,
      categoryID: postToEDit.categoryID,
      subCategoryID: postToEDit.subCategoryID,
      isSystemGeneratedSerial: postToEDit.isSystemGeneratedSerial,
      isSerialised: postToEDit.isSerialised,
      isRepairable: postToEDit.isRepairable,
      isReturnable: postToEDit.isReturnable,
      isStockMaintainBySystem: postToEDit.isStockMaintainBySystem,
      status: updatedStatus,
    };
    // console.log(`updated post data :${updatedStatus}`);
    try {
      let status = await manageModelAPI(updatedPostData);
      toast.success(status.statusMessage);
      setFlag(!flag);
      const newTableData = [...modalList];
      newTableData[index].status = updatedStatus;
      setModalList(newTableData);
    } catch (err) {
      console.log(
        `Error in handle active/inaactive product/spare price  ${err}`
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      type: "1" /* 1: New, 2: Edit, 3: Status Update */,
      modelID: "0",
      modelCode: "",
      modelName: "",
      brandID: "",
      categoryID: "",
      subCategoryID: "",
      isSystemGeneratedSerial: "",
      isSerialised: "",
      isRepairable: "",
      isReturnable: "",
      isStockMaintainBySystem: "",
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

  return (
    // <Box component="main">
    <Grid container sx={{ width: "100%" }}>
      <Grid container sx={{ padding: "15px" }}>
        <Sidebar>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Stack spacing={2}>
              <Item>Product {">"} Model </Item>
            </Stack>
          </Box>

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
            <form id="productModelForm" onSubmit={handleSave}>
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
                    onChange={(event, value) =>
                      handleFieldChange(
                        "subCategoryID",
                        value ? value.subCategoryID : "0"
                      )
                    }
                    value={
                      subCatOptList.find(
                        (option) =>
                          option.subCategoryID === formData.subCategoryID
                      ) || null
                    }
                  />
                </div>
                <div className="Autocomplete">
                  <TextField
                    required
                    label="Model Name"
                    variant="standard"
                    InputLabelProps={{
                      required: false, // Ensures the label shrinks as expected
                    }}
                    name="modelName"
                    value={formData.modelName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="line-textfield">
                <div className="Autocomplete">
                  <TextField
                    required
                    label="Model Code"
                    variant="standard"
                    InputLabelProps={{
                      required: false, // Ensures the label shrinks as expected
                    }}
                    name="modelCode"
                    value={formData.modelCode}
                    onChange={handleChange}
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
                        label="System Generated Serial No"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={(event, value) =>
                      handleFieldChange(
                        "isSystemGeneratedSerial",
                        value ? value.title : ""
                      )
                    }
                    value={
                      Is.find(
                        (option) =>
                          option.title === formData.isSystemGeneratedSerial
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
                        label="Is Serialized"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={(event, value) =>
                      handleFieldChange(
                        "isSerialised",
                        value ? value.title : "0"
                      )
                    }
                    value={
                      Is.find(
                        (option) => option.title === formData.isSerialised
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
                        label="Is Repairable"
                        variant="standard"
                        InputLabelProps={{
                          required: false, // Ensures the label shrinks as expected
                        }}
                      />
                    )}
                    onChange={(event, value) =>
                      handleFieldChange(
                        "isRepairable",
                        value ? value.title : "0"
                      )
                    }
                    value={
                      Is.find(
                        (option) => option.title === formData.isRepairable
                      ) || null
                    }
                  />
                </div>
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
                        value ? value.title : "0"
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
                >
                  {!edit ? "Save" : "Update"}
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
                  underline="none"
                  href={`${DTempUrl}/ModelUploadTemplate.xlsx`}
                >
                  {"  Download Template"}
                </Link>
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={3}>
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => GetAllProductsReferenceData(3)}
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
                  options={modelDetailArr}
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
                      value ? value.modelID : "0"
                    )
                  }
                  value={
                    modelDetailArr.find(
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
                    <TableCell style={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* First Row */}
                  {modalList.length > 0 ? (
                    modalList.map((elem, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{elem.brandName}</TableCell>
                        <TableCell>{elem.categoryName}</TableCell>
                        <TableCell>{elem.subCategoryName}</TableCell>
                        <TableCell>{elem.modelName}</TableCell>
                        <TableCell align="left">
                          <IconButton
                            onClick={() => handleActive(ind)}
                            sx={{ "&:focus": { outline: "none" } }}
                          >
                            <img
                              src={
                                elem.status === "1"
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt={elem.status === "1" ? "Active" : "Inactive"}
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
          </div>
        </Sidebar>
        <DownloadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          downloadLink={downloadLink}
        />
      </Grid>
    </Grid>
    // </Box>
  );
};

export default productModel;
