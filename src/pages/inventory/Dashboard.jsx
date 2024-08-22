import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  NativeSelect,
  Switch,
  FormGroup,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Tooltip from "@mui/material/Tooltip";

import { tableCellClasses } from "@mui/material/TableCell";
import Sidebar from "../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import {
  fetchServiceCenterDropdown,
  getEngineerDropdown,
  getEngineerInvetoryList,
  getRegionServiceList,
} from "../../API service/APIservice";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const noBorderStyle = {
  border: "none",
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

const tableData = [createData("200", "12")];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 700,
}));

const Dashboard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [serviceCenterList, setServiceCenterList] = useState([]);
  const [centerName, setCenterName] = useState("");
  const [engineerList, setEngineerList] = useState([]);
  const [EngineerName, setEngineerName] = useState("");
  const [engineerTableData, setEngineerTableData] = useState([]);
  const [regionTableData, setRegionTableData] = useState([]);
  const [serviceTableData, setServiceTableData] = useState([]);
  const [statusTableData, setStatusTableData] = useState([]);
  // search engineer wise inventory
  const handleInvetorySearch = async () => {
    try {
      console.log("data.engineerWiseData");
      const centerName = centerName ? centerName : "0";
      const engineerName = engineerName ? engineerName : "0";
      const data = await getEngineerInvetoryList(centerName, EngineerName);
      setEngineerTableData(data.engineerWiseData);
      console.log(data.engineerWiseData);
    } catch (err) {
      console.log(`Error fetching engineer wise inventory ${err}`);
      throw err;
    }
  };
  // handle toggle on off
  const handleToggleChange = async () => {
    setIsChecked((prev) => !prev);
    if (isChecked === true) {
      try {
        const data = await getRegionServiceList(0);
        setServiceTableData(data.serviceCenterWiseData);
        console.log(data.serviceCenterWiseData);
      } catch (err) {
        console.log(`Error in changing value data ${err}`);
        throw err;
      }
    } else {
      try {
        const data = await getRegionServiceList(1);
        setServiceTableData(data.serviceCenterWiseData);
        console.log(data.serviceCenterWiseData);
      } catch (err) {
        console.log(`Error in changing value data ${err}`);
        throw err;
      }
    }
    console.log(`hi i am toggle change `);
  };

  // api call for service center
  const getServiceCenterDropdown = async () => {
    try {
      // const entityTypeID = entityVal ? entityVal :""
      const data = await fetchServiceCenterDropdown("0", "0");
      setServiceCenterList(data.serviceCenterList);
    } catch (err) {
      console.log("Error in fetching service center dropdown");
      throw err;
    }
  };
  // api call for engineer dropdown
  const fetchEngineerDropdown = async (serviceID) => {
    try {
      const data = await getEngineerDropdown(serviceID);
      setEngineerList(data.engineerList);
    } catch (err) {
      console.log(`Error fetching engineer dropdown ${err}`);
      throw err;
    }
  };
  // api call for Engineer wise inventory
  const fetchEngineerInvetoryList = async () => {
    try {
      // console.log("data.engineerWiseData");
      const data = await getEngineerInvetoryList(0, 0);
      setEngineerTableData(data.engineerWiseData);
      // console.log(data.engineerWiseData);
    } catch (err) {
      console.log(`Error fetching engineer wise inventory ${err}`);
      throw err;
    }
  };

  // region wise list
  const getRegionList = async () => {
    try {
      const data = await getRegionServiceList(0);
      setRegionTableData(data.regionWiseData);
      // console.log(data.regionWiseData);
    } catch (err) {
      console.log("Error fetching region wise list", err);
      throw err;
    }
  };

  // service center wise list
  const getServiceList = async () => {
    try {
      const data = await getRegionServiceList(0);
      setServiceTableData(data.serviceCenterWiseData);
      console.log(data.serviceCenterWiseData);
    } catch (err) {
      console.log("Error fetching region wise list", err);
      throw err;
    }
  };

  const statusList = async () => {
    try {
      const data = await getRegionServiceList(0);
      setStatusTableData(data.drawerStatusData);
      console.log(data.drawerStatusData);
    } catch (err) {
      console.log("Error fetching status list data", err);
      throw err;
    }
  };
  useEffect(() => {
    getServiceCenterDropdown();
    fetchEngineerInvetoryList();
    getRegionList();
    getServiceList();
    statusList();
  }, []);
  return (
    <Sidebar>
      <Grid container>
        <Grid container sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", fontWeight: 600 }}>
            <Item>Inventory</Item>
            {/* </Stack> */}
          </Box>
        </Grid>
        
        {/* box 1 buttons */}
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
                "&:focus": { outline: "none" },
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
              onClick={() => {
                navigate("/inventory/stockgrn");
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
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={() => {
                navigate("/Bufferstocktransfer");
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
              onClick={() => {
                navigate("/Inventorypartreturn");
              }}
            >
              Part Return
            </Button>
          </Grid>
        </Grid>

        {/* --------------box2--------------- */}

        <Grid
          container
          spacing={2}
          sx={{
            background: "",
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
          <Grid item sm={12} md={12}>
            <Box>HO Warehouse</Box>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
          >
            {statusTableData.map((row) => (
              <Grid
                key={row.statusTypeID}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ padding: " 5px 50px", height: "auto" }}
              >
                <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                  <Table aria-label="customized table">
                    <TableHead sx={{ background: "#33499F" }}>
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          colSpan={2}
                          sx={{
                            background: "#33499F",
                            ...noBorderStyle,
                            padding: "0",
                          }}
                        >
                          {row.statusType}
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell
                          sx={{ ...noBorderStyle, padding: "0 30px" }}
                        >
                          QTY
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ ...noBorderStyle, padding: "7px 30px" }}
                          align="right"
                        >
                          Value
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell
                          sx={{ ...noBorderStyle, padding: "0 30px" }}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ ...noBorderStyle, padding: "7px 30px" }}
                          align="right"
                        >
                          {row.value}
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* --------------box3--------------- */}

        <Grid
          container
          spacing={2}
          sx={{
            background: "",
            margin: " 4px 10px 4px 1px",
            // marginTop: "4px",
            // marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
          }}
        >
          {/* region Wise */}
          <Grid item sm={12} md={6}>
            <Stack>
              <Grid sx={{ padding: "7px" }}>
                <Box>Region Wise</Box>
              </Grid>
            </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead sx={{ background: "#33499F" }}>
                  <TableRow>
                    <StyledTableCell>Region</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell align="right">Good</StyledTableCell>
                    <StyledTableCell align="right">Defective</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {regionTableData.map((row) => (
                    <StyledTableRow key={row.regionID}>
                      <StyledTableCell component="th" scope="row">
                        {row.region}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.total}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.good}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.defective}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        {row.protein}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* service wise */}
          <Grid item sm={12} md={6}
          sx={{marginTop:'14px'}}>
            {/* <Stack> */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maring: "auto",
              }}
            >
              <span>Service Centre Wise</span>
              {/* <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Quantity</Typography>
                  <AntSwitch
                    checked= {isChecked}
                    onClick={handleToggleChange}
                    defaultChecked
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>
                    {console.log(`i am isChecked ${isChecked}`)}
                    Value
                  </Typography>
                </Stack>
              </FormGroup> */}

              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Quantity</Typography>
                  <AntSwitch
                    checked={isChecked}
                    onClick={handleToggleChange}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>
                    {console.log(`i am isChecked ${isChecked}`)}
                    Value
                  </Typography>
                </Stack>
              </FormGroup>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead sx={{ background: "#33499F" }}>
                  <TableRow>
                    <StyledTableCell>ASC</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell align="right">Good</StyledTableCell>
                    <StyledTableCell align="right">Defective</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceTableData.map((row) => (
                    <StyledTableRow key={row.serviceCenterID}>
                      <StyledTableCell component="th" scope="row">
                        {row.serviceCenter}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.total}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.good}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.defective}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        {row.protein}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* --------------Box4--------------- */}
        <Grid
          container
          spacing={2}
          sx={{
            background: "",
            margin: " 4px 10px 4px 1px",
            // marginTop: "4px",
            // marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
          }}
        >
          {/*  */}

          <Grid
            container
            sx={{
              background: "",
              margin: " 4px 10px 4px 1px",
              // marginTop: "4px",
              // marginRight: "10px",
              fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
              width: "100%",
              borderRadius: "5px",
              padding: "10px",
              fontWeight: 600,
            }}
          >
            <Grid item sm={12} md={12}>
              <Box>Engineer Wise Inventory</Box>
            </Grid>

            <Grid container gap={2}>
              <Grid item md={3}>
                {/* <Box sx={{ minWidth: 100, }}> */}

                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    Service Center
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={centerName}
                    onChange={(e) => {
                      setCenterName(e.target.value);
                      fetchEngineerDropdown(e.target.value);
                    }}
                    label="Service Center"
                    placeholder="Select"
                    //   autoWidth
                    sx={{ minWidth: "280px" }}
                  >
                    {serviceCenterList.length === 0 ? (
                      <MenuItem value="">
                        <em>No Item</em>
                      </MenuItem>
                    ) : (
                      serviceCenterList.map((center) => (
                        <MenuItem
                          key={center.serviceCenterID}
                          value={center.serviceCenterID}
                        >
                          {center.serviceCenterName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {/* </Box> */}
              </Grid>
              <Grid item md={3}>
                {/* <Box sx={{ minWidth: 100, }}> */}

                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    Engineer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={EngineerName}
                    onChange={(e) => setEngineerName(e.target.value)}
                    label="Engineer"
                    placeholder="Select"
                    //   autoWidth
                    sx={{ minWidth: "280px" }}
                  >
                    {engineerList.length === 0 ? (
                      <MenuItem value="">
                        <em>No Item</em>
                      </MenuItem>
                    ) : (
                      engineerList.map((center) => (
                        <MenuItem
                          key={center.engineerID}
                          value={center.engineerID}
                        >
                          {center.engineerFullName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {/* </Box> */}
              </Grid>

              <Grid item md={2}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleInvetorySearch}
                  sx={{
                    width: "10rem",
                    margin: "5px",
                    background: "green",
                    "&:focus": {
                      outline: "none",
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                    ".MuiButton-root:active": {
                      outline: "none !important",
                      boxShadow: "none !important",
                      backgroundColor: "#3c52b2 !important",
                    },
                    "&:hover": {
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead sx={{ background: "#33499F" }}>
                  <TableRow>
                    <StyledTableCell>Engineer</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell align="right">Good</StyledTableCell>
                    <StyledTableCell align="right">Defective</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {engineerTableData.map((row) => (
                    <StyledTableRow key={row.enginerID}>
                      <StyledTableCell component="th" scope="row">
                        {row.enginer}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.total}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.good}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.defective}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default Dashboard;
