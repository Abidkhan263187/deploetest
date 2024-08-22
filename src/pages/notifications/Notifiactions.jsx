import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar2";

const Notifications=()=>{
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Sidebar>
                <h4>Notification Page </h4>
            </Sidebar>
        </Box>
    )
}

export default Notifications;