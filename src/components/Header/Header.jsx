// <<<<<<< Main
import { useEffect, useState } from "react";
import { Typography, Grid, Box, Tooltip } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import DateTime from "../../utils/dateTime/DateTime";
import { Constants } from "../../constants/Constant";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("authKey"));

  const handleClick = () => {
    sessionStorage.removeItem("authKey");
    navigate("/login");
    setToken(null);
  };

  useEffect(() => {
    let timeout;
    const setExpiration = () => {
      timeout = setTimeout(() => {
        sessionStorage.removeItem("authKey");
        navigate("/login");
        setToken(null);
      }, 20 * 60 * 1000);
    };

    if (token) {
      setExpiration();
    }

    const handleActivity = () => {
      clearTimeout(timeout);

      if (token) {
        setExpiration();
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      clearTimeout(timeout);
    };
  }, [token]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {Constants.welcomeText} John
          </Typography>
          <DateTime />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Box>
          <Tooltip title="Notifications" sx={{ color: "white" }}>
            <Link to="/notifications">
              <NotificationsNoneOutlinedIcon
                style={{
                  marginRight: 8,
                  fontSize: 30,
                  height: 30,
                  width: 30,
                  color: "white",
                }}
              />
            </Link>
          </Tooltip>

          <Tooltip title="Setting" sx={{ color: "white" }}>
            <Link to="/setting">
              <SettingsOutlinedIcon
                style={{
                  marginRight: 8,
                  fontSize: 30,
                  height: 30,
                  width: 30,
                  color: "white",
                }}
              />
            </Link>
          </Tooltip>

          <Tooltip title="Help Center" sx={{ color: "white" }}>
            <Link to="/help-center">
              <HelpOutlineOutlinedIcon
                style={{
                  marginRight: 8,
                  fontSize: 30,
                  height: 30,
                  width: 30,
                  color: "white",
                }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Logout" sx={{color: "white"}}>
                <Link to="#">
                <LogoutIcon onClick={handleClick}
                 style={{
                  marginRight: 8,
                  fontSize: 30,
                  height: 30,
                  width: 30,
                  color: "white",
                }}
                />
                </Link>
          </Tooltip>
          {/* <button onClick={handleClick}> Logout</button> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
