import React, { useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar2";
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
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import "../manageState/ManageState.css";
import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import {
  createState,
  getStateList_Dropdown,
  getStateList_BindTable,
} from "../../../API service/APIservice";
import CustomPagination from "../../../components/Pagination/Custompagination";

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

const ManageState = () => {
  const [editIndex, setEditIndex] = useState("");
  const [stateNames, setStateName] = useState("");
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const [TableRows, setTableRows] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (newPage, newRowsPerPage) => {
    setPage(newPage);
    setRowsPerPage(newRowsPerPage);
  };


  const [postData, setPostData] = useState({
    callType: "",
    stateID: "",
    stateName: "",
    status: "",
  });

  const [jsonBody, setJsonBody] = useState({
    callType: 0,
    stateID: 0,
    status: 2,
  });

  useEffect(() => {
    fetchStateListItems();
    fetchStateData_Table();
  }, []);

  const fetchStateListItems = async () => {
    try {
      const data = await getStateList_Dropdown();
      
      setStateList(data.stateMasterListData);
      // console.log(data.stateMasterListData);
    } catch (err) {
      console.log("error- " + err);
    }
  };

  const fetchStateData_Table = async () => {
    try {
      
      jsonBody.callType = 0;
      jsonBody.stateID = 0;
      jsonBody.status = 2;


      const response = await getStateList_BindTable(jsonBody);

      if (response.statusCode === "200") {
        setTableRows(response.stateMasterList);
      } else if (response.statusCode === "401") {
        alert("unauthorised - " + response.statusMessage);
        // setStateName("");
      } else {
        alert(response.statusMessage);
        // setStateName("");
      }

      setJsonBody({
        callType: 0,
        stateID: "",
        status: 2,
      });
    } catch (err) {
      console.log("error to bind table- " + err);
    }
  };

  const handleSaveState = async () => {
    //  console.log(stateNames, editIndex);
    try {
      if (editIndex === null || editIndex === "") {
        postData.callType = 0;
        postData.stateID = 0;
        postData.stateName = stateNames;
        postData.status = 1;
        const response = await createState(postData);

        if (response.statusCode === "200") {
          alert("success -" + response.statusMessage);
          // setStateName("");
        } else if (response.statusCode === "401") {
          alert("unauthorised - " + response.statusMessage);
          // setStateName("");
        } else {
          alert(response.statusMessage);
          // setStateName("");
        }

      } else {
        postData.stateID = editIndex;
        postData.stateName = stateNames;
        postData.status = 1;
        postData.callType = 1;
        
        
        const response = await createState(postData);
        if (response.statusCode === 200) {
          alert("success -" + response.statusMessage);
          
        } else if (response.statusCode === 401) {
          alert("unauthorised - " + response.statusMessage);
         
        } else {
          console.log("error came in else " + response.statusMessage);
          alert(response.statusMessage);
          
        }
      }

      
      setPostData({
        callType: "",
        stateID: "",
        stateName: "",
        status: "",
      });

      setStateName("");
      setEditIndex("");
      fetchStateData_Table();
      
    } catch (error) {
      console.log("error -" + error);
    }
  };

  const handleStateSelection = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCancel =() =>{
    setSelectedState("");
    fetchStateData_Table();
  }
  const handleStateSearch = async (e) => {
    jsonBody.callType = 0;
    jsonBody.stateID = selectedState;
    jsonBody.status = 2;

    const response = await getStateList_BindTable(jsonBody);
    
    if (response.statusCode === "200") {
      setTableRows(response.stateMasterList);
    } else if (response.statusCode === "401") {
      alert("unauthorised - " + response.statusMessage);
      // setStateName("");
    } else {
      alert(response.statusMessage);
      // setStateName("");
    }

    setJsonBody({
      callType: 0,
      stateID: "",
      status: 2,
    });
  };

  const handleStatus = async (stateId, rowIndex) => {
   const activeStatus = TableRows[rowIndex].status;
    // setTableRows((prevState) => {
    //   const newRows = prevState.map((row, i) =>
    //     i === index ? { ...row, status: row.status === 1 ? 0 : 1 } : row
    //   );
    //   return newRows;
    // });
    try {
      postData.callType = 2;
      postData.stateID = stateId;
      postData.stateName = "a";

      if (activeStatus === 1) {
        postData.status = 0;
      } else if (activeStatus === 0) {
        postData.status = 1;
      }

      const response = await createState(postData);

      if (response.statusCode === "200") {
        alert("success -" + response.statusMessage);
      } else if (response.statusCode === "401") {
        alert("unauthorised - " + response.statusMessage);
      } else {
        alert(response.statusMessage);
      }

      fetchStateData_Table();
      
    } catch {
      console.log("error -" + error);
    }
  };

  const handleEditState = (stateId, stateName) => {
    setEditIndex(stateId);
    setStateName(stateName);
    
  };

  return (
    <Sidebar>
      <Grid container sx={{ padding: "15px" }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>Location {">"} State</Item>
          </Stack>
        </Box>

        <hr />

        <Grid
          sx={{
            background: "#EFF3FE",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "15px 10px 40px 10px",
          }}
        >
          <Grid
            sx={{
              marginLeft: "10px",
            }}
          >
            <p>Add State</p>
            <hr />
            <TextField
              id="standard-basic"
              label="State"
              variant="standard"
              value={stateNames}
              onChange={(e) => {
                setStateName(e.target.value);
              }}
            />

            <Grid item md={4} mt={4}>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSaveState}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                  background: "#33499F",
                }}
              >
                {editIndex !== "" ? "Update" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Search Panel */}

        <Grid
          sx={{
            background: "#EFF3FE",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <p className="ml-10">List View </p>
          <Box
            display="flex"
            alignItems="center"
            gap={6}
            my={1}
            mb={5}
            sx={{ flexWrap: "wrap" }}
          >
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedState}
                  onChange={handleStateSelection}
                  label="State"
                  placeholder="Select"
                  autoWidth
                >
                  {stateList.length === 0 ? (
                    <MenuItem>
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    stateList.map((state) => (
                      <MenuItem key={state.stateID} value={state.stateID}>
                        {state.stateName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>

            <div>
            <Button
                variant="contained"
                size="medium"
                onClick={handleStateSearch}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                  background: "#33499F",
                }}
              >
                Search
              </Button> 
              <Button
                variant="contained"
                size="medium"
                onClick={handleCancel}
                sx={{
                  width: "15rem",
                  // margin: "auto",
                  marginLeft: "20px",
                  outline: "focus",
                  "&:focus": { outline: "none" },
                  background: "#33499F",
                }}
              >
                Cancel
              </Button>
            </div>
            {/* </Grid> */}
          </Box>

          <Grid container sx={{ margin: "25px 10px 0 0", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#2255A4", textAlign: "center" }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>ID</TableCell>
                    <TableCell style={{ color: "white" }}>Name</TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TableRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row, index) => (
                    <TableRow key={row.stateId}>
                      <TableCell component="th" scope="row">
                        {row.sNo}
                      </TableCell>

                      <TableCell>{row.state}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleStatus(row.stateId, index)}
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
                          onClick={() => handleEditState(row.stateId, row.state)}
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

      <Footer></Footer>
    </Sidebar>
  );
};

export default ManageState;
