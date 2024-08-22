import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CustomHeader from "../Header/Header"
import { AddIcCall } from "@mui/icons-material";
import DashboardIcon from "../../assets/DashboardIcon.svg";
import callCenterIcon from "../../assets/callCenterIcon1.svg"
import serviceCenter from "../../assets/serviceCenterIcon1.svg"
import InventoryIcon from "../../assets/InventoryIcon.svg"
import Escalation from "../../assets/escalationIcon.svg"
import TRC from "../../assets/trcIcon.svg"
import Reports from "../../assets/ReaprtIcon.svg"
import CompanyImage from "../../assets/comapnyImage.svg"
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';



import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme, darkMode) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#EFF3FE",
    // color: !darkMode ? "#26282B" : "#fff",
    overflowX: "hidden",
    // borderRight: "1px solid #90B8F8",
});

const closedMixin = (theme, darkMode) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    // backgroundColor: "#EFF3FE",
    // color: "#ffffff",
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    // borderRight: "1px solid #90B8F8",
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    backgroundColor: "#EFF3FE",
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({

    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Sidebar({ children, title }) {
    const navigate = useNavigate()

    const darkMode = false;

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        width: drawerWidth,
        height: "calc(100vh -164px)",
        // border: "1px solid red !important",
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        backgroundColor: "#EFF3FE",
        color: "#ffffff",
        ...(open && {
            ...openedMixin(theme, darkMode),
            "& .MuiDrawer-paper": openedMixin(theme, darkMode),
        }),
        ...(!open && {
            ...closedMixin(theme, darkMode),
            "& .MuiDrawer-paper": closedMixin(theme, darkMode),
        }),
    }));

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navBarDrawerRef = React.useRef(null);
    // let timeoutId;
    const [lis, setLis] = React.useState(
        newRouteNames.map((ob) => ({ ...ob, isOpen: false }))
    );

    React.useEffect(() => {
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (
            navBarDrawerRef?.current &&
            !navBarDrawerRef?.current?.contains(event.target)
        ) {
            setLis((prev) => prev.map((ob) => ({ ...ob, isOpen: false })));
            setOpen(false);
        }
    };

    const handleDrawerToggle = (index) => {
        setOpen(true);

        const temp = [...lis];
        temp[index].isOpen = !temp[index].isOpen;
        setLis(temp);
    };

    // const handleDrawerClose = () => {
    //     setOpen(false);

    //     const temp = lis.map((e) => ({ ...e, isOpen: false }));
    //     setLis(temp);
    // };

    // const MenuToggle = () => <h1 onClick={()=>setOpen(prev=>!prev)}>s</h1>;

    // const getSvgType = (path) => path + ".sv;

    return (
        <>
            <Box sx={{ display: "flex" }} >
                <CssBaseline />
                <AppBar sx={{border:"2px solid red"}}
                    style={{
                        background: 'linear-gradient(89.81deg, #33499F 0%, #169AC4 86.91%, #05CFD3 100%)',
                    }}
                    position="fixed"
                    open={open}
                >
                    <Toolbar sx={{border:"2px solid red"}}>

                        {/* <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                                setOpen(true);
                            }}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                "&.MuiIconButton-root": {
                                    marginRight: "1.5rem",
                                },
                                ...(open && { display: "none" }),
                            }}
                        >
                        </IconButton> */}

                         <MenuOutlinedIcon 
                         sx={{marginX:"2px", cursor:"pointer"}}
                        onClick={() => setOpen(prev => !prev)} />
                         <CustomHeader />
                       
                    </Toolbar>
                </AppBar>

                <Drawer sx={{border:"2px solid green"}}
                    variant="permanent"
                    open={open}
                    ref={navBarDrawerRef}
                >
                    {open && <DrawerHeader>
                        <ListItem disablePadding sx={{ display: "block" }} >

                            <Box textAlign="end" mt={2} mr={2}>
                                <ArrowBackIosNewOutlinedIcon 
                                sx={{cursor:"pointer"}}

                                 onClick={() => {
                                    setOpen(false);
                                }}/>
                            </Box>

                            <Box textAlign="center" mt={1}>
                                <img src={CompanyImage} alt="company-image" />
                            </Box>

                            <Box style={{ textAlign: "center" }}>
                                <Box>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        Company Name
                                    </Typography>
                                </Box>

                                <Box style={{ textAlign: "center", fontSize: "14px", fontWeight: 600, marginTop: 6 }}>
                                    <span>Last Login: Tue 11:00 am</span>
                                </Box>

                            </Box>

                        </ListItem>
                    </DrawerHeader>
                    }

                    {lis.map(
                        (li, index) =>
                            !li?.hidden && (
                                <ListItem key={index}
                                    disablePadding

                                // sx={{
                                //     display: "block",
                                //     background: li.isOpen ? "#424A56;" : null,
                                //     "&:hover": {
                                //         background: li.isOpen ? null : "#3A424D",
                                //     },
                                // }}

                                >

                                    <ListItemButton sx={{border:"2px solid red"}}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            li.url ? navigate(li.url) : handleDrawerToggle(index);
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: "white" }}>
                                            <img
                                                width={"24px"}
                                                height={"24px"}
                                                src={(li.icon)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={{
                                                opacity: !li.children?.length && !li.url ? 0.2 : 1,
                                                "& .MuiTypography-root": {
                                                    fontFamily: "Poppins",
                                                    whiteSpace: "nowrap",
                                                },
                                            }}
                                            primary={li.label}
                                        />
                                        {li.children &&
                                            (li.isOpen ? <ExpandLess /> : <ExpandMore />)}
                                    </ListItemButton>



                                    {li.children && (
                                        <Collapse in={li.isOpen} timeout="auto" unmountOnExit>
                                            <List
                                                component="div"
                                                disablePadding
                                                sx={{
                                                    background: "#2E3238",
                                                }}
                                            >
                                                {li.children.map((nestedLi, index) => {

                                                    const isDisabled = nestedLi?.isDisabled
                                                        ? true
                                                        : false;

                                                    return (
                                                        <>
                                                            <ListItem key={index}
                                                                sx={{
                                                                    padding: 0,
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    alignItems: "flex-start",
                                                                }}
                                                            >
                                                                <ListItemButton
                                                                    key={index}
                                                                    sx={{
                                                                        p: 0,
                                                                        pl: 9,
                                                                        width: "100%",
                                                                        "&:hover": {
                                                                            background: "#3A424D",
                                                                            cursor: isDisabled
                                                                                ? "auto !important"
                                                                                : "pointer !important",
                                                                        },
                                                                    }}
                                                                    onClick={() => {
                                                                        if (!isDisabled) {
                                                                            router.push(nestedLi.url);
                                                                            dispatch(
                                                                                setSettingState({
                                                                                    key: "isSidePanelOpen",
                                                                                    value: false,
                                                                                })
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <ListItemText
                                                                        sx={{
                                                                            fontSize: "small",
                                                                            opacity: isDisabled
                                                                                ? '0.2 !important'
                                                                                : !nestedLi.url
                                                                                    ? 0.2
                                                                                    : 1,
                                                                            "& .MuiTypography-root": {
                                                                                fontFamily: "Poppins",
                                                                                whiteSpace: "normal",
                                                                            },
                                                                        }}
                                                                        primary={nestedLi.label}
                                                                    />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            {li.label === system_data_label &&
                                                                (index + 1) % 4 === 0 && (
                                                                    <div
                                                                        style={{
                                                                            height: "1px",
                                                                            width: "100%",
                                                                            backgroundColor: "#545454",
                                                                            margin: "7px 0",
                                                                            marginLeft: "72px",
                                                                        }}
                                                                    />
                                                                )}
                                                        </>
                                                    );
                                                })}
                                            </List>
                                        </Collapse>
                                    )}
                                </ListItem>
                            )
                    )}
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    {children}
                </Box>

            </Box>
        </>
    );
}

export const newRouteNames = [
    {
        label: "Dashboard",
        url: "/dashboard",
        icon: DashboardIcon,
    },

    {
        label: "Call Center",
        url: "/call-center",
        icon: callCenterIcon,
    },
    {
        label: "Service Center",
        url: "/service-center",
        icon: serviceCenter,
    },
    {
        label: "Inventory",
        url: "/inventory/dashboard",
        icon: InventoryIcon,
    },
    {
        label: "Escalation",
        url: "/escalation",
        icon: Escalation,
    },
    {
        label: "TRC",
        url: "/trc",
        icon: TRC,
    },
    {
        label: "Reports",
        url: "/reports",
        icon: Reports,
    },
    
    // {
    //     label: "System Data",
    //     children: [
    //         { url: "/admin/paymentType", label: "Payment Type" },
    //         { url: "/admin/feeProvider", label: "Fee Provider" },
    //     ],
    //     icon: "/assets/sidepanel/configurations",
    // },

];

export const system_data_label = "System Data";