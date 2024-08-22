import React, { useState, useEffect } from "react";
import NewSidebar from "../Sidebar/NewSidebar";
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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  useMediaQuery,
  useTheme,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import "./ReturnFromEngineer.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 700,
}));

const useStyles = makeStyles({
  labelPlacementStart: {
    flexDirection: "row-reverse",
  },
});

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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ReturnFromEngineer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("one");
  const [age, setAge] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    category1: false,
    category2: false,
    category3: false,
    category4: false,
  });
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    setCheckboxes({
      category1: checked,
      category2: checked,
      category3: checked,
      category4: checked,
    });
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    if (selectAll !== allChecked) {
      setSelectAll(allChecked);
    }
  }, [checkboxes, selectAll]);

  return (
    <NewSidebar>
      <Grid container>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={2}>
            <Item>Inventory</Item>
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
          <Grid container spacing={2}>
            <Grid item md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="From Date"
                    sx={{
                      "& .MuiInputBase-input": {
                        outline: "none",
                        "&:focus": {
                          outline: "none",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        outline: "none",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="To Date"
                    sx={{
                      "& .MuiInputBase-input": {
                        outline: "none",
                        "&:focus": {
                          outline: "none",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        outline: "none",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent=""
            gap={2}
            sx={{ paddingTop: "4rem", m: 2 }}
          >
            <Grid item md={3}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Search
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Reset
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
          <Grid
            container
            gap={1}
            sx={{ margin: "25px 10px 0 0", overflow: "auto" }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              {/* <IconButton
                onClick={() => handleEdit(rowId)}
                sx={{
                  marginRight: "10px",
                  marginBottom: "0px",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                <img
                  src="/src/assets/barcodeicon.svg"
                  alt="Edit"
                  height={"20px"}
                  width={"20px"}
                />
              </IconButton> */}
            </Grid>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "100%",
                    color: "red",
                  }}
                >
                  <TableRow>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Action
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Date & Time
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Ticket No
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Jobsheet No
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Defective Part Name
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Part Code
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Part Serial
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2].map((rowId) => (
                    <TableRow key={rowId}>
                      <TableCell align="center" size="small">
                        {" "}
                        <div>
                          <Checkbox {...label} />
                        </div>{" "}
                      </TableCell>
                      <TableCell align="center">xxxx</TableCell>
                      <TableCell align="center">xxxx</TableCell>
                      <TableCell align="center">xxxx</TableCell>
                      <TableCell align="center">xxxx</TableCell>
                      <TableCell align="center">xxxx</TableCell>
                      <TableCell align="center">xxxx</TableCell>
                      <TableCell align="center">xxxx</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                variant="contained"
                sx={{
                  //   width: "9.5rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Dispatch Selected
              </Button>
            </Grid>

            <Grid
              container
              gap={2}
              sx={{
                margin: "10px",
              }}
              xs={4}
              md={4}
            >
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  width: "9.5rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Allocate
              </Button>

              <Button
                variant="contained"
                sx={{
                  width: "9.5rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2}></Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*pop up Box  */}

      <Grid container spacing={2}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          style={{ background: "#EFF3FE" }}
        >
          <Box
            sx={{
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "#EFF3FE",
              //   border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              outline: "none",
              "&:focus": { outline: "none" },
            }}
          >
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
                // padding: "10px",
                fontWeight: 600,
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "4px",
                  marginRight: "10px",
                }}
              >
                <Box>Dispatch Details</Box>
              </Grid>
              <Grid container>
                <Grid item md={4}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="standard-basic"
                      label="Courier Company"
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="standard-basic"
                      label="Dispatch Date"
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="standard-basic"
                      label="Docket No"
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="standard-basic"
                      label="Airway No"
                      variant="standard"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "4px",
                  marginRight: "10px",
                }}
              >
                <Box>Selected Jobs</Box>
              </Grid>
              <Grid container sx={{ margin: "20px" }}>
                <Grid item md={12}>
                  Jobsheet 1
                </Grid>
                <Grid item md={12}>
                  Jobsheet 2{" "}
                </Grid>
                <Grid item md={12}>
                  Jobsheet 5
                </Grid>
                <Grid item md={12}>
                  Jobsheet 7
                </Grid>
              </Grid>

              <Grid container gap={2}>
                <Grid item md={3}>
                  <Button
                    variant="contained"
                    sx={{ outline: "none", "&:focus": { outline: "none" } }}
                  >
                    Dispatch
                  </Button>
                </Grid>
                <Grid item md={3}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#F35244",
                      outline: "none",
                      "&:focus": { outline: "none" },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>
    </NewSidebar>
  );
};

export default ReturnFromEngineer;
