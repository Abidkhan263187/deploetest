import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar2";
import BarCodeGenerator from "../../components/BarCodeGenerator/BarCodeGenerator";


const Escalation=()=>{
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Sidebar>
                <BarCodeGenerator/>
            </Sidebar>
        </Box>
    )
}
export default Escalation;
