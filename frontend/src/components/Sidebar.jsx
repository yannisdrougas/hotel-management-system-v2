import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import BedIcon from "@mui/icons-material/Bed";
import BadgeIcon from "@mui/icons-material/Badge";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentIcon from "@mui/icons-material/Payment";

import { NavLink } from "react-router-dom";


const drawerWidth = 240;


function Sidebar() {

    const menuItems = [

        {
		text: "Dashboard",
		icon: <DashboardIcon />,
		path: "/dashboard"
		},

        {
            text: "Customers",
            icon: <PeopleIcon />,
            path: "/customers"
        },

        {
            text: "Addresses",
            icon: <LocationOnIcon />,
            path: "/addresses"
        },

        {
            text: "Hotels",
            icon: <HotelIcon />,
            path: "/hotels"
        },

        {
            text: "Rooms",
            icon: <BedIcon />,
            path: "/rooms"
        },

        {
            text: "Employees",
            icon: <BadgeIcon />,
            path: "/employees"
        },

        {
            text: "Reservations",
            icon: <EventAvailableIcon />,
            path: "/reservations"
        },

        {
            text: "Payments",
            icon: <PaymentIcon />,
            path: "/payments"
        }

    ];


    return (

        <Drawer

            variant="permanent"

            sx={{

                width: drawerWidth,

                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    boxSizing: "border-box",

                    backgroundColor: "#f8f9fa"

                }

            }}

        >

            <Toolbar />


            <List>

                {menuItems.map((item) => (

                    <ListItem

                        key={item.text}

                        disablePadding

                    >

                        <ListItemButton

                            component={NavLink}

                            to={item.path}

                            sx={{

                                "&.active": {

                                    backgroundColor: "#1976d2",

                                    color: "white",

                                    "& .MuiListItemIcon-root": {

                                        color: "white"

                                    }

                                },

                                "&:hover": {

                                    backgroundColor: "#1565c0",

                                    color: "white",

                                    "& .MuiListItemIcon-root": {

                                        color: "white"

                                    }

                                }

                            }}

                        >

                            <ListItemIcon>

                                {item.icon}

                            </ListItemIcon>


                            <ListItemText

                                primary={item.text}

                            />

                        </ListItemButton>

                    </ListItem>

                ))}

            </List>

        </Drawer>

    );

}


export default Sidebar;