import React from "react";
import {
  Box,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "../../pages/Sidebar/Sidebar2";
import { Constants } from "../../constants/Constant";
import "./manageConfigurationMaster.css";

const options = [];

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
}));

const ValueBox = styled("div")(({ theme }) => ({
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  marginLeft: theme.spacing(2),
  minWidth: "100px",
  minHeight: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ManageConfigurationMaster = () => {
  const initialConfigs = [
    { id: 1, label: "Configuration 1", checked: false, displayValue: "" },
    { id: 2, label: "Configuration 2", checked: false, displayValue: "" },
    { id: 3, label: "Configuration 3", checked: false, displayValue: "" },
    { id: 4, label: "Configuration 4", checked: false, displayValue: "" },
    { id: 5, label: "Configuration 5", checked: false, displayValue: "" },
  ];

  const [configs, setConfigs] = React.useState(initialConfigs);

  const handleChange = (id) => (event) => {
    const updatedConfigs = configs.map((config) => {
      if (config.id === id) {
        return {
          ...config,
          checked: event.target.checked,
          displayValue: event.target.checked ? "Checked" : "Unchecked",
        };
      }
      return config;
    });
    setConfigs(updatedConfigs);
  };

  return (
    <Box component="main">
      <Sidebar>
        <Typography variant="h6" component="h6" m={2} className="typography">
          {Constants.Manageconfigurationmaster}
        </Typography>
        <Divider />
        <div className="textfield-box">
          <div className="line-textfield">
            <div className="Autocomplete">
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Company"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>

          <div className="buttons">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="textfield-box">
          <div className="upload-excel">
            <p>List</p>
          </div>
          {configs.map((config) => (
            <div className="line-textfield" key={config.id}>
              <div className="buttons">
                <div>
                  <StyledCheckbox
                    checked={config.checked}
                    onChange={handleChange(config.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <label>{config.label}</label>
                </div>
                <div>
                  <ValueBox>{config.displayValue}</ValueBox>
                </div>
              </div>
            </div>
          ))}
          <div className="buttons">
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                Save
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33499F",
                  color: "white",
                  boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                  marginTop: "10px",
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Sidebar>
    </Box>
  );
};

export default ManageConfigurationMaster;
