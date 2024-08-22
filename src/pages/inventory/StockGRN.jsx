import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  NativeSelect,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { tableCellClasses } from "@mui/material/TableCell";
import Sidebar from "../Sidebar/Sidebar2";
import { Link, useNavigate } from "react-router-dom";

const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontWeight: 700,
}));

const StockGRN = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <Sidebar>
      <Grid container>
        <Grid container sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", fontWeight: 600 }}>
            <Item>Inventory</Item>
          </Box>
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{
            background: "#F5F8FF",
            margin: "10px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
            display: "flex", // Ensures the grid behaves as a flex container
            flexWrap: "nowrap", // Prevents wrapping to ensure buttons stay in one row
            justifyContent: "space-between", // Distributes space evenly between buttons
          }}
        >
          <Grid item sx={{ flexBasis: "22%" }}>
            {" "}
            {/* Adjusted to ensure all buttons fit */}
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%", // Full width of flex item
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                "&:focus": { outline: "none" },
              }}
              onClick={() =>{
                navigate("/inventory/dashboard")
              }}
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/inventory/stockgrn")
              }}
            >
              Stock GRN
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/Bufferstocktransfer")
              }}
            >
              Stock Transfer
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
              onClick={()=>{
                navigate("/Inventorypartreturn")
              }}
            >
              Part Return
            </Button>
          </Grid>
        </Grid>
        {/* <Grid
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
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                color: "#fff",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
            >
              Stock GRN
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
            >
              Stock Transfer
            </Button>
          </Grid>
          <Grid item sx={{ flexBasis: "22%" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "100%",
                margin: "5px",
                background: "#D2F0F4",
                color: "#000000",
                fontWeight: "inherit",
                "&:focus": { outline: "none" },
              }}
            >
              Part Return
            </Button>
          </Grid>
        </Grid> */}
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
            <InputLabel sx={{ fontWeight: "600", margin: "0" }}>
              Stock Upload
            </InputLabel>
          </Grid>
          <Grid container sx={{ margin: "15px 0" }}>
            <label>Upload</label>
          </Grid>
          <Grid container gap={2}>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  justifyContent: "center",
                  background: "#F6F5F5",
                  color: "#000",
                  fontWeight: "inherit",
                  "&:hover": {
                    background: 'primary',
                    color: '#fff',
                  },
                }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                sx={{
                  width: "9.5rem",
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: "center" }}>
              <Link href="#" underline="none">
                Download Template
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="#" underline="none">
                Download SKU Code
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default StockGRN;
