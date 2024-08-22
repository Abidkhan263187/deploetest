import { useEffect, useState } from "react";
import {
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
import "./ticketAcknowledgeModal.css";
import CommanModal from "../CommanModal/CommanModal";
import { Constants } from "../../../constants/Constant";
import {
  generateJobSheetAPI,
  getBinTypeListAPI,
} from "../../../API service/APIservice";
import BarCodeGenerator from "../../../components/BarCodeGenerator/BarCodeGenerator";

const TicketAcknowledgeModal = ({ isOpen, onClose, ticket }) => {
  const [commanModalOpen, setCommanModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [binList, setBinList] = useState([]);
  const [selectedBin, setSelectedBin] = useState("");
  const [jobSheetNo, setJobSheetNo] = useState(ticket?.jobSheetNo || "");
  const [isJobsheetGenerated, setIsJobsheetGenerated] = useState(false);
  const [printBarcode, setPrintBarcode] = useState(false);

  const handleClick = (type) => {
    setModalType(type);
    setCommanModalOpen(true);
  };

  const closeModal = () => {
    setCommanModalOpen(false);
  };

  const resetModalState = () => {
    setSelectedBin("");
    setJobSheetNo(ticket?.jobSheetNo || "");
    setIsJobsheetGenerated(false);
    setPrintBarcode(false);
  };

  useEffect(() => {
    const fetchBinList = async () => {
      try {
        const binData = await getBinTypeListAPI();
        setBinList(binData.binTypeList);
        setSelectedBin(binData.binTypeList[0]?.binTypeID || ""); // Set the first binTypeID as the default selected bin
        setJobSheetNo(ticket.jobSheetNo);
      } catch (error) {
        // alert("Error fetching bin list");
        // console.log("Error on bin list fetch:", error);
      }
    };

    fetchBinList();
  }, [ticket]);

  const handleBinChange = (event) => {
    setSelectedBin(event.target.value);
  };

  const handleGenJobSheet = async () => {
    if (!jobSheetNo) {
      const selectedticketID = ticket.ticketDataID;
      const selectedTicketNo = ticket.ticketNo;
      const sheetNoBody = {
        ticketID: selectedticketID,
        ticketNo: selectedTicketNo,
        binTypeID: selectedBin || "0", // Use selectedBin for binTypeID
      };

      try {
        let jobSheetNo = await generateJobSheetAPI(sheetNoBody);
        // console.log("jobSheetNo", jobSheetNo);
        setJobSheetNo(jobSheetNo.jobSheetNo);
      } catch (error) {
        alert("Error fetching job sheet no list");
        console.log("Error on job sheet no fetch:", error);
      }
    }
  };

  const handlePrintLabel = () => {
    setIsJobsheetGenerated(true);
    setPrintBarcode(true); // Trigger the barcode printing
  };

  const handlePrintComplete = () => {
    setPrintBarcode(false); // Reset the print flag after printing
  };

  const handleClose = () => {
    resetModalState(); // Reset the modal state on close
    onClose(); // Call the onClose prop
  };

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <div className="ticket-modal-container">
          <div className="ticket-modal-header">
            <Typography variant="h5" className="MuiTypography-root text-styles">
              {Constants.ticketAcknowledge}
            </Typography>
            <img
              src={CrosssIconPopup}
              className="custom-image"
              alt="crossIcon"
              onClick={handleClose}
            />
          </div>
          <Typography variant="h6">{Constants.ticketNo}</Typography>
          <Typography variant="body1">
            {ticket?.ticketNo || "No Ticket Number"}
          </Typography>

          <Grid container spacing={1} mt={2}>
            <Grid item xs={4}>
              <InputLabel>
                <Typography
                  variant="body1"
                  className="MuiTypography-root MuiTypography-body1"
                >
                  {Constants.customerName}
                </Typography>
              </InputLabel>
              <TextField
                className=""
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                value={ticket?.customerName || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1">{Constants.product}</Typography>
              <TextField
                className=""
                placeholder="xxxx"
                id="standard-basic"
                variant="standard"
                value={ticket?.product || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                {Constants.modal}
              </Typography>
              <TextField
                className=""
                placeholder="xxxx"
                id="standard-basic"
                variant="standard"
                value={ticket?.model || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} mt={2}>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                {Constants.defect}
              </Typography>
              <TextField
                className=""
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                value={ticket?.defect || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                {Constants.bin}
              </Typography>
              <FormControl variant="standard" sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  {Constants.select}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedBin}
                  onChange={handleBinChange}
                  label={Constants.select}
                >
                  {binList.map((bin) => (
                    <MenuItem key={bin.binTypeID} value={bin.binTypeID}>
                      {bin.binName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="body1"
                className="MuiTypography-root MuiTypography-body1"
              >
                {Constants.jobsheetNo}
              </Typography>
              <TextField
                className=""
                placeholder="XXXXX"
                id="standard-basic"
                variant="standard"
                value={jobSheetNo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} mt={2}>
            <Grid item xs={4}>
              <button
                onClick={handleGenJobSheet}
                className="jobsheet-btn"
                disabled={jobSheetNo || selectedBin === ""} // Disable if jobsheet is present
              >
                {Constants.generateJobsheetNo}
              </button>
            </Grid>

            <Grid item xs={4}>
              <button
                onClick={handlePrintLabel}
                className="lable-btn"
                disabled={!jobSheetNo}
                style={{backgroundColor:"#33499F"}}
              >
                {Constants.printLabel}
              </button>
            </Grid>
          </Grid>

          <Grid container spacing={1} mt={2}>
            <Grid item xs={3}>
              <button className="jobsheet-btn" disabled={!jobSheetNo}>
                {Constants.acknowledgeBtn}
              </button>
            </Grid>

            <Grid item xs={3}>
              <button
                className="reject-btn"
                onClick={() => handleClick("rejection")}
                disabled={jobSheetNo} // Disable if jobsheet is present
              >
                {Constants.reject}
              </button>
            </Grid>

            <Grid item xs={3}>
              <button
                className="on-hold-btn"
                onClick={() => handleClick("onHold")}
                disabled={jobSheetNo} // Disable if jobsheet is present
              >
                {Constants.onHold}
              </button>
            </Grid>

            <Grid item xs={3}>
              <button className="force-close" disabled={!jobSheetNo}>
                {Constants.forceCloseTray}
              </button>
            </Grid>
          </Grid>

          {isJobsheetGenerated && (
            <div className="barcode-container">
              <BarCodeGenerator
                value={jobSheetNo}
                shouldPrint={printBarcode}
                onPrintComplete={handlePrintComplete}
              />
            </div>
          )}
        </div>
      </Modal>
      <CommanModal
        isOpen={commanModalOpen}
        onClose={closeModal}
        ticket={ticket}
        rejectionHeader={
          modalType === "rejection" ? Constants.reasonForRejection : ""
        }
        onHoldHeader={modalType === "onHold" ? Constants.reasonForOnHold : ""}
        rejectReason={
          modalType === "rejection" ? Constants.rejectionReason : ""
        }
        onHoldReason={modalType === "onHold" ? Constants.onHoldReason : ""}
        successHeader={Constants.success}
        successDescription={Constants.successDescription}
        commonBtnText={Constants.submit}
      />
    </>
  );
};

export default TicketAcknowledgeModal;
