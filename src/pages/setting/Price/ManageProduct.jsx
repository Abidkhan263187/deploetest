import React, { useEffect, useRef, useState } from "react";
import "./manageProduct.css";
import {
  Box,
  Grid,
  Paper,
  Stack,
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
import { responsiveFontSizes, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import Sidebar from "../../Sidebar/Sidebar2";
import {
  createProductSpare,
  fetchProductListAPI,
  getItemCodeDropdown,
  getPriceGroupDropdown,
  GetPriceMasterReferenceDataLinks,
  getPriceTypeDropdown,
} from "../../../API service/APIservice";
import dayjs from "dayjs";
import CustomPagination from "../../../components/common/CustomPagination";
import config from "../../../components/common/config";
import DownloadModal from "../../../components/common/DownloadModel";
import Loader from '../../../utils/Loader/Loader'
import axios from "axios";
// import isValid from 'dayjs/plugin/isValid';
// dayjs.extend(isValid);

const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

const StyledDatePicker = styled(DatePicker)({
  "& .MuiOutlinedInput-root": {
    border: "none", // Remove border around the DatePicker
  },
});
function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

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

const ManageProduct = () => {
  const { pageSize, DTempUrl } = config;
  const [age, setAge] = React.useState("");
  // const [value, setValue] = React.useState(2);
  const [priceType, setPriceType] = useState([]);
  const [priceTypeList, setPriceTypeList] = useState("");
  const [priceGroup, setPriceGroup] = useState([]);
  const [priceGroupList, setPriceGroupList] = useState("");
  const [priceTypeView, setPriceTypeView] = useState("");
  const [priceGroupView, setPriceGroupView] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemCode, setItemCode] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dataSize, setDataSize] = useState(pageSize);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState({
    type: "" /* 1: New, 2: Edit, 3: Status Update */,
    partPriceID: "",
    partCode: "",
    priceTypeID: "",
    priceGroupID: "",
    validFrom: dayjs(),
    price: "",
  });
  const [date, setDate] = useState("");

  // const handlePriceTypeDropdown = (event) => {
  //   setPriceTypeList(event.target.value);
  // };
  // const handlePriceGroupDropdown = (event) => {
  //   setPriceGroupList(event.target.value);
  // };
  const handlePriceTypeViewDropdown = (event) => {
    setPriceTypeView(event.target.value);
  };
  const handlePriceGroupViewDropdown = (event) => {
    setPriceGroupView(event.target.value);
  };
  const handleItemCodeDropdown = (event) => {
    setItemCode(event.target.value);
  };
  const handleActive = async (index) => {
    const postToEDit = tableData[index];
    const updatedStatus = postToEDit.status === "1" ? "0" : "1";
    const updatedPostData = {
      type: 3,
      partPriceID: postToEDit.partPriceID,
      partCode: postToEDit.partCode,
      priceTypeID: postToEDit.priceTypeID,
      priceGroupID: postToEDit.priceGroupID,
      validFrom: dayjs(postToEDit.validFrom),
      price: postToEDit.price,
      status: postToEDit.status,
    };
    console.log(`updated post data :${updatedStatus}`);
    try {
      await createProductSpare(updatedPostData);
      fetchProductListAPI();
      const newTableData = [...tableData];
      newTableData[index].status = updatedStatus;
      setTableData(newTableData);
    } catch (err) {
      console.log(
        `Error in handle active/inaactive product/spare price  ${err}`
      );
    }
  };

  const handleEdit = async (index) => {
    const postToEdit = tableData[index];
    setEditIndex(postToEdit);

    setPostData({
      ...postToEdit,
      type: 2,
      priceTypeID: postToEdit.priceTypeID,
    });
    console.log(`post data is handelEdit ${dayjs(postData.validFrom)}`);
  };

  //   {
  //     "type": "1", /* 1: New, 2: Edit, 3: Status Update */
  //     "partPriceID": "0",
  //     "partCode": "BSampleNonSerial1",
  //     "priceTypeID": "2",
  //     "priceGroupID": "10",
  //     "validFrom": "2024-06-01",
  //     "price": "100"
  // }

  // handlepost request -> creating new product/spare price
  const handlePostRequest = async () => {
    try {
      if (editIndex === null) {
        postData.type = 1;
        postData.partPriceID = 0;
        const response = await createProductSpare(postData);
        alert(response.statusMessage);
      } else {
        postData.type = 2;
        await createProductSpare(postData);
        setEditIndex(null);
      }
      console.log(postData);
      setPostData({
        type: "" /* 1: New, 2: Edit, 3: Status Update */,
        partPriceID: "",
        partCode: "",
        priceTypeID: "",
        priceGroupID: "",
        validFrom: dayjs(),
        price: "",
      });
    } catch (err) {
      console.log(`Error creating product/spare price ${err}`);
    }
    // console.log(`post data 2 ${postData}`);
    fetchPriceTypeDropdown();
    fetchPriceGroupDropdown();
    fetchProductList();
  };
  const handleSearch = async () => {
    try {
      const partID = itemCode ? itemCode : "0";
      const priceTypeID = priceTypeView ? priceTypeView : "0";
      const priceGroupID = priceGroupView ? priceGroupView : "0";
      const priceOnDate = date ? date : null;
      const pageIndex = "1";
      const pageSize = "10";
      const data = await fetchProductListAPI(
        partID,
        priceTypeID,
        priceGroupID,
        priceOnDate,
        pageIndex,
        pageSize
      );
      console.log(data.partPriceDataList);
      if (data && data.partPriceDataList) setTableData(data.partPriceDataList);
      else {
        setTableData([]);
      }
    } catch (err) {
      console.log(`Error in handling search ${err}`);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };
  // pricetype dropdown api call
  const fetchPriceTypeDropdown = async () => {
    try {
      const data = await getPriceTypeDropdown();
      setPriceType(data.priceTypeDataList);
    } catch (err) {
      console.log(`Error fetching Price Type Dropdown List, ${err}`);
    }
  };

  // price Group Dropdown API call
  const fetchPriceGroupDropdown = async () => {
    try {
      const data = await getPriceGroupDropdown();
      setPriceGroup(data.priceGroupDataList);
    } catch (err) {
      console.log(`Error fetching Price Group dropdown ${err}`);
    }
  };

  // item code Dropdown api call
  const fetchItemCodeDropdown = async () => {
    try {
      const data = await getItemCodeDropdown();
      setItemList(data.partCodeMasterListData);
    } catch (err) {
      console.log(`Error fetching Item code ${err}`);
    }
  };

  // Table view api call
  const fetchProductList = async () => {
    try {
      const data = await fetchProductListAPI(
        "0",
        "0",
        "0",
        null,
        pageIndex,
        pageSize
      );
      // console.log(data.partPriceDataList);
      console.log(data.partPriceDataList);
      setTableData(data.partPriceDataList);
      setTotalRecords(data.totalRecords);
      setDataSize(data.partPriceDataList.length);
    } catch (err) {
      console.log(`Error fetching manage product/spare list ${err}`);
    }
  };
  const handleUpload = async () => {
    let authKey = sessionStorage.getItem("authKey");

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("UploadedFile", selectedFile); // Set the key to UploadedFile

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

        if (
          uploadRes.data.statusCode === "400" &&
          uploadRes.data.invalidDataLink
        ) {
          setDownloadLink(uploadRes.data.invalidDataLink);
          setModalOpen(true); // Open the modal
        } else {
          alert(uploadRes.data.statusMessage || "File uploaded successfully");
        }
      } catch (error) {
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );
        alert(`Error uploading file: ${error.response?.data || error.message}`);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSelectedFile(null);
      }
    } else {
      alert("Please select a file first.");
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

    // You can add additional validation for file structure here if necessary

    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  useEffect(() => {
    fetchPriceTypeDropdown();
    fetchPriceGroupDropdown();
    fetchItemCodeDropdown();
    fetchProductList();
  }, []);
  useEffect(() => {
    fetchProductList();
  }, [page]);
  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>Price &gt; Product/Spare Price</Item>
          </Stack>
        </Box>
        {loading && <Loader />}
        {/* --------------box1--------------- */}
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
          <Grid container spacing={2} direction="row">
            <Grid item md={3}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1 } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Product Code"
                  variant="standard"
                  value={postData.partCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setPostData({ ...postData, partCode: code });
                  }}
                />
              </Box>
            </Grid>
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "20ch", minWidth: "100px" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Price Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={postData.priceTypeID}
                  onChange={(e) =>
                    setPostData({ ...postData, priceTypeID: e.target.value })
                  }
                  label="Price Type"
                  placeholder="Select"
                >
                  {priceType.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    priceType.map((price) => (
                      <MenuItem
                        key={price.priceTypeID}
                        value={price.priceTypeID}
                      >
                        {price.priceType}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Price Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={postData.priceGroupID}
                  onChange={(e) =>
                    setPostData({ ...postData, priceGroupID: e.target.value })
                  }
                  label="Price Group"
                  placeholder="Select"
                >
                  {priceGroup.length === 0 ? (
                    <MenuItem>
                      <li>No Item</li>
                    </MenuItem>
                  ) : (
                    priceGroup.map((price) => (
                      <MenuItem
                        key={price.priceGroupID}
                        value={price.priceGroupID}
                      >
                        {price.priceGroup}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={3}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="dateinput"
              >
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem
                    label={
                      <Label componentName="Valid From" valueType="date" />
                    }
                  >
                    <StyledDatePicker
                      label="Valid From"
                      inputFormat="YYYY/MM/DD"
                      value={dayjs(postData.validFrom)}
                      onChange={(newValue) =>
                        setPostData({ ...postData, validFrom: newValue })
                      }
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid item md={3}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ width: "80%" }}
                  id="standard-basic"
                  label="Price"
                  variant="standard"
                  value={postData.price}
                  onChange={(e) => {
                    const priceValue = e.target.value;
                    setPostData({ ...postData, price: priceValue });
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid container justifyContent="">
              <Grid item md={4}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "15.625rem", margin: "5px" }}
                  onClick={() => {
                    setPostData({
                      type: "",
                      partPriceID: "",
                      partCode: "",
                      priceTypeID: "",
                      priceGroupID: "",
                      validFrom: dayjs(), // Reset to current date or a default date
                      price: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handlePostRequest}
                  sx={{ width: "15.625rem", margin: "5px" }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* --------------box2--------------- */}
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
          <Grid container>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              className="dateinput"
            >
              <DemoContainer components={["DatePicker"]}>
                <DemoItem
                  label={<Label componentName="Valid From" valueType="date" />}
                >
                  <StyledDatePicker />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
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
                sx={{ justifyContent: "center" }}
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
                sx={{ width: "9.5rem" }}
              >
                Upload
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              lg={3}
              sx={{ justifyContent: "center" }}
            >
              <Link
                href={`${DTempUrl}/PartPriceUploadTemplate.xlsx`}
                underline="none"
              >
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link
                style={{
                  cursor: "pointer",
                }}
                onClick={() => GetPriceMasterReferenceDataLinks(1)}
                underline="none"
              >
                {"Download Reference Code"}
              </Link>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>

        {/* --------------Box3--------------- */}

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
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Item Code
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={itemCode}
                  onChange={handleItemCodeDropdown}
                  label="Item Code"
                  placeholder="Select"
                  autoWidth
                >
                  {itemList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    itemList.map((item) => (
                      <MenuItem key={item.partID} value={item.partID}>
                        {item.partName}
                      </MenuItem>
                    ))
                  )}

                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Price Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={priceTypeView}
                  onChange={handlePriceTypeViewDropdown}
                  label="Price Type"
                  placeholder="Select"
                  autoWidth
                >
                  {priceType.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    priceType.map((price) => (
                      <MenuItem
                        key={price.priceTypeID}
                        value={price.priceTypeID}
                      >
                        {price.priceType}
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
                  Price Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={priceGroupView}
                  onChange={handlePriceGroupViewDropdown}
                  label="Age"
                  placeholder="Select"
                  autoWidth
                >
                  {priceGroup.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    priceGroup.map((price) => (
                      <MenuItem
                        key={price.priceGroupID}
                        value={price.priceGroupID}
                      >
                        {price.priceGroup}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="dateinput"
              >
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem
                    label={
                      <Label componentName="Price As on" valueType="date" />
                    }
                  >
                    <StyledDatePicker
                      value={dayjs(date)}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container md={4} sx={{ m: 1 }}>
            <Button
              variant="contained"
              style={{ width: "15rem" }}
              onClick={handleSearch}
            >
              Search
            </Button>
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
                    <TableCell sx={{ color: "#fff" }}>Spare Name</TableCell>
                    <TableCell sx={{ color: "#fff" }} align="">
                      Item Code
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="">
                      Price Type{" "}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>Price Group</TableCell>
                    <TableCell sx={{ color: "#fff" }} align="">
                      Price
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="">
                      Valid From
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="">
                      Valid Till
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ textAlign: "center" }}>
                        No Records Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    tableData.map((row, index) => (
                      <TableRow key={row}>
                        <TableCell>{row.partName}</TableCell>
                        <TableCell>{row.partCode}</TableCell>
                        <TableCell>{row.priceType}</TableCell>
                        <TableCell>{row.priceGroup}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.validFrom}</TableCell>
                        <TableCell>{row.validTill}</TableCell>
                        <TableCell align="right">
                          {/* Action icons */}
                          <IconButton
                            onClick={() => handleActive(index)}
                            sx={{ "&:focus": { outline: "none" } }}
                          >
                            <img
                              src={
                                row.status === "1"
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt={row.status === "1" ? "Active" : "Inactive"}
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                          <IconButton onClick={() => handleEdit(index)}>
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
          </Grid>
        </Grid>
      </Grid>
      <DownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        downloadLink={downloadLink}
      />
    </Sidebar>
  );
};

export default ManageProduct;
