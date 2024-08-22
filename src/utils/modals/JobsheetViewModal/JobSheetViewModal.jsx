import React, { useRef } from "react";
import {
  Button,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CrosssIconPopup from "../../../assets/CrosssIconPopup.svg";
import printIcon from "../../../assets/printIcon.svg";
import updateIcon from "../../../assets/updateIcon.svg";
import "./jobsheetviewmodal.css";
import { useEffect, useState } from "react";
import ImageViewModal from "../ImageViewModal/ImageViewModal";
import { Link } from "react-router-dom";
import { jobSheetViewPrintAPI } from "../../../API service/APIservice";
import ReactToPrint from "react-to-print";
import { width } from "@mui/system";

const useStyles = makeStyles({
  textField: {
    "& .MuiInputBase-input": {
      color: "#2E3135",
      fontFamily: "Open Sans, sans-serif",
      fontSize: "18px",
      fontWeight: "400",
    },
  },
  printLabel: {
    color: "#000000",
    fontSize: "15px",
    fontFamily: "Open Sans, sans-serif",
    textAlign: "center",
    fontWeight: "600",
  },
});

const textField = {
  "& .MuiInputBase-input": {
    color: "#2E3135",
    fontFamily: "Open Sans, sans-serif",
    fontSize: "18px",
    fontWeight: "400",
  },
};

const PrintLabel = {
  color: "#000000",
  fontSize: "15px",
  fontFamily: "Open Sans, sans-serif",
  textAlign: "center",
  fontWeight: "600",
  width: "100px",
  height: "100px",
};

const dummyJobsheetBody = {
  jobSheetID: 567,
  entityID: "0",
};

const JobSheetViewModal = ({
  isOpen,
  onClose,
  modalHeader,
  showAssignedTo,
  jobSheetDetails,
}) => {
  const classes = useStyles();
  const [imageModal, setImageModal] = useState(false);
  const [jobSheetDetailsObj, setJobSheetDetailsObj] = useState({
    customerDetail: [{}],
    jobSheetActionList: [{}],
    jobSheetDetail: [{}],
    jobSheetFollowUpList: [{}],
    partUsedList: [{}],
    productDetail: [{}],
  });

  const componentRef = useRef(); // Ref for the print component

  const handleViewImageClick = () => {
    setImageModal(true);
  };

  const closeModal = () => {
    setImageModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await jobSheetViewPrintAPI(dummyJobsheetBody);
        console.log("response", response);
        setJobSheetDetailsObj(response);
      } catch (error) {
        console.error("Error fetching job sheet details", error);
      }
    };
    fetch();
  }, []);

  const renderTextField = (label, value) => (
    <Grid item xs={3} lg={3} sx={{}}>
      <InputLabel>
        <Typography variant="body1">{label}</Typography>
      </InputLabel>
      <TextField
        placeholder="XXXXX"
        variant="standard"
        className={classes.textField}
        value={value || "empty"}
      />
    </Grid>
  );

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <div className="modal-container" ref={componentRef}>
          {/* Modal Content */}
          <div className="modal-header">
            <Typography variant="h5" className="MuiTypography-root text-styles">
              {modalHeader}
            </Typography>
            <img
              src={CrosssIconPopup}
              className="custom-image"
              alt="crossIcon"
              onClick={onClose}
            />
          </div>

          <Grid container spacing={2}>
            {renderTextField(
              "Jobsheet No",
              jobSheetDetailsObj.jobSheetDetail[0].jobSheetNo
            )}
            {renderTextField(
              "Complaint No",
              jobSheetDetailsObj.jobSheetDetail[0].complaintNo
            )}
            {renderTextField(
              "Creation Date",
              jobSheetDetailsObj.jobSheetDetail[0].creationDate
            )}
            {renderTextField(
              "Created By",
              jobSheetDetailsObj.jobSheetDetail[0].createdBy
            )}
            {renderTextField(
              "Service Center",
              jobSheetDetailsObj.jobSheetDetail[0].serviceCenter
            )}
            {renderTextField(
              "Jobsheet Closure Date",
              jobSheetDetailsObj.jobSheetDetail[0].jobSheetClosureDate
            )}
            {renderTextField(
              "Jobsheet Status",
              jobSheetDetailsObj.jobSheetDetail[0].jobSheetStatus
            )}
            {renderTextField(
              "Activation Date",
              jobSheetDetailsObj.jobSheetDetail[0].activationDate
            )}
            {renderTextField(
              "Estimation Amount",
              jobSheetDetailsObj.jobSheetDetail[0].estimationAmount
            )}
            {renderTextField(
              "Customer Remark",
              jobSheetDetailsObj.jobSheetDetail[0].customerRemark
            )}
            {renderTextField(
              "Unit Lying At",
              jobSheetDetailsObj.jobSheetDetail[0].unitLyingAt
            )}
          </Grid>
          &nbsp;

          {/* Customer Details */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Customer Details</Typography>
            </Grid>
            {renderTextField(
              "Contact Person",
              jobSheetDetailsObj.customerDetail[0].contactPerson
            )}
            {renderTextField(
              "Email Id",
              jobSheetDetailsObj.customerDetail[0].emailID
            )}
            {renderTextField(
              "Address",
              jobSheetDetailsObj.customerDetail[0].address
            )}
            {renderTextField(
              "Mobile No",
              jobSheetDetailsObj.customerDetail[0].mobileNo
            )}
            {renderTextField(
              "Alternate No",
              jobSheetDetailsObj.customerDetail[0].altMobileNo
            )}
            {renderTextField(
              "Customer Code",
              jobSheetDetailsObj.customerDetail[0].customerCode
            )}
          </Grid>
          &nbsp;
          {/* Products Details */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Products Details</Typography>
            </Grid>
            {renderTextField(
              "Brand",
              jobSheetDetailsObj.productDetail[0].brand
            )}
            {renderTextField(
              "Category",
              jobSheetDetailsObj.productDetail[0].category
            )}
            {renderTextField(
              "Sub Category",
              jobSheetDetailsObj.productDetail[0].subCategory
            )}
            {renderTextField(
              "Model",
              jobSheetDetailsObj.productDetail[0].model
            )}
            {renderTextField("SKU", jobSheetDetailsObj.productDetail[0].sku)}
            {renderTextField(
              "Serial",
              jobSheetDetailsObj.productDetail[0].serialNo
            )}
            {renderTextField(
              "MFG Date",
              jobSheetDetailsObj.productDetail[0].mfgDate
            )}
            {renderTextField(
              "Warranty Status",
              jobSheetDetailsObj.productDetail[0].warrantyStatus
            )}
            {renderTextField(
              "Warranty Void Reason",
              jobSheetDetailsObj.productDetail[0].warrantyVoidReason
            )}
            {renderTextField(
              "Symptom",
              jobSheetDetailsObj.productDetail[0].symptom
            )}
            {renderTextField(
              "Date of Purchase",
              jobSheetDetailsObj.productDetail[0].dateOfPurchase
            )}
            {renderTextField(
              "Purchased From",
              jobSheetDetailsObj.productDetail[0].purchaseFrom
            )}
            {renderTextField(
              "Invoice No",
              jobSheetDetailsObj.productDetail[0].invoiceNo
            )}
          </Grid>

          <div className="page-break"></div>
          {/* Page break for print */}
          <Grid container spacing={4} mt={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                id="btn_table"
                sx={{ textTransform: "none" }}
                // onClick={handleClickOpen}
              >
                Job Follow Up History
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead id="tb_head">
                    <TableRow
                      sx={{
                        backgroundColor: "#1976D2 !important",
                        color: "#fff !important",
                      }}
                    >
                      <TableCell id="tb_cell">Engineer</TableCell>
                      <TableCell id="tb_cell">Scheduled Date/Time</TableCell>
                      <TableCell id="tb_cell">Actual Visit Date</TableCell>
                      <TableCell id="tb_cell">In/Out Time</TableCell>
                      <TableCell id="tb_cell">Engineer Remark</TableCell>
                      <TableCell id="tb_cell">Customer Remark</TableCell>
                      <TableCell id="tb_cell">Collected Amount</TableCell>
                      <TableCell id="tb_cell">Payment Mode</TableCell>
                      <TableCell id="tb_cell">Transaction No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobSheetDetailsObj.jobSheetFollowUpList.length > 0 &&
                      jobSheetDetailsObj.jobSheetFollowUpList.map(
                        (row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.engineer}</TableCell>
                            <TableCell>{row.scheduledDateTime}</TableCell>
                            <TableCell>{row.actualVisitDate}</TableCell>
                            <TableCell>{row.timeInOut}</TableCell>
                            <TableCell>{row.engineerRemark}</TableCell>
                            <TableCell>{row.customerRemark}</TableCell>
                            <TableCell>{row.collectedAmount}</TableCell>
                            <TableCell>{row.paymentMode}</TableCell>
                            <TableCell>{row.transactionNo}</TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                id="btn_table"
                sx={{ textTransform: "none" }}
                // onClick={handleClickOpen}
              >
                Part Used
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead id="tb_head">
                    <TableRow>
                      <TableCell id="tb_cell">Defect Code</TableCell>
                      <TableCell id="tb_cell">Repair Code</TableCell>
                      <TableCell id="tb_cell">Repair Description</TableCell>
                      <TableCell id="tb_cell">Part Name</TableCell>
                      <TableCell id="tb_cell">Serial</TableCell>
                      <TableCell id="tb_cell">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobSheetDetailsObj.partUsedList &&
                      jobSheetDetailsObj.partUsedList.map((row, index) => (
                        <TableRow id="tb_cell" key={index}>
                          <TableCell>{row.defectCode}</TableCell>
                          <TableCell>{row.repairCode}</TableCell>
                          <TableCell>{row.repairDesc}</TableCell>
                          <TableCell>{row.partName}</TableCell>
                          <TableCell>{row.serialNo}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                id="btn_table"
                sx={{ textTransform: "none" }}
                // onClick={handleClickOpen}
              >
                Jobsheet Action Log
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead id="tb_head">
                    <TableRow
                      sx={{
                        backgroundColor: " #1976d2 !important",
                        color: "white !important",
                      }}
                    >
                      <TableCell id="tb_cell">Action Date</TableCell>
                      <TableCell id="tb_cell">User</TableCell>
                      <TableCell id="tb_cell">Action Done</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobSheetDetailsObj.jobSheetActionList.map.length > 0 &&
                      jobSheetDetailsObj.jobSheetActionList.map(
                        (row, index) => (
                          <TableRow id="tb_cell" key={index}>
                            <TableCell>{row.actionDate ?? "N/A"}</TableCell>
                            <TableCell>{row.userName}</TableCell>
                            <TableCell>{row.actionDone}</TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          {/* Modal Footer */}
          <div className="modal-footer">
            <Grid container spacing={3} mt={2}>
              <ReactToPrint
                trigger={() => (
                  <Button
                    className="print-button"
                    variant="contained"
                    sx={{
                      width: "10%",
                      height: "70px",
                      textTransform: "none",
                      padding: "4px",
                      // border: "1px solid #a7a7a7",
                      borderRadius: "4px",
                      backgroundColor: "#F7F9FB",
                    }}
                  >
                    <img src={printIcon} alt="printIcon" />
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "15px",
                        fontFamily: "Open Sans, sans-serif",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Print
                    </Typography>
                  </Button>
                )}
                content={() => componentRef.current}
                pageStyle={`@page {
    size: A4;
    margin: 20mm;
  }`}
                // Ensures print dialog shows up immediately
              />

              <Grid item></Grid>

              <div
                className="repair-button"
                item
                xs={1}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  width: "10%",
                  height: "70px",
                  textTransform: "none",
                  padding: "4px",
                  // border: "1px solid #a7a7a7",
                  borderRadius: "4px",
                  backgroundColor: "#F7F9FB",
                }}
              >
                <Link to="/repair-update">
                  {" "}
                  <img width={50} src={updateIcon} alt="print-icon" />
                </Link>
                <Typography variant="body1" sx={PrintLabel}>
                  Repair Update
                </Typography>
              </div>
            </Grid>
          </div>
        </div>
      </Modal>

      <ImageViewModal isOpen={imageModal} onClose={closeModal} />
    </>
  );
};

export default JobSheetViewModal;
