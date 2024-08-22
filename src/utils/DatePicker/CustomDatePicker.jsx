import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./customdatePicker.css";
import { Grid } from "@mui/material";

const CustomDatePicker = ({ label }) => {
  return (
    <Grid container gap={5} >
      <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputVariant="outlined"
          style={{ border: "none" }}
          margin="normal"
          disableFuture
          openTo="day"
          format="DD/MM/YYYY"
          label={label}
          sx={{minWidth:'200px', maxWidth:'280px'}}
        />
      </LocalizationProvider>
    </Grid>
    </Grid>
  );
};
export default CustomDatePicker;
