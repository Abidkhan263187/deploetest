import { Grid, InputLabel, Modal, TextField, Typography } from "@mui/material";
import CrosssIconPopup from "../../../assets/CrosssIconPopup.svg";
import "./partIssueModal.css";

const textField = {
  "& .MuiInputBase-input": {
    color: "#2E3135",
    fontFamily: "Open Sans, sans-serif",
    fontSize: "18px",
    fontWeight: "400",
  },
};

const PartIssueModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <div className="modal-header">
          <Typography variant="h5" className="MuiTypography-root text-styles">
            Update Part Request
          </Typography>
          <img
            src={CrosssIconPopup}
            className="custom-image"
            alt="crossIcon"
            onClick={onClose}
          />
        </div>

        <Grid container spacing={1}>
          <Grid item xs={3}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Jobsheet No
              </Typography>
            </InputLabel>
            <TextField
              className=""
              sx={textField}
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
            />
          </Grid>

          <Grid item xs={3}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Complaint No
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
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Creation Date
              </Typography>
            </InputLabel>
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
                Created By
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={3}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Service Center
              </Typography>
            </InputLabel>
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
                Jobsheet Clouser Date
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
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Jobsheet Status
              </Typography>
            </InputLabel>
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
                Activation Date
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={3}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Estimation Amount
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
          <Grid item xs={3} mt={0}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Customer Remark
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
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Unit Lying At
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
        </Grid>

        <div className="border-btm"></div>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={12}>
            <Typography variant="h6">Job Details</Typography>
          </Grid>

          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Product Name
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Warranty Status
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={0}>
          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Purchase Date
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Engineer Assigned
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Part Requested
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={0}>
          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Issue Part
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Part Serial Number
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                Quantity
              </Typography>
            </InputLabel>
            <TextField
              placeholder="XXXXX"
              id="standard-basic"
              variant="standard"
              sx={textField}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <p className="avl-quan-text" variant="body1">
              Available Quantity : XXXX
            </p>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="flex-end" mt={0}>
          <Grid item>
            <button className="primary-button">Issue Part</button>
          </Grid>
          <Grid item>
            <button className="primary-button" onClick={onClose}>
              Cancel
            </button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default PartIssueModal;
