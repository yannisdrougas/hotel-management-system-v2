import { Box, Toolbar } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <Box sx={{ display: "flex" }}>

            <Navbar />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    p: 3
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>

    );
}

export default Layout;