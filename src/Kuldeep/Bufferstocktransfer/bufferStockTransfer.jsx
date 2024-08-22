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
  Dialog,
  styled,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import ScannerComponent from "../../Kuldeep/Sccaner/ScannerComponent";
import MyIcon from "../../assets/info.png";
import deleteIcon from "../../assets/delete.png";
import xbutton from "../../assets/x-button.png";
import { useState } from "react";
import "./bufferStockTransfer.css";
import { useNavigate } from "react-router-dom";

const options = [];

const ValueBox = styled("div")(({ theme }) => ({
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  marginLeft: theme.spacing(2),
  minWidth: "100px",
  minHeight: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const bufferStockTransfer = () => {
  const [open, setOpen] = useState(false);
  const [openAllocate, setOpenAllocate] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAllocate = () => {
    setOpenAllocate(false);
  };
  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.inventory}
        </Typography>
        <Divider />
        <Grid
          container
          spacing={1}
          sx={{
            background: "#F5F8FF",
            margin: "10px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
            display: "flex", // Ensures the grid behaves as a flex container
            flexWrap: "nowrap", // Prevents wrapping to ensure buttons stay in one row
            justifyContent: "space-between", // Distributes space evenly between buttons
          }}
        >
          <Grid item sx={{ flexBasis: "22%" }}>
            {" "}
            {/* Adjusted to ensure all buttons fit */}
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%", // Full width of flex item
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                "&:focus": { outline: "none" },
              }}
              onClick={() =>{
                navigate("/inventory/dashboard")
              }}
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/inventory/stockgrn")
              }}
            >
              Stock GRN
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("")
              }}
            >
              Stock Transfer
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/Inventorypartreturn")
              }}
            >
              Part Return
            </Button>
          </Grid>
        </Grid>
        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={options}
                getOptionLabel={(options) => options.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Transfer From"
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
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Transfer To"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="Autocomplete"></div>
            <div className="Autocomplete"></div>
          </div>
        </div>

        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={options}
                getOptionLabel={(options) => options.title}
                renderInput={(params) => (
                  <TextField {...params} label="Brand" variant="standard" />
                )}
              />
            </div>{" "}
            <div className="Autocomplete">
              <Autocomplete
                id="doptionsable-close-on-select"
                doptionsableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="standard" />
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
                    label="Sub Category"
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
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Model" variant="standard" />
                )}
              />
            </div>
          </div>
          <div className="line-textfield">
            <TextField
              className="text"
              id="standard-basic"
              label="Part Name"
              variant="standard"
            />
            <TextField
              className="text"
              id="standard-basic"
              label="Part Code"
              variant="standard"
            />
            <div></div> <div></div>
            <div></div> <div></div>
            <div></div> <div></div>
            <div></div> <div></div>
          </div>
          <div className="buttons">
            <div>
              <Button
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
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="textfield-box">
          <div>
            {" "}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="table-heading">
                    <TableCell style={{ color: "white" }}>part Name</TableCell>
                    <TableCell style={{ color: "white" }}>Part Code</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Qty Available
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      Allocate Qty
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Serial No.</TableCell>
                    <TableCell style={{ color: "white" }}>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* First Row */}
                  <TableRow>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell> <TableCell>1000</TableCell>{" "}
                    <TableCell>
                      {" "}
                      <ValueBox style={{ width: "100px" }}>20</ValueBox>
                    </TableCell>{" "}
                    <TableCell>
                      {" "}
                      <div style={{ display: "flex", gap: "10px" }}>
                        {" "}
                        <div>
                          <ValueBox style={{ width: "200px" }}>20</ValueBox>
                        </div>{" "}
                        <div style={{ float: "right" }}>
                          {" "}
                          <ScannerComponent />
                        </div>{" "}
                        <div>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#33499F",
                              color: "white",
                              boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                            }}
                          >
                            ADD
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      1/20{" "}
                      <img
                        src={MyIcon}
                        alt="My Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "5px",
                        }}
                        onClick={handleClickOpen}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="buttons">
              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33499F",
                    color: "white",
                    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                    marginTop: "10px",
                  }}
                >
                  Add to List
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33499F",
                    color: "white",
                    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                    marginTop: "10px",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="table-heading">
                    <TableCell style={{ color: "white" }}>part Name</TableCell>
                    <TableCell style={{ color: "white" }}>part Code</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Allocated Qty
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Serial Nos</TableCell>
                    <TableCell style={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* First Row */}
                  <TableRow>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell> <TableCell>1000</TableCell>{" "}
                    <TableCell>
                      <img
                        src={MyIcon}
                        alt="My Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "5px",
                        }}
                        onClick={handleClickOpen}
                      />
                    </TableCell>{" "}
                    <TableCell>
                      {" "}
                      <img
                        src={deleteIcon}
                        alt="My Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "5px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="buttons">
              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33499F",
                    color: "white",
                    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                    marginTop: "10px",
                  }}
                  onClick={() => setOpenAllocate(true)}
                >
                  Allocate
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33499F",
                    color: "white",
                    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                    marginTop: "10px",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Box
              style={{ backgroundColor: "#33499F", padding: "10px" }}
              display="flex"
              alignItems="center"
            >
              <Typography style={{ color: "white" }} variant="h6" flexGrow={1}>
                Serial No.
              </Typography>
              <img
                src={xbutton}
                alt="My Icon"
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "5px",
                }}
                onClick={handleClose}
              />
            </Box>
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#33499F" }}>
                  <TableRow style={{ backgroundColor: "33499F" }}>
                    <TableCell sx={{ color: "white" }}>Serial No. 1</TableCell>
                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>xxxxxxxxxxxxxxxxxxx</TableCell>
                    <TableCell>
                      <img
                        src={deleteIcon}
                        alt="My Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "5px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#05CFD3",
                color: "white",
                boxShadow: "4px 2px 4px rgb(110, 142, 237)",
                marginTop: "10px",
                marginLeft: "28%",
              }}
              onClick={handleClose}
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={openAllocate} onClose={handleCloseAllocate}>
          <Box className="textfield-box">
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" flexGrow={1}>
                  Dispatch Details
                </Typography>
                <img
                  src={xbutton}
                  alt="My Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                  onClick={handleCloseAllocate}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <div className="textfield-box">
                <div className="line-textfield">
                  <TextField
                    className="text"
                    id="standard-basic"
                    label="Courier Company"
                    variant="standard"
                  />
                  <TextField
                    className="text"
                    id="standard-basic"
                    label="Dispatch Date"
                    variant="standard"
                  />
                  <TextField
                    className="text"
                    id="standard-basic"
                    label="Docket No"
                    variant="standard"
                  />
                </div>
                <div className="line-textfield">
                  <TextField
                    className="text"
                    id="standard-basic"
                    label="Air way Bill No"
                    variant="standard"
                  />
                </div>
                <div className="buttons">
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#33499F",
                        color: "white",
                        boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                        marginTop: "10px",
                      }}
                      onClick={handleCloseAllocate}
                    >
                      Dispatch
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#33499F",
                        color: "white",
                        boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                        marginTop: "10px",
                      }}
                      onClick={handleCloseAllocate}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Box>
        </Dialog>
      </Sidebar>
    </Box>
  );
};

export default bufferStockTransfer;
