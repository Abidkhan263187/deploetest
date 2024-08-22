import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  createRole,
  getEntityTypeListAPI,
  getMenuRoleAPI,
  getRoleDropdownListAPI,
  getRoleListAPI,
} from "../../../API service/APIservice";
import Sidebar from "../../Sidebar/Sidebar2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 700,
}));

const RoleMenuMapping = () => {
  const [checked, setChecked] = useState(true);
  const [entityTypes, setEntityTypes] = useState([]);
  const [viewEntity, setViewEntity] = useState("");

  const [menuData, setMenuData] = useState([]);
  const [roleTypes, setRoleTypes] = useState([]);
  const [role, setRole] = useState("");
  //
  const fetchEntityTypes = async () => {
    const data = await getEntityTypeListAPI();
    setEntityTypes(data.entityTypeList);
  };
  // fetch role
  const fetchRoleType = async (entityTypeID) => {
    try {
      console.log(entityTypeID);
      const data = await getRoleDropdownListAPI(entityTypeID);
      setRoleTypes(data.roleList);
    } catch (err) {
      console.log(`Error in fetching role dropdown ${err}`);
    }
  };
  // fetch role menu list
  const fetchRoleMenu = async (viewEntity, role) => {
    try {
      const entityID = viewEntity ? viewEntity : "0";
      const roleID = role ? role : "0";
      const data = await getMenuRoleAPI(entityID, roleID, "1", "10");
      setMenuData(data.roleMenu);
    } catch (err) {
      console.log(`Error in fetching rolemenu data ${err}`);
    }
  };

  useEffect(() => {
    console.log("rolemenu  is rendered");

    fetchEntityTypes();
    fetchRoleMenu();
  }, []);

  const handleSearch = async () => {
    const data = await fetchRoleMenu(viewEntity, role);
    setMenuData(data.roleMenu);
  };
  return (
    <Sidebar>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item> Role Menu Mapping</Item>
          </Stack>
        </Box>
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
          <Grid container>
            <Grid item md={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Select Company
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={viewEntity} // Bind to postData.entityTypeID
                  onChange={(e) => {
                    setViewEntity(e.target.value);
                    fetchRoleType(e.target.value);
                  }}
                  label="Entity Type"
                  placeholder="Select"
                  autoWidth
                >
                  {entityTypes.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    entityTypes.map((entityType) => (
                      <MenuItem
                        key={entityType.entityTypeID}
                        value={entityType.entityTypeID}
                      >
                        {entityType.entityType}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "80%", width: "20ch" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Select Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Role Name"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    console.log(e.target.value);
                    // fetchRoleMenu(viewEntity, e.target.value);
                  }}
                  placeholder="Select"
                  autoWidth
                >
                  {roleTypes.length === 0 ? (
                    <MenuItem value="">
                      <em>No Item</em>
                    </MenuItem>
                  ) : (
                    roleTypes.map((role) => (
                      <MenuItem key={role.roleID} value={role.roleID}>
                        {role.roleName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent=""
            gap={2}
            sx={{ paddingTop: "4rem", m: 2 }}
          >
            <Grid item md={4}>
              <Button
                variant="contained"
                size="medium"
                // onClick={() => {
                //   setPostData({
                //     type: "" /* 1: New, 2: Edit, 3: Status Update */,
                //     entityTypeID: "",
                //     roleID: "",
                //     roleName: "",
                //   });
                //   setEditIndex(null);
                // }}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
                onClick={handleSearch}
              >
                search
              </Button>
            </Grid>
            <Grid item md={4}>
              <Button
                variant="contained"
                size="medium"
                // onClick={handlePostRequest}
                sx={{
                  width: "15rem",
                  margin: "auto",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
                onClick={() => {
                  setViewEntity("");
                  setRole("");
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>

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
          <Grid>
            <InputLabel sx={{ fontWeight: "600", margin: "0" }}>
              Module List
            </InputLabel>
          </Grid>
          {/* <Grid container>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Module"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item container spacing={5} xs={6} justifyContent="flex-end">
              <Grid item>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox />}
                      label="Add Edit"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox />}
                      // onChange={handleEdit}
                      label="View"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid container>
            {menuData.map((menu) => (
              <Grid item key={menu.menuID} xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={menu.id}
                          control={<Checkbox />}
                          label={menu.menuName}
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    container
                    spacing={5}
                    xs={6}
                    justifyContent="flex-end"
                  >
                    <Grid item>
                      <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                          <FormControlLabel
                            value={`add-edit-${menu.id}`}
                            control={<Checkbox />}
                            label="Add/Edit"
                            labelPlacement="end"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                          <FormControlLabel
                            value={`view-${menu.id}`}
                            control={<Checkbox />}
                            label="View"
                            labelPlacement="end"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid container gap={4} pb={5}>
            <Grid item>
              <Button variant="contained" sx={{width:'15rem'}}>Save </Button>
            </Grid>
            <Grid item>
              <Button variant="contained"sx={{width:'15rem'}}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default RoleMenuMapping;
