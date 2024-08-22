import { Box } from '@mui/material';
import Dashboard from "../../pages/dashboard/Dashboard"
import Footer from '../../components/footer/Footer';
import Sidebar from "../../pages/Sidebar/Sidebar2"

export default function MainDashBoard() {

  return (
    <Box >
      <Sidebar>
        <Dashboard />
        <Footer/>
        <br/>
        <br/>
      </Sidebar>
    </Box>
  );
}
