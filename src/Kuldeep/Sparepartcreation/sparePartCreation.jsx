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
} from "@mui/material";
import { useState, useEffect } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./SparePartCreation.css";
import {
  getSparePartListAPI,
  manageSparePartAPI,
  getPartGroupDropdownAPI,
  getItemCodeDropdown,
  getTaxGroupDropdownListAPI,
} from "../../API service/APIservice";
import CustomPagination from "../../components/common/CustomPagination";
import config from "../../components/common/config";
import Loader from '../../utils/Loader/Loader'
// const options = ["adnan 1", "adnan 3", "adnan 2", "faiz"];

const Is = [
  { title: "Yes", value: 1 },
  { title: "No", value: 0 },
];
const SparePartCreation = () => {
  const pageSize = config.pageSize;
  const [selectedFile, setSelectedFile] = useState(null);
  const [partGroupList, setPartGroupList] = useState([]);
  const [taxGroupList, setTaxGroupList] = useState([]);
  const [partNameCodeList, setPartNameCodeList] = useState([]);
  const [sparePartName, setSparePartName] = useState("");
  const [sparePartCode, setSparePartCode] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(1);
  const [postData, setPostData] = useState({
    type: "",
    partID: 0,
    partCode: "",
    partName: "",
    partGroupID: null,
    taxGroupID: null,
    isSerialised: null,
    isRepairable: null,
    isReturnable: null,
  });

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

  const handleManageSparePartAPI = async () => {
    try {
      if (editIndex === null) {
        // validation
        postData.type = 1;
        postData.partID = 0;
        const response = await manageSparePartAPI(postData);
        alert(response.statusMessage);
        setPostData({
          type: "",
          partID: 0,
          partCode: "",
          partName: "",
          partGroupID: 0,
          taxGroupID: 0,
          isSerialised: 0,
          isRepairable: 0,
          isReturnable: 0,
        });
        console.log(postData);
      } else {
        postData.type = 2;
        const response = await manageSparePartAPI(postData);
        alert(response.statusMessage);
        setPostData({
          type: "",
          partID: 0,
          partCode: "",
          partName: "",
          partGroupID: 0,
          taxGroupID: 0,
          isSerialised: 0,
          isRepairable: 0,
          isReturnable: 0,
        });
        setEditIndex(null);
      }
    } catch (err) {
      console.log(`Error in saving data: ${err}`);
    }
    fetchSparePartList();
    fetchPartNameCodeDropdown();
  };

  const handleEdit = async (index) => {
    const partToEdit = tableData[index];
    setEditIndex(index);
    setPostData({
      ...partToEdit,
      type: 2,
    });

    console.log(postData);
  };

  const handleActive = async (index) => {
    const partToEdit = tableData[index];
    const updatedPostData = {
      type: 3,
      partID: partToEdit.partID,
      partCode: "",
      partName: "",
      partGroupID: 0,
      taxGroupID: 0,
      isSerialised: 0,
      isRepairable: 0,
      isReturnable: 0,
    };
    await manageSparePartAPI(updatedPostData);
    fetchSparePartList();
  };

  const handleSparePartNameDropdown = (event, value) => {
    if (value && value.sparePartName) {
      console.log(value.sparePartName);
      setSparePartName(value.sparePartName);
    } else {
      console.log("No spare part name selected");
      setSparePartName("");
    }
  };

  const handleSparePartCodeDropdown = (event, value) => {
    if (value && value.sparePartCode) {
      console.log(value.sparePartCode);
      setSparePartCode(value.sparePartCode);
    } else {
      console.log("No spare part code selected");
      setSparePartCode("");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  // const handleSearch = async () => {
  //   try {
  //     const partName = sparePartName ?? "";
  //     const partCode = sparePartCode ?? "";
  //     const pageIndex = "1";
  //     const pageSize = "100";

  //     const data = await getSparePartListAPI(
  //       partName,
  //       partCode,
  //       pageIndex,
  //       pageSize
  //     );
  //     // console.log(priceGroupId, pageIndex, pageSize);
  //     if (data && data.sparePartList) {
  //       setTableData(data.sparePartList);
  //       console.log(data.sparePartList);
  //     }
  //   } catch (err) {
  //     console.log(`Error handling search: ${err}`);
  //   }
  // };

  const fetchSparePartList = async () => {
    setLoading(true);
    try {
      const data = await getSparePartListAPI(
        sparePartCode,
        sparePartName,
        pageIndex,
        pageSize
      );
      if (data && data.sparePartList) {
        setTableData(data.sparePartList);
        setTotalRecords(data.totalRecords);
        setDataSize(data.sparePartList.length);
        // console.log(data.sparePartList);
      }
    } catch (err) {
      console.log(`Error fetching Spare Part List: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // api call for price Group Dropdown
  const fetchPartGroupType = async () => {
    try {
      const data = await getPartGroupDropdownAPI();
      setPartGroupList(data.partGroupList);
      console.log(data.partGroupList);
    } catch (err) {
      console.log(`Error fetching Part Group Dropdown List, ${err}`);
    }
  };
  // api call for price Group Dropdown
  const fetchTaxGroupType = async () => {
    try {
      const data = await getTaxGroupDropdownListAPI();
      setTaxGroupList(data.taxGroupList);
      console.log(data.taxGroupList);
    } catch (err) {
      console.log(`Error fetching tax Group Dropdown List, ${err}`);
    }
  };

  // part name code Dropdown api call
  const fetchPartNameCodeDropdown = async () => {
    try {
      const data = await getItemCodeDropdown();
      setPartNameCodeList(data.partCodeMasterListData);
    } catch (err) {
      console.log(`Error fetching Item code ${err}`);
    }
  };

  useEffect(() => {
    fetchSparePartList();
  }, [page]);
  useEffect(() => {
    fetchPartGroupType();
    fetchTaxGroupType();
    fetchPartNameCodeDropdown();
  }, []);

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.sparePartCreation}
        </Typography>
        <Divider />
{loading && <Loader/>}
        <div className="textfield-box">
          <div className="line-textfield">
            <TextField
              className="text"
              id="standard-basic"
              label="Spare Part Name"
              variant="standard"
              value={postData.partName}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  partName: data,
                });
              }}
            />
            <TextField
              className="text"
              id="standard-basic"
              label="Spare Part Code"
              variant="standard"
              value={postData.partCode}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  partCode: data,
                });
              }}
            />
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={partGroupList}
                getOptionLabel={(option) => option.partGroupName}
                value={
                  partGroupList.find(
                    (option) => option.partGroupName === postData.partGroupName
                  ) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Part Group"
                    variant="standard"
                  />
                )}
                onChange={(e, value) => {
                  const data = value.partGroupID;
                  setPostData({
                    ...postData,
                    partGroupID: value.partGroupID,
                    partGroupName: value.partGroupName,
                  });
                }}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={taxGroupList}
                getOptionLabel={(option) => option.taxGroupName}
                value={
                  taxGroupList.find(
                    (option) => option.taxGroupName === postData.taxGroupName
                  ) || null
                }
                renderInput={(params) => (
                  <TextField {...params} label="Tax Group" variant="standard" />
                )}
                onChange={(e, value) => {
                  setPostData({
                    ...postData,
                    taxGroupID: value.taxGroupID,
                    taxGroupName: value.taxGroupName,
                  });
                }}
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
                value={
                  Is.find((option) => option.value === postData.isSerialised) ||
                  null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Is Serialized"
                    variant="standard"
                  />
                )}
                onChange={(e, value) => {
                  const data = value ? value.value : null;
                  setPostData({
                    ...postData,
                    isSerialised: data,
                  });
                }}
              />
            </div>

            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={Is}
                getOptionLabel={(Is) => Is.title}
                value={
                  Is.find((option) => option.value === postData.isReturnable) ||
                  null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Is Returnable"
                    variant="standard"
                  />
                )}
                onChange={(e, value) => {
                  const data = value ? value.value : null;
                  console.log(data);
                  setPostData({
                    ...postData,
                    isReturnable: data,
                  });
                }}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={Is}
                getOptionLabel={(Is) => Is.title}
                value={
                  Is.find((option) => option.value === postData.isRepairable) ||
                  null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Is Repairable"
                    variant="standard"
                  />
                )}
                onChange={(e, value) => {
                  const data = value ? value.value : null;
                  console.log(data);
                  setPostData({
                    ...postData,
                    isRepairable: data,
                  });
                }}
              />
            </div>
            <div className="Autocomplete"></div>
          </div>

          <div className="buttons">
            <Button
              onClick={() => {
                setPostData({
                  partID: 0,
                  partCode: "",
                  partName: "",
                  partGroupID: 0,
                  taxGroupID: 0,
                  isSerialised: 0,
                  isRepairable: 0,
                  isReturnable: 0,
                });
                setEditIndex(null);
              }}
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleManageSparePartAPI}
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              {editIndex !== null ? "Update" : "Save"}
            </Button>
          </div>
        </div>

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

        <div className="textfield-box">
          <div className="upload-excel">
            <p>List View</p>
          </div>
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={partNameCodeList}
                getOptionLabel={(option) => option.sparePartName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Spare Part Name"
                    variant="standard"
                  />
                )}
                onChange={handleSparePartNameDropdown}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="-close-on-selecdisablet"
                disableCloseOnSelect
                options={partNameCodeList}
                getOptionLabel={(option) => option.sparePartCode}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=" Spare part Code"
                    variant="standard"
                  />
                )}
                onChange={handleSparePartCodeDropdown}
              />
            </div>
            <div>
              <Button
                onClick={fetchSparePartList}
                variant="contained"
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
                  <TableCell style={{ color: "white" }}>Part Group</TableCell>
                  <TableCell style={{ color: "white" }}>Tax Group</TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.partID}>
                    <TableCell>{row.partName}</TableCell>
                    <TableCell>{row.partCode}</TableCell>
                    <TableCell>{row.partGroupName}</TableCell>
                    <TableCell>{row.taxGroupName}</TableCell>
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
                      <IconButton
                        onClick={() => handleEdit(index)}
                        sx={{ "&:focus": { outline: "none" } }}
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
        </div>
      </Sidebar>
    </Box>
  );
};

export default SparePartCreation;
