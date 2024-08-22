import React, { useEffect, useState } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  createPriceType,
  getPriceTypeDropdown,
  getPriceTypeList,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";
import Footer from "../../../components/footer/Footer";
import AlertMessage from "../../../components/AlertMessage/AlertMessage";
import config from "../../../components/common/config";
import CustomPagination from "../../../components/common/CustomPagination";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 700,
}));

const PriceType = () => {
  const pageSize = config.pageSize;
  const [priceType, setPriceType] = useState([]);
  const [priceList, setPriceList] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [postData, setPostData] = useState({
    type: "",
    priceTypeID: "",
    priceType: "",
    priceTypeDescription: "",
  });
  const [alert, setAlert] = useState({ statusCode: null, statusMessage: "" });

  const handlePriceTypeDropdown = (event) => {
    setPriceList(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const priceTypeId = priceList ? priceList : "0";
      const pageIndex = "1";
      const pageSize = "10";
      const data = await getPriceTypeList(priceTypeId, pageIndex, pageSize);
      if (data && data.priceTypeDataList) {
        setTableData(data.priceTypeDataList);
      } else {
        console.log("priceTypeDataList is undefined in the response");
      }
    } catch (err) {
      console.log(`Error handling search: ${err}`);
    }
  };

  const handleActive = async (index) => {
    const postToEdit = tableData[index];
    const updatedPostData = {
      type: 3,
      priceTypeID: postToEdit.priceTypeID,
      priceTypeDescription: postToEdit.priceTypeDescription,
    };
    try {
      await createPriceType(updatedPostData);
      fetchPriceTypeList();
    } catch (err) {
      console.log(`Error handling active status: ${err}`);
    }
  };

  const handleEdit = async (index) => {
    const priceToEdit = tableData[index];
    setEditIndex(index);
    setPostData({
      ...priceToEdit,
      type: 2,
      priceTypeID: priceToEdit.priceTypeID,
    });
  };

  const handlePostRequest = async () => {
    try {
      console.log("post data is ", postData);
      let response;
      if (editIndex === null) {
        postData.type = 1;
        postData.priceTypeID = 0;
        response = await createPriceType(postData);
      } else {
        postData.type = 2;
        response = await createPriceType(postData);
        setEditIndex(null);
      }

      setAlert({
        statusCode: parseInt(response.statusCode),
        statusMessage: response.statusMessage,
      });

      setPostData({
        type: "",
        priceTypeID: "",
        priceType: "",
        priceTypeDescription: "",
      });
    } catch (err) {
      console.log(`Error in saving data: ${err}`);
      setAlert({
        statusCode: 500,
        statusMessage: "An error occurred while saving data.",
      });
    }
    fetchPriceTypeList();
    fetchPriceTypeDropdown();
  };

  const fetchPriceTypeDropdown = async () => {
    try {
      const data = await getPriceTypeDropdown();
      setPriceType(data.priceTypeDataList);
    } catch (err) {
      console.log(`Error fetching Price Type Dropdown List: ${err}`);
    }
  };

  const fetchPriceTypeList = async () => {
    try {
      const data = await getPriceTypeList("0", pageIndex, pageSize);
      if (data && data.priceTypeDataList) {
        setTableData(data.priceTypeDataList);
        setTotalRecords(data.totalRecords);
        setDataSize(data.priceTypeDataList.length);
      } else {
        console.log("priceTypeDataList is undefined in the response");
      }
    } catch (err) {
      console.log(`Error fetching Price Type List: ${err}`);
    }
  };

  //

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  useEffect(() => {
    fetchPriceTypeDropdown();
    fetchPriceTypeList();
  }, [page]);

  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>Price &gt; Price Type</Item>
          </Stack>
        </Box>

        {/* Render AlertMessage conditionally */}
        {alert.statusCode && (
          <AlertMessage
            statusCode={alert.statusCode}
            statusMessage={alert.statusMessage}
          />
        )}

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
          <Grid item md={3}>
            <Box
              component="form"
              sx={{ "& > :not(style)": { width: "20ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ width: "80%" }}
                id="standard-basic"
                label="Price Type"
                variant="standard"
                value={postData.priceType}
                onChange={(e) => {
                  const priceType = e.target.value;
                  setPostData({ ...postData, priceType });
                }}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box
              component="form"
              sx={{ "& > :not(style)": { width: "20ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ width: "80%" }}
                id="standard-basic"
                label="Description"
                variant="standard"
                value={postData.priceTypeDescription}
                onChange={(e) => {
                  const description = e.target.value;
                  setPostData({
                    ...postData,
                    priceTypeDescription: description,
                  });
                }}
              />
            </Box>
          </Grid>
          <Grid
            container
            justifyContent=""
            gap={1}
            sx={{ paddingTop: "4rem", m: 1 }}
          >
            <Grid item md={3}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  setPostData({
                    priceType: "",
                    priceTypeDescription: "",
                  });
                  setEditIndex(null);
                }}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "focus",
                  "&:focus": { outline: "none" },
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
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                }}
              >
                {editIndex !== null ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
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
            <Grid item md={4}>
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
                  value={priceList}
                  onChange={handlePriceTypeDropdown}
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
            <Grid item md={4} sx={{ marginTop: "25px" }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                style={{
                  width: "15rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Search
              </Button>
            </Grid>
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
                    <TableCell sx={{ color: "#fff" }}>Price Type</TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Description
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={row.priceTypeID}>
                      <TableCell>{row.priceType}</TableCell>
                      <TableCell>{row.priceTypeDescription}</TableCell>
                      <TableCell align="right">
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
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Sidebar>
  );
};

export default PriceType;
