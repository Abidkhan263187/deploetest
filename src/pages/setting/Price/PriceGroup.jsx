import React, { useEffect, useState } from "react";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  createPriceGroup,
  getPriceGroupDropdown,
  getPriceGroupList,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";
import config from "../../../components/common/config";
import CustomPagination from "../../../components/common/CustomPagination";

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
const PriceGroup = () => {
  const pageSize=config.pageSize
  const [value, setValue] = React.useState("one");
  const [priceGroupType, setPriceGroupType] = useState([]);
  const [priceList, setPriceList] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dataSize, setDataSize] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [postData, setPostData] = useState({
    type: "",
    priceGroupID: "",
    priceGroup: "",
    priceGroupDescription: "",
  });

  const handlePriceDropdown = (event) => {
    setPriceList(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = async () => {
    try {
      const priceGroupId = priceList ? priceList : "0";
      const pageIndex = "1";
      const pageSize = "10";

      const data = await getPriceGroupList(priceGroupId, pageIndex, pageSize);
      // console.log(priceGroupId, pageIndex, pageSize);
      setTableData(data.priceGroupDataList);
    } catch (err) {
      console.log(`Error handling search: ${err}`);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageIndex(newPage.toString());
  };

  const handlePostRequest = async () => {
    try {
      if (editIndex === null) {
        // validation

        postData.type = 1;
        postData.priceGroupID = 0;
        const response = await createPriceGroup(postData);
        alert(response.statusMessage);
        setPostData({
          type: "",
          priceGroupID: "",
          priceGroup: "",
          priceGroupDescription: "",
        });
        console.log(postData);
      } else {
        postData.type = 2;
        const response = await createPriceGroup(postData);
        alert(response.statusMessage);
        setPostData({
          type: "",
          priceGroupID: "",
          priceGroup: "",
          priceGroupDescription: "",
        });
        setEditIndex(null);
      }
    } catch (err) {
      console.log(`Error in saving data: ${err}`);
    }
    fetchPriceGroupList();
    fetchPriceGroupType();
  };

  const handleEdit = async (index) => {
    const priceToEdit = tableData[index];
    setEditIndex(index);
    setPostData({
      ...priceToEdit,
      type: 2,
      priceGroupId: priceToEdit.priceGroupID,
    });
    console.log(postData);
  };
  const handleActive = async (index) => {
    const priceToEdit = tableData[index];
    const updatedPostData = {
      type: 3,
      priceGroupID: priceToEdit.priceGroupID,
      priceGroup: priceToEdit.priceGroup,
      priceGroupDescription: priceToEdit.priceGroupDescription,
    };
    await createPriceGroup(updatedPostData);
    fetchPriceGroupList();
  };

  // api call for price Group Dropdown
  const fetchPriceGroupType = async () => {
    try {
      const data = await getPriceGroupDropdown();
      setPriceGroupType(data.priceGroupDataList);
      // console.log(data.priceGroupDataList);
    } catch (err) {
      console.log(`Error fetching Price Group Dropdown List, ${err}`);
    }
  };

  // api call for price group list
  const fetchPriceGroupList = async () => {
    try {
      const data = await getPriceGroupList("0",pageIndex, pageSize);
      setTableData(data.priceGroupDataList);
      setTotalRecords(data.totalRecords);
      setDataSize(data.priceGroupDataList.length);
      // console.log(data.priceGroupDataList);
    } catch (err) {
      console.log(`Error calling Price Group List API: ${err}`);
    }
  };

  useEffect(() => {
    fetchPriceGroupType();
    fetchPriceGroupList();
  }, [page]);
  return (
    <Sidebar>
      <Grid container>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>Price &gt; Price Group</Item>
          </Stack>
        </Box>
        {/* Box 1*/}
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
          <Grid
            container
            sx={{ borderBottom: 1, borderBottomColor: "lightgrey" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs"
              sx={{
                "& .MuiTab-root:focus": {
                  outline: "none",
                },
              }}
            >
              <Tab value="one" label="Price Group" />
              <Tab value="two" label="Product/Space Price" />
              <Tab value="three" label="Labour Charges" />
            </Tabs>
          </Grid>

          <Grid item md={3}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ width: "80%" }}
                id="standard-basic"
                label="Price Group"
                variant="standard"
                value={postData.priceGroup}
                onChange={(e) => {
                  const priceGroup = e.target.value;
                  setPostData({
                    ...postData,
                    priceGroup: priceGroup,
                  });
                }}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ width: "80%" }}
                id="standard-basic"
                label="Description"
                variant="standard"
                value={postData.priceGroupDescription}
                onChange={(e) => {
                  const description = e.target.value;
                  setPostData({
                    ...postData,
                    priceGroupDescription: description,
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
            <Grid item j md={3}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  setPostData({
                    priceGroup: "",
                    priceGroupDescription: "",
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
                {editIndex !== null ? "update" : "save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* Box 2 */}
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
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                sx={{
                  width: "9.5rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: "center" }}>
              <Link href="#" underline="none">
                {"Download Template"}
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="#" underline="none">
                {"Download Reference Code"}
              </Link>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>
        {/* Box 3 */}
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
                  Price Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={priceList}
                  onChange={handlePriceDropdown}
                  label="Price Group"
                  placeholder="Select"
                  autoWidth
                >
                  {priceGroupType.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    priceGroupType.map((price) => (
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
                    <TableCell sx={{ color: "#fff" }}>Price Group</TableCell>
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
                    <TableRow key={row.priceGroupID}>
                      <TableCell>{row.priceGroup}</TableCell>
                      <TableCell>{row.priceGroupDescription}</TableCell>
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
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default PriceGroup;
