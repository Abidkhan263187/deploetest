// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import CustomHeader from "../../components/Header/Header";
// import DashboardIcon from "../../assets/DashboardIcon.svg";
// import callCenterIcon from "../../assets/callCenterIcon1.svg";
// import serviceCenter from "../../assets/serviceCenterIcon1.svg";
// import InventoryIcon from "../../assets/InventoryIcon.svg";
// import Escalation from "../../assets/escalationIcon.svg";
// import TRC from "../../assets/trcIcon.svg";
// import Reports from "../../assets/ReaprtIcon.svg";
// import CompanyImage from "../../assets/comapnyImage.svg";
// import { Link } from "react-router-dom";
// import NuralServiceLogo from "../../assets/NuralServiceLogo.svg";
// import { Constants } from "../../constants/Constant";
// import  './sidebar.css';

// const drawerWidth = 230;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     background:
//       "linear-gradient(89.81deg, #33499F 0%, #169AC4 86.91%, #05CFD3 100%)",
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 0),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// export const newRouteNames = [
//   {
//     label: Constants.dashboard,
//     url: "/dashboard",
//     icon: DashboardIcon,
//   },
//   {
//     label: Constants.grn,
//     url: "/ticket-acknowledge",
//     icon: callCenterIcon,
//   },
//   {
//     label: Constants.serviceCenter,
//     url: "/service-center",
//     icon: serviceCenter,
//   },
//   {
//     label: Constants.inventory,
//     url: "/inventory/dashboard",
//     icon: InventoryIcon,
//   },
//   {
//     label: Constants.escalation,
//     url: "/escalation",
//     icon: Escalation,
//   },
//   {
//     label: Constants.trc,
//     url: "/trc",
//     icon: TRC,
//   },
//   {
//     label: Constants.reports,
//     url: "/reports",
//     icon: Reports,
//   },
//   {
//     label: Constants.partIssue,
//     url: "/part-issue",
//     icon: Reports,
//   },
// ];

// export default function Sidebar({ children }) {
//   const [open, setOpen] = React.useState();
//   const theme = useTheme();

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               mr: 2,
//               ...(open && { display: "none" }),
//               "&:focus, focus-visible": { outline: "none" },
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <CustomHeader />
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             height: "100%",
//             boxSizing: "border-box",
//             backgroundColor: "#EFF3FE", // Add this line
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <Box sx={{ flexGrow: 1 }}>
//           <DrawerHeader>
//             <IconButton
//               onClick={handleDrawerClose}
//               sx={{ "&:focus, focus-visible": { outline: "none" } }}
//             >
//               {theme.direction === "ltr" ? (
//                 <ChevronLeftIcon />
//               ) : (
//                 <ChevronRightIcon />
//               )}
//             </IconButton>
//           </DrawerHeader>

//           <Box textAlign="center">
//             <Box>
//               <img src={CompanyImage} alt="company-image" />
//             </Box>
//             <Box>
//               <Typography variant="h6">Company Name</Typography>
//             </Box>

//             <Box style={{ fontSize: "14px", fontWeight: 600, marginTop: 6 }}>
//               <span>{Constants.lastLogin}: Tue 11:00 am</span>
//             </Box>
//           </Box>

//           <List>
//             {newRouteNames.map((text) => (
//               <ListItem key={text.url} disablePadding>
//                 <Link to={text.url}>
//                   <ListItemButton>
//                     <img src={text.icon} style={{ marginRight: "20px" }} />
//                     <ListItemText
//                       primary={text.label}
//                       style={{ marginTop: 0, marginBottom: 0 }}
//                     />
//                   </ListItemButton>
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         <Box textAlign="center" style={{ padding: "16px" }}>
//           <img src={NuralServiceLogo} alt="company-image" />
//         </Box>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         {children}
//       </Main>
//     </Box>
//   );
// }

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CustomHeader from "../../components/Header/Header";
import DashboardIcon from "../../assets/DashboardIcon.svg";
import callCenterIcon from "../../assets/callCenterIcon1.svg";
import serviceCenter from "../../assets/serviceCenterIcon1.svg";
import InventoryIcon from "../../assets/InventoryIcon.svg";
import Escalation from "../../assets/escalationIcon.svg";
import TRC from "../../assets/trcIcon.svg";
import Reports from "../../assets/ReaprtIcon.svg";
import CompanyImage from "../../assets/comapnyImage.svg";
import { Link } from "react-router-dom";
import NuralServiceLogo from "../../assets/NuralServiceLogo.svg";
import { Constants } from "../../constants/Constant";
import "./sidebar.css";
import userImage from "../../assets/userImage.png";
import Footer from "../../components/footer/Footer";

const drawerWidth = 242;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    background:
      "linear-gradient(89.81deg, #33499F 0%, #169AC4 86.91%, #05CFD3 100%)",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const newRouteNames = [
  {
    label: Constants.dashboard,
    url: "/Repairdashboard",
    icon: DashboardIcon,
  },
  // {
  //   label: Constants.callCenter,
  //   url: "/ticket-acknowledge",
  //   icon: callCenterIcon,
  // },
  {
    label: Constants.ticketAcknowledge,
    url: "/ticket-acknowledge",
    icon: callCenterIcon,
  },
  {
    label: Constants.serviceCenter,
    url: "/dashboard",
    icon: serviceCenter,
  },
  {
    label: Constants.inventory,
    url: "/inventory/dashboard",
    icon: InventoryIcon,
  },
  // {
  //   label: Constants.escalation,
  //   url: "/escalation",
  //   icon: Escalation,
  // },
  // {
  //   label: Constants.trc,
  //   url: "/trc",
  //   icon: TRC,
  // },
  {
    label: Constants.reports,
    url: "/reports/jobsheetreports",
    icon: Reports,
  },
  // {
  //   label: Constants.partIssue,
  //   url: "/part-issue",
  //   icon: Reports,
  // },
];

export default function Sidebar({ children }) {
  const [open, setOpen] = React.useState(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState === null ? false : JSON.parse(savedState);
  });
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("sidebarOpen", true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("sidebarOpen", false);
  };

  return (
    <>
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              "&:focus, focus-visible": { outline: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <CustomHeader />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: "100%",
            boxSizing: "border-box",
            backgroundColor: "#EFF3FE",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ flexGrow: 1 }}>
          <DrawerHeader>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ "&:focus, focus-visible": { outline: "none" } }}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Box textAlign="center">
            <Box>
              <img src={userImage} alt="company-image" />
            </Box>
            <Box>
              <Typography variant="h6">Firebolt</Typography>
            </Box>

            <Box style={{ fontSize: "14px", fontWeight: 600, marginTop: 6 }}>
              <span>{Constants.lastLogin}: Tue 11:00 am</span>
            </Box>
          </Box>

          <List>
            {newRouteNames.map((text) => (
              <ListItem key={text.url} disablePadding>
                <Link to={text.url}>
                  <ListItemButton>
                    <img src={text.icon} style={{ marginRight: "20px" }} />
                    <ListItemText
                      primary={text.label}
                      style={{ marginTop: 0, marginBottom: 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box textAlign="center" style={{ padding: "16px" }}>
          <img src={NuralServiceLogo} alt="company-image" />
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
    <Footer />
    </>
  );
}
