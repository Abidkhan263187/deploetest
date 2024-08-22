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
import { useEffect, useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./warranty.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getItemCodeDropdown,
  getPartWarrantyListDataAPI,
  saveUpdatePartWarrantyAPI,
} from "../../API service/APIservice";
import dayjs from "dayjs";
import config from "../../components/common/config";
import CustomPagination from "../../components/common/CustomPagination";

const warranty = () => {
  const pageSize = config.pageSize;
  const [selectedFile, setSelectedFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [partNameCodeList, setPartNameCodeList] = useState([]);
  const [partNameToSearch, setPartNameToSearch] = useState("");
  const [partCodeToSearch, setPartCodeToSearch] = useState("");
  const [postData, setPostData] = useState({
    PartWarrantyID: 0,
    ItemCode: "",
    ValidFrom: "",
    WarrantyInMonth: "",
    DoaInDays: "",
    ProrataWarranty: "",
    MfgWarranty: "",
    Remarks: "",
    WarrantyTypeId: 0,
  });

  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  // Fetch data when pageIndex or pageSize changes
  useEffect(() => {
    fetchPartWarrantyList(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  // Handler for page change

  const clearPostData = () => {
    setPostData({
      PartWarrantyID: 0,
      ItemCode: "",
      ValidFrom: dayjs(),
      WarrantyInMonth: "",
      DoaInDays: "",
      ProrataWarranty: "",
      MfgWarranty: "",
      Remarks: "",
      WarrantyTypeId: 0,
    });
  };

  // // Handler for page size change
  // const handlePageSizeChange = (event) => {
  //   setPageSize(Number(event.target.value));
  // };

  // Handler for input page change
  const handleInputPageChange = (event) => {
    setInputPageIndex(event.target.value);
  };

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

  const handleSparePartNameDropdown = (event, value) => {
    if (value && value.sparePartName) {
      console.log(value.sparePartName);
      setPartNameToSearch(value.sparePartName);
    } else {
      console.log("No spare part name selected");
      setPartNameToSearch("");
    }
  };
  const handleSparePartCodeDropdown = (event, value) => {
    if (value && value.sparePartCode) {
      console.log(value.sparePartCode);
      setPartCodeToSearch(value.sparePartCode);
    } else {
      console.log("No spare part code selected");
      setPartCodeToSearch("");
    }
  };

  const handleDateChange = (date) => {
    console.log("Selected date:", date);
    const formattedDate = formatDate(date);
    console.log(formattedDate);
    // setFormData(formattedDate);
    setPostData({
      ...postData,
      ValidFrom: formattedDate,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = async (index) => {
    const partToEdit = tableData[index];
    setEditIndex(index);
    const formattedDate = formatDate(partToEdit.validFrom);
    setPostData({
      PartWarrantyID: partToEdit.partWarrantyID,
      ItemCode: partToEdit.partCode,
      ValidFrom: formattedDate,
      WarrantyInMonth: partToEdit.warrantyInMonths,
      DoaInDays: partToEdit.doaInDays,
      ProrataWarranty: partToEdit.prorataWarrantyInMonths,
      MfgWarranty: partToEdit.mfgWarrantyInMonths,
      Remarks: partToEdit.remarks,
      WarrantyTypeId: partToEdit.warrantyTypeID,
    });
  };

  const handleManageSparePartAPI = async () => {
    try {
      // if (editIndex === null) {
      //   // validation
      //   const response = await saveUpdatePartWarrantyAPI(postData);
      //   alert(response.statusMessage);
      //   clearPostData();
      //   console.log(postData);
      // } else {
      const response = await saveUpdatePartWarrantyAPI(postData);
      alert(response.statusMessage);
      clearPostData();
      setEditIndex(null);
      // }
    } catch (err) {
      console.log(`Error in saving data: ${err}`);
    }
    fetchPartWarrantyList();
    fetchPartNameCodeDropdown();
  };

  const fetchPartWarrantyList = async (pageIndex, pageSize) => {
    try {
      const data = await getPartWarrantyListDataAPI(
        partCodeToSearch,
        partNameToSearch,
        pageIndex,
        pageSize
      );
      if (data && data.partWarrantyListData) {
        setTableData(data.partWarrantyListData);

        setTotalRecords(data.totalRecord);
        setDataSize(allReasonDataRes.partWarrantyListData.length);
        console.log(data.partWarrantyListData);
      }
    } catch (err) {
      console.log(`Error fetching Spare Part List: ${err}`);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
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
  // Handler for input page submit
  const handleInputPageSubmit = (event) => {
    event.preventDefault();
    const page = Number(inputPageIndex);
    if (page >= 1 && page <= totalPages) {
      setPageIndex(page);
    }
  };

  useEffect(() => {
    fetchPartWarrantyList(pageIndex, pageSize);
    // fetchPartGroupType();
    // fetchTaxGroupType();
    fetchPartNameCodeDropdown();
  }, []);

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.warranty}
        </Typography>
        <Divider />
        {console.log(postData)}
        <div className="textfield-box">
          <div className="line-textfield">
            <TextField
              className="text"
              id="standard-basic"
              label="Item Code"
              variant="standard"
              value={postData.ItemCode}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  ItemCode: data,
                });
              }}
            />
            <div className="textinput-Createu">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    defaultValue={null}
                    value={dayjs(postData.ValidFrom) || null}
                    label="Valid From"
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <TextField
              className="text"
              id="standard-basic"
              label="Warranty (In Months)"
              variant="standard"
              value={postData.WarrantyInMonth}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  WarrantyInMonth: data,
                });
              }}
            />
            <div></div>
          </div>
          <div className="line-textfield">
            <TextField
              className="text"
              id="standard-basic"
              label="DOA (In Days)"
              variant="standard"
              value={postData.DoaInDays}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  DoaInDays: data,
                });
              }}
            />{" "}
            <TextField
              className="text"
              id="standard-basic"
              label="Prorata (In Months)"
              variant="standard"
              value={postData.ProrataWarranty}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  ProrataWarranty: data,
                });
              }}
            />{" "}
            <TextField
              className="text"
              id="standard-basic"
              label=" Mfg Warranty (In Months)"
              variant="standard"
              value={postData.MfgWarranty}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  MfgWarranty: data,
                });
              }}
            />
            <div></div>
          </div>
          <div className="line-textfield">
            <TextField
              className="text"
              id="standard-basic"
              label="Remarks"
              variant="standard"
              value={postData.Remarks}
              onChange={(e) => {
                const data = e.target.value;
                setPostData({
                  ...postData,
                  Remarks: data,
                });
              }}
            />
            {/* <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(options) => options.title}
                renderInput={(params) => (
                  <TextField {...params} label="Remarks" variant="standard" />
                )}
              />
            </div> */}
          </div>

          <div className="buttons">
            <Button
              onClick={() => {
                clearPostData();
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
                getOptionLabel={(option) => option.sparePartCode}
                renderInput={(params) => (
                  <TextField {...params} label="Item Code" variant="standard" />
                )}
                onChange={handleSparePartCodeDropdown}
              />
            </div>
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={partNameCodeList}
                getOptionLabel={(option) => option.sparePartName}
                renderInput={(params) => (
                  <TextField {...params} label="Part Name" variant="standard" />
                )}
                onChange={handleSparePartNameDropdown}
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  setPartCodeToSearch("");
                  setPartNameToSearch("");
                  fetchPartWarrantyList(pageIndex, pageSize);
                }}
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
            <div>
              <Button
                onClick={() => fetchPartWarrantyList(pageIndex, pageSize)}
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                View All
              </Button>
            </div>
            <div className="Autocomplete"></div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-heading">
                  <TableCell style={{ color: "white" }}>part Name</TableCell>
                  <TableCell style={{ color: "white" }}>Item Code</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Warranty (In Months)
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Valid From</TableCell>
                  <TableCell style={{ color: "white" }}>
                    DOA (In Days)
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Prorata (In Months)
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Mfg Warranty (In Months)
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Extended Warranty
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Remark</TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.partWarrantyID}>
                    <TableCell>{row.partName}</TableCell>
                    <TableCell>{row.partCode}</TableCell>
                    <TableCell>{row.warrantyInMonths}</TableCell>
                    <TableCell>{row.validFrom}</TableCell>
                    <TableCell>{row.doaInDays}</TableCell>
                    <TableCell>{row.prorataWarrantyInMonths}</TableCell>
                    <TableCell>{row.mfgWarrantyInMonths}</TableCell>
                    <TableCell>{row.extendedWarrantyInMonths}</TableCell>
                    <TableCell>{row.remarks}</TableCell>
                    <TableCell align="right">
                      {/* Action icons */}
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

            {/* Pagination controls */}
            <div id="paginationDiv">
              <CustomPagination
                page={page}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                dataSize={dataSize}
              />
            </div>
            {/* <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              <Typography variant="body2" sx={{ mr: 1 }}>
                Page Size:
              </Typography>
              <TextField
                select
                value={pageSize}
                onChange={handlePageSizeChange}
                SelectProps={{ native: true }}
                size="small"
                sx={{ width: 80 }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </TextField>
            </Box> */}
          </TableContainer>
        </div>
      </Sidebar>
    </Box>
  );
};

export default warranty;
