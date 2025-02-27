import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Signup = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info", // Default severity
    });

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        gender: "",
        termsAccepted: false,
        userType: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        if (e.target.name === "username") {
            e.target.value = e.target.value.toLowerCase();
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Determine user type based on username
        const userType = formData.username.includes("@petheaven") ? "staff" : "user";

        const username = formData.username;
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (savedUsers.some((user) => user.username === username)) {
            setSnackbar({
                open: true,
                message: "Username " + username + " is already taken.",
                severity: "error",
            });
            setFormData((prevData) => ({ ...prevData, username: "" }));
            return;
        }

        const existingUser = savedUsers.find((u) => u.username !== username && (u.email === formData.email || u.phone === formData.phone));
        if (existingUser) {
            setSnackbar({
                open: true,
                message: "Email or phone number already in use.",
                severity: "error",
            });
            return;
        }

        if (!formData.termsAccepted && userType !== "staff") {
            setSnackbar({
                open: true,
                message: "You must agree to the Terms and Conditions to sign up.",
                severity: "error",
            });
            return;
        }

        // Save adoption request to local storage
        const updatedFormData = { ...formData, userType };
        savedUsers.push(updatedFormData);
        localStorage.setItem("users", JSON.stringify(savedUsers));

        setSnackbar({
            open: true,
            message: "Registration successful!",
            severity: "success",
        });

        localStorage.setItem("username", JSON.stringify(formData.username));

        if (userType === "staff") {
            localStorage.setItem("userType", JSON.stringify("staff"));
            navigate(`/all-requests?username=${username}`);
        }
        else {
            localStorage.setItem("userType", JSON.stringify("user"));
            navigate(`/?username=${username}`);
        }
        window.dispatchEvent(new Event("storage"));
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <form className="row" onSubmit={handleSubmit}>
                    <h3>Sign Up Member</h3>
                    <div className="col-md-6 col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-address-card"></i>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-venus-mars"></i>
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-phone"></i>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact Number" required />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="input-icon">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="options">
                            <label>
                                <input type="checkbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })} />
                                I have confirm that I have read and agree to the Terms & Conditions and
                                Privacy Policy of Pet Heaven.
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="login-btn" id="login-btn">Sign Up</button>
                        <div className="new-user">
                            <label>Already has an account? <span onClick={() => navigate(`/login`)}>Login here</span></label>
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
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Signup;
