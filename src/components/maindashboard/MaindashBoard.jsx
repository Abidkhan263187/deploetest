import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Dashboard from '../dashboard/Dashboard';
import NewSidebar from '../Sidebar/NewSidebar';
export default function MainDashBoard() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NewSidebar>
        <Dashboard />
      </NewSidebar>
    </Box>
  );
}
