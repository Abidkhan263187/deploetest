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
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./SparePartMapping.css";
import {
  createModel,
  getModelList,
  getModelName,
  getPartCode,
  getProductCode,
} from "../../API service/APIservice";
import config from "../../components/common/config";
import CustomPagination from "../../components/common/CustomPagination";
import Loader from "../../utils/Loader/Loader";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

const SparePartMapping = () => {
  const pageSize = config.pageSize;
  const [selectedFile, setSelectedFile] = useState(null);
  const [partCodeList, setPartCodeList] = useState([]);
  const [partCode, setPartCode] = useState(null);
  const [altPartCode, setAltPartCode] = useState(null);
  const [productCodeList, setProductCodeList] = useState([]);
  const [productCode, setProductCode] = useState(null);
  const [modelNameList, setModelNameList] = useState([]);
  const [modelName, setModelName] = useState(null);
  const [modelCodeList, setModelCodeList] = useState([]);
  const [modelCode, setModelCode] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState(false)
  const [totalRecords, setTotalRecords] = useState(1);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here, e.g., use a file upload API
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };

  const handleDownload = () => {
    // Logic for downloading file
    console.log("Downloading file...");
  };

  const handleSearch = async () => {
    setLoading(true)
    try {
      const searchModelCode = modelCode !== null ? modelCode : "";
      const searchModelName = modelName !== null ? modelName : "";
      const data = await getModelList(
        searchModelCode,
        searchModelName,
        "0",
        "10"
      );
      setTableData(data.modelPartList);

      // Clear the text fields after the search
      setModelName(null);
      setModelCode(null);
    } catch (err) {
      console.log(`Error in searching ${err}`);
      throw err;
    } finally{
      setLoading(false)
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  // fetching part code dropdown
  const partCodeDropdown = async () => {
    try {
      const data = await getPartCode();
      setPartCodeList(data.partCodeMasterListData);
    } catch (err) {
      console.log(`Error in fetching part code dropdown ${err}`);
      throw err;
    }
  };
  // fetching model dropdown
  const modelDropdown = async () => {
    try {
      const data = await getProductCode();
      setProductCodeList(data.productCodeMasterListData);
    } catch (err) {
      console.log(`Error in fetching model dropdown ${err}`);
      throw err;
    }
  };
  // fetching model Name dropdown
  const modelNameDropdown = async () => {
    try {
      const data = await getModelName("1", "0", "0", "0");
      setModelNameList(data.modelDataList);
    } catch (err) {
      console.log(`Error in fetching model name dropdown ${err}`);
      throw err;
    }
  };
  // fetching model Code dropdown
  const modelCodeDropdown = async () => {
    try {
      const data = await getModelName("0", "0", "0", "0");
      setModelCodeList(data.modelDataList);
    } catch (err) {
      console.log(`Error in fetching model code dropdown ${err}`);
      throw err;
    }
  };

  // model list data
  const modelListDataAPI = async (modelCode, modelName) => {
    try {
      modelCode = modelCode ? modelCode : "";
      modelName = modelName ? modelName : "";
      const data = await getModelList(
        modelCode,
        modelName,
        pageIndex,
        pageSize
      );
      setTableData(data.modelPartList);
      setTotalRecords(data.totalRecords);
      setDataSize(allReasonDataRes.modelPartList.length);
      // console.log(`table data is ${data.modelPartList}`);
    } catch (err) {
      console.log(`Error in fetching model list data ${err}`);
      throw err;
    }
  };

  // create model part mapping
  const handlePostReqest = async () => {
    try {
      const type = "1";
      const partID = partCode ? partCode.partID : "0";
      const modelID = modelCode ? modelCode.modelID : "0";
      const altPartID = altPartCode ? altPartCode.partID : "0";
      const partAlternateMappingID = 0;
      const productPartId = 0;

      const data = await createModel(
        type,
        partID,
        modelID,
        altPartID,
        partAlternateMappingID,
        productPartId
      );
      alert(data.statusMessage);

      // Clear the state after saving
      setPartCode(null);
      setAltPartCode(null);
      setModelCode(null);
    } catch (err) {
      console.log(`Error in creating model part mapping ${err}`);
      throw err;
    }
  };

  // handle active for alternative part mapping
  const handleActiveAltPart = async (index) => {
    try {
      const data = tableData[index];

      const reponse = await createModel(
        "3",
        "0",
        "0",
        "0",
        data.partAlternateMappingID,
        "0"
      );
      // console.log(data.partAlternateMappingID);
      alert(reponse.statusMessage);
      modelListDataAPI();
      // console.log(`table data is ${data}`);
    } catch (err) {
      console.log(
        `Error in active/inactive alternate part mapping status, ${err}`
      );
      throw err;
    }
  };
  // handle active for model part mapping
  const handleActiveModelPart = async (index) => {
    try {
      const data = tableData[index];

      const reponse = await createModel(
        "3",
        "0",
        "0",
        "0",
        "0",
        data.productPartID
      );
      // console.log(data.partAlternateMappingID);
      alert(reponse.statusMessage);
      modelListDataAPI();
      // console.log(`table data is ${data}`);
    } catch (err) {
      console.log(
        `Error in active/inactive alternate part mapping status, ${err}`
      );
      throw err;
    }
  };

  useEffect(() => {
    modelListDataAPI();
  }, [page]);

  useEffect(() => {
    partCodeDropdown();
    modelDropdown();
    modelNameDropdown();
    modelCodeDropdown();
  }, []);
  return (
    <Sidebar>
      <Box component="main">
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.sparePartMapping}
        </Typography>
        <Divider />
        {loading && <Loader/>}
        {/* box1 */}
        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={partCodeList}
                getOptionLabel={(part) => part.partName}
                value={partCode}
                onChange={(e, newVal) => {
                  setPartCode(newVal);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Spare Part Code"
                    variant="standard"
                  />
                )}
              />
            </div>{" "}
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={options}
                getOptionLabel={(options) => options.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Spare Part Name"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={partCodeList}
                getOptionLabel={(part) => part.partName}
                value={altPartCode}
                onChange={(e, newVal) => {
                  setAltPartCode(newVal);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alternate Part Code"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alternate Part Name"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={productCodeList}
                getOptionLabel={(product) => product.productCode}
                renderInput={(params) => (
                  <TextField {...params} label="Model" variant="standard" />
                )}
              />
            </div>
          </div>

          <div className="buttons">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
              onclick={() => {
                setPostData({
                  type: "" /* 1: Save, 3: Status Update */,
                  partID: "",
                  altPartID: "",
                  modelID: "",
                  partAlternateMappingID: "",
                  productPartId: "",
                });
              }}
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
              onClick={handlePostReqest}
            >
              Save
            </Button>
          </div>
        </div>
        {/* box2 */}
        <div className="textfield-box">
          <div className="upload-excel">
            <p style={{ fontWeight: "bold" }}>Bulk Upload</p>
          </div>

          <div className="upload">
            <div>
              <input
                className="input-bulkupload"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                }}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
            <div>
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
            </div>{" "}
            <div>
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
            </div>{" "}
          </div>
        </div>
        {/* box3 */}
        <div className="textfield-box">
          <div className="upload-excel">
            <p>List View</p>
          </div>
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={modelNameList}
                getOptionLabel={(name) => name.modelName}
                value={modelName}
                onChange={(e, newVal) => {
                  setModelName(newVal);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Model Name"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={modelCodeList}
                getOptionLabel={(code) => code.modelCode}
                value={modelCode}
                onChange={(e, newVal) => {
                  setModelCode(newVal);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Model Code"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div>
              <Button
                variant="contained"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                Search
              </Button>
            </div>
            <div className="Autocomplete"></div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-heading">
                  <TableCell style={{ color: "white" }}>
                    Spare part Name
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Spare part Code
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Alternate Part Name
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Alternate Part Code
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Model Name</TableCell>
                  <TableCell style={{ color: "white" }}>Model Code</TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>No data found.</TableCell>
                  </TableRow>
                ) : (
                  tableData.map((row, index) => (
                    <TableRow key={row}>
                      <TableCell>{row.partName}</TableCell>
                      <TableCell>{row.partCode}</TableCell>
                      <TableCell>{row.altPartName}</TableCell>
                      <TableCell>{row.altPartCode}</TableCell>
                      <TableCell>{row.modelName}</TableCell>
                      <TableCell>{row.modelCode}</TableCell>
                      <TableCell align="right">
                        {/* active icon */}
                        <Tooltip
                          title="Alternate Part Mapping Status"
                          placement="top"
                        >
                          <IconButton
                            onClick={() => handleActiveAltPart(index)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              // src="/src/assets/activeBulb.svg"
                              src={
                                row.altPartMapStatus === "1"
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt="Active Bulb"
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                        </Tooltip>

                        {/* edit icon */}
                        <Tooltip
                          title="Model Part Mapping Status"
                          placement="top"
                        >
                          <IconButton
                            onClick={() => handleActiveModelPart(index)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              src={
                                row.modelMapStatus === "1"
                                  ? "/src/assets/activeBulb.svg"
                                  : "/src/assets/inactiveBulb.svg"
                              }
                              alt="Active Bulb"
                              height={"20px"}
                              width={"20px"}
                            />
                            {/* {console.log("row", row)} */}
                          </IconButton>
                        </Tooltip>
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
        </div>
      </Box>
    </Sidebar>
  );
};

export default SparePartMapping;
