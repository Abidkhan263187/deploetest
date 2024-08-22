import React from "react";
import Sidebar from "../Sidebar/Sidebar2";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import "./jobSheetReports.css";

import CustomDatePicker from "../../utils/DatePicker/CustomDatePicker";
import { Constants } from "../../constants/Constant";

const CannibalizationReport = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Sidebar>
      <Grid
        className="tabs"
        container
        spacing={1}
        sx={{
          background: "#F5F8FF",
          margin: "10px",
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs="auto">
          <Button
            variant="contained"
            size="medium"
            sx={{
              width: "100%",
              margin: "5px",
              height: "auto",
              fontSize: "small",fontWeight:'600',
              background: "#D2F0F4",
              color: "#000000",
              [theme.breakpoints.down("sm")]: {
                fontSize: "x-small",
                padding: theme.spacing(0.5, 1),
              },
              "&:focus": { outline: "none" },
            }}
            onClick={() => {
              navigate("/reports/jobsheetreports");
            }}
          >
            Jobsheet Master Data
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            size="medium"
            sx={{
              width: "100%",
              margin: "5px",
              background: "#D2F0F4",
              color: "#000000",
              fontWeight: "inherit",
              fontSize: "small",
              [theme.breakpoints.down("sm")]: {
                fontSize: "x-small",
                padding: theme.spacing(0.5, 1),
              },
              "&:focus": { outline: "none" },
            }}
            onClick={() => {
              navigate("/reports/opencallreports");
            }}
          >
            Open Call Report
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            size="medium"
            sx={{
              width: "100%",
              margin: "5px",
              background: "#D2F0F4",
              color: "#000000",
              fontWeight: "inherit",
              fontSize: "small",
              [theme.breakpoints.down("sm")]: {
                fontSize: "x-small",
                padding: theme.spacing(0.5, 1),
              },
              "&:focus": { outline: "none" },
            }}
            onClick={() => {
              navigate("/reports/storestockreports");
            }}
          >
            Store Stock Report
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            size="medium"
            sx={{
              width: "100%",
              margin: "5px",
              background: "#D2F0F4",
              color: "#000000",
              fontWeight: "inherit",
              fontSize: "small",
              [theme.breakpoints.down("sm")]: {
                fontSize: "x-small",
                padding: theme.spacing(0.5, 1),
              },
              "&:focus": { outline: "none" },
            }}
            onClick={() => {
              navigate("/reports/engineerstockreports");
            }}
          >
            Engineer Stock Report
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            size="medium"
            sx={{
              width: "100%",
              margin: "5px",

              fontWeight: "inherit",
              fontSize: "small",
              [theme.breakpoints.down("sm")]: {
                fontSize: "x-small",
                padding: theme.spacing(0.5, 1),
              },
              "&:focus": { outline: "none" },
            }}
            onClick={() => {
              navigate("/reports/cannibalizationreports");
            }}
          >
            Cannibalization Report
          </Button>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default CannibalizationReport;
