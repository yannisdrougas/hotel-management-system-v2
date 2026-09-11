import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";

function SignupPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const [error, setError] = useState("");

   const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password ||
        !confirmPassword
    ) {
        setError("Please fill in all fields.");
        return;
    }

    if (password.length < 6) {
        setError(
            "Password must contain at least 6 characters."
        );
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    try {

        await api.post("/auth/register", {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: password
        });

        navigate("/login");

    } catch (error) {

        console.error("Registration failed:", error);

        setError(
            "Registration failed. The email may already be registered."
        );

    }

};
    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                p: 2
            }}
        >

            <Card
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 3
                }}
            >

                <CardContent
                    sx={{
                        p: 4
                    }}
                >

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        sx={{
                            mb: 1
                        }}
                    >
                        Hotel Management System
                    </Typography>


                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="text.secondary"
                        sx={{
                            mb: 4
                        }}
                    >
                        Create Account
                    </Typography>


                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        {error && (

                        <Alert
                         severity="error"
                         sx={{
                         mb: 2
                             }}
                         >
                         {error}
                         </Alert>

                        )}

                        <TextField
                            required
                            fullWidth
                            label="First Name"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            sx={{
                                mb: 2
                            }}
                        />


                        <TextField
                            required
                            fullWidth
                            label="Last Name"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            sx={{
                                mb: 2
                            }}
                        />


                        <TextField
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            sx={{
                                mb: 2
                            }}
                        />


                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            sx={{
                                mb: 2
                            }}
                        />


                        <TextField
                            required
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            sx={{
                                mb: 3
                            }}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.4
                            }}
                        >
                            Sign Up
                        </Button>


                       <Typography
    textAlign="center"
    color="text.secondary"
    sx={{
        mt: 3
    }}
>
    Already have an account?{" "}

    <Link
        to="/login"
        style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold"
        }}
    >
        Login
    </Link>

</Typography>

                    </Box>

                </CardContent>

            </Card>

        </Box>

    );

}

export default SignupPage;