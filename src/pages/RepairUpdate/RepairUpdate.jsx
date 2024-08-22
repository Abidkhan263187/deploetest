import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar2";
import Footer from "../../components/footer/Footer"
import "./repairUpdate.css";

import { useState } from "react";

import { Link } from "react-router-dom";
import CustomDatePicker from "../../utils/DatePicker/CustomDatePicker";

const textField = {
  "& .MuiInputBase-input": {
    color: "#2E3135",
    fontFamily: "Open Sans, sans-serif",
    fontSize: "18px",
    fontWeight: "400",
  },
};

const RepairUpdate = () => {
  const [parts, setParts] = useState([
    {
      partName: "",
      quantity: "",
    },
  ]);

  const handleAddPart = () => {
    const tempObj = {
      partName: "",
      quantity: "",
    };
    const tempParts = [...parts, tempObj];
    setParts(tempParts);
  };
  const handleDeletePart = (index) => {
    const tempCopy = [...parts];
    const nett = tempCopy.slice(0, index);
    setParts(nett);
    console.log("Delete button clicked", index);
  };

  return (
    <Box>
      <Sidebar>
        <div className="modal-container1">
          <div className="modal-header">
            <Typography variant="h5" className="MuiTypography-root text-styles">
              Repair Update
            </Typography>
          </div>

          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Customer Name
              </Typography>
              <TextField
                className=""
                sx={textField}
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={0}>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Jobsheet Number
              </Typography>
              <TextField
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Defect
              </Typography>
              <TextField
                placeholder="XXXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Reamrk
              </Typography>
              <TextField
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              />
            </Grid>
          </Grid>
          <br />
          <div style={{ borderBottom: "1px solid black" }}></div>

          <Grid container spacing={2} mt={0}>
            <Grid item xs={12}>
              <Typography variant="h6">Job Details</Typography>
            </Grid>
            <Grid container spacing={2} mt={0}>
              {/* <Grid item xs={12}>
                               <img scr={editIcon} 
                               alt="edit-icon"/>
                            </Grid> */}
            </Grid>

            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Product Name
              </Typography>
              <TextField
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel>
                <Typography
                  variant="body1"
                  className="MuiTypography-root MuiTypography-body1"
                >
                  Product Code
                </Typography>
              </InputLabel>
              <TextField
                placeholder="XXXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Assigned Engineer
              </Typography>

              <TextField
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              />
            </Grid>


           
          </Grid>

          <Grid container spacing={3} mt={0}>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Warranty Status
              </Typography>

              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              {/* <TextField
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                sx={textField}
              /> */}
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Warranty Void
              </Typography>

              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Warranty Void Reason
              </Typography>

              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={3} >
            <CustomDatePicker label="Purchase Date" />
            </Grid>
            <Grid item xs={3} >
              <CustomDatePicker label="Visit Date" />
            </Grid>

            <Grid item xs={3} >
              <CustomDatePicker label="Visit Time" />
              
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={0}>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Defect
              </Typography>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={0}>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Action
              </Typography>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                placeholder="Part Required"
                id="standard-basic"
                variant="standard"
                sx={textField}
              /> */}
            </Grid>
          </Grid>

          {parts?.length > 0 &&
            parts.map((ele, index) => {
              return (
                <Grid container spacing={3} mt={0}>
                  <Grid item xs={4}>
                    <Typography variant="h5" className="part-required">{`Part ${
                      index === 0 ? "Required" : index
                    }  `}</Typography>
                    <FormControl sx={{ mt: 1, width: 300 }}>
                      <InputLabel id="demo-select-small-label">
                        Part Name
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        // value={age}
                        label="Part Name"
                        // onChange={handleChange}
                      >
                        <MenuItem value="">Select Part</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item>
                      <FormControl fullWidth sx={{ m: 3, width: 300 }}>
                        <TextField
                          id="outlined-basic"
                          label="Quantity"
                          variant="outlined"
                          type="number"
                          inputProps={{ min: 0 }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item mt={5}>
                      <button
                        className="success-button"
                        onClick={handleAddPart}
                      >
                        Add Part
                      </button>
                    </Grid>

                    {index > 0 && (
                      <Grid item mt={5}>
                        <button
                          className="delete-button"
                          onClick={() => handleDeletePart(index)}
                        >
                          Delete
                        </button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              );
            })}

          <Grid container spacing={3} justifyContent="flex-end" mt={0}>
            <Grid item>
              <button className="primary-button">Update</button>
            </Grid>
            <Grid item>
              <Link to="/dashboard">
                <button className="primary-button">Cancel</button>
              </Link>
            </Grid>
          </Grid>
        </div>

        <Footer />
        <br />
        <br />
      </Sidebar>
    </Box>
  );
};

export default RepairUpdate;
