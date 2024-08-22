import { Box, Typography } from "@mui/material";
import NewSidebar from "../Sidebar/NewSidebar";

const CallCenter = () => {
    return (

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <NewSidebar>
                <h4>Call Center Page </h4>
            </NewSidebar>
        </Box>
    )
}


export default CallCenter;
