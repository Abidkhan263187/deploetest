import { Box, Paper, Stack } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar2";
import WIP from "../../assets/WorkInProgress.png";
import { styled } from "@mui/system";
import "./reports.css";

const Reports = () => {
  return (
    <Sidebar>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="wip-container">
        <img className="wip" src={WIP} alt="work in progress image" />
      </Box>
    </Sidebar>
  );
};

export default Reports;
