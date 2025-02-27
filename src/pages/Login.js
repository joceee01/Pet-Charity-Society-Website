import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

const Login = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "warning", // Default severity
    });

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        if (e.target.name === "username") {
            e.target.value = e.target.value.toLowerCase();
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("users")) || {};

        if (storedUser.length > 0) {
            const checkUsername = storedUser.find((user) => user.username === formData.username);
            if (!checkUsername) {
                setSnackbar({
                    open: true,
                    message: "Username not found.",
                    severity: "error",
                });
                return;
            }
            else if (checkUsername.password !== formData.password) {
                setSnackbar({
                    open: true,
                    message: "Incorrect password.",
                    severity: "error",
                });
                return;
            }

            console.log(formData.username)
            localStorage.setItem("username", JSON.stringify(formData.username));

            if (checkUsername.userType === "staff") {
                localStorage.setItem("userType", JSON.stringify("staff"));
                navigate(`/all-requests?username=${formData.username}`);
            }
            else {
                localStorage.setItem("userType", JSON.stringify("user"));
                navigate(`/?username=${formData.username}`);
            }
            window.dispatchEvent(new Event("storage"));
        }

        else {
            setSnackbar({
                open: true,
                message: "Username not found.",
                severity: "error",
            });
            return;
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <form className="row" onSubmit={handleSubmit}>
                    <h3>Member Login</h3>
                    <div className="col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="options">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className="login-btn" id="login-btn">Login</button>
                        <div className="new-user">
                            <label>New here? <span onClick={() => navigate(`/signup`)}>Create an Account</span></label>
                        </div>
                    </div>
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </div>

    );
};

export default Login;
