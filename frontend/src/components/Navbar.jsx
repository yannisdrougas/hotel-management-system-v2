import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Navbar() {

    const navigate = useNavigate();

    const storedUser = sessionStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    const handleLogout = () => {

        sessionStorage.removeItem("user");

        navigate("/login");
    };

    return (

        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1
                    }}
                >
                    Hotel Management System
                </Typography>

                {user && (

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2
                        }}
                    >

                        <Typography>
                            {user.firstName} {user.lastName}
                        </Typography>

                        <Button
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>

                    </Box>

                )}

            </Toolbar>

        </AppBar>

    );
}

export default Navbar;