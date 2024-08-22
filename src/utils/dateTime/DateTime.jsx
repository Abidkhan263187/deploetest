import React from "react";
import { Typography } from "@mui/material";

const DateTime = () => {
   
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    return (
        <Typography variant="subtitle2">
            {`${day} ${month} ${year}`}
        </Typography>
    )
}

export default DateTime;




