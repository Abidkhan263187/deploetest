import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CrosssIconPopup from "../../../assets/CrosssIconPopup.svg";
import "./commanModal.css";
import { Constants } from "../../../constants/Constant";
import { useEffect, useState } from "react";
import {
  GetReasonMasterListAPI,
  TicketHoldRejectAPI,
} from "../../../API service/APIservice";

const CommanModal = ({
  isOpen,
  onClose,
  rejectionHeader,
  onHoldHeader,
  rejectReason,
  onHoldReason,
  ticket,
}) => {
  const [reason, setReason] = useState([]);
  const [reasonsId, setReasonID] = useState(null);
  const [reasonTxt, setReasonTxt] = useState("");
  const [reasonMark, setReasonMark] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const body = {
          productCategoryID: "0",
          type: "2" /* 2: On Hold, 3: Rejected */,
        };
        let reason = await GetReasonMasterListAPI(body);
        setReason(reason.reasonList);
        setReasonTxt(reason.reason);
      } catch (error) {
        console.log("error on reason");
      }
    };
    fetch();
  }, []);

  const handleSubmit = async () => {
    const submitPayload = {
      ticketDataID: ticket.ticketDataID,
      type:
        rejectReason === "Rejection Reason"
          ? "2"
          : "1" /* 1: On Hold, 2: Rejected */,
      reasonID: reasonsId,
      reason: reasonTxt,
      rejectionRemark: reasonMark,
    };

    try {
      let submitReject = await TicketHoldRejectAPI(submitPayload);
      alert(submitReject.statusMessage);
    } catch (error) {
      console.log(`error on reject/modal`);
      alert("error")
    } finally {
      onClose();
    }
  };

  const handleReason = (e) => {
    const { value } = e.target;
    const selectedReason = reason.find((r) => r.reasonID === value);
    if (selectedReason) {
      setReasonID(selectedReason.reasonID);
      setReasonTxt(selectedReason.reason);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="rejection-modal-container">
        <div className="rejection-modal-header">
          <Typography variant="h5" className="MuiTypography-root text-styles">
            {rejectionHeader ? rejectionHeader : onHoldHeader}
          </Typography>
          <img
            src={CrosssIconPopup}
            className="custom-image"
            alt="crossIcon"
            onClick={onClose}
          />
        </div>
        <Typography variant="h6">
          {rejectReason ? rejectReason : onHoldReason}
        </Typography>
        <Grid container spacing={1}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
            <InputLabel id="demo-simple-select-standard-label">
              {Constants.select}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={reasonsId || ""}
              onChange={handleReason}
              label={Constants.select}
            >
              {reason.length > 0 &&
                reason.map((elem, ind) => (
                  <MenuItem key={ind} value={elem.reasonID}>
                    {elem.reason}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Box
          mt={3}
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-textarea"
            label={Constants.enterRemarks}
            placeholder={Constants.enterRemarks}
            multiline
            onChange={(e) => setReasonMark(e.target.value)}
            sx={{ backgroundColor: "#add8e64f" }}
          />
        </Box>

        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={3}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleSubmit} className="submit-btn">
                {Constants.submitBtn}
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default CommanModal;
