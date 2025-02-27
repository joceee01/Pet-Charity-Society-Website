import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserManagement = () => {
    const username = JSON.parse(localStorage.getItem("username"));
    const userType = JSON.parse(localStorage.getItem("userType"));
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users.find((u) => u.username === username);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        username: user?.username || "",
        password: user?.password || "",
        gender: user?.gender || "",
    });

    useEffect(() => {
        if (user && !formData.username) {
            setFormData(user); // Set only once when the component mounts
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email or phone is already used by another user
        const existingUser = savedUsers.find((u) => u.username !== username && (u.email === formData.email || u.phone === formData.phone));
        if (existingUser) {
            setSnackbar({
                open: true,
                message: "Email or phone number already in use.",
                severity: "error",
            });
            return;
        }

        // Update the user data
        savedUsers = savedUsers.map((u) => (u.username === username ? { ...u, ...formData } : u));

        // Save back to localStorage
        localStorage.setItem("users", JSON.stringify(savedUsers));

        setSnackbar({
            open: true,
            message: "Profile updated successfully!",
            severity: "success",
        });
    };

    return (
        <div>
            <div className="user-page">
                <h4>Manage Account</h4>
                <p>Update your personal particulars</p>
                <div className="user-form">
                    <div className="user-form-container">
                        <form className="row user-information" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <h5>Hello {formData.username}!</h5>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Full Name:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-address-card"></i>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Gender:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-venus-mars"></i>
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Email:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input type="text" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Contact Number:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-phone"></i>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Username:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-user"></i>
                                    <input type="text" value={formData.username} disabled />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Password:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-lock"></i>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-12 responsive-btn-container">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="confirm-adopt-btn transition mt-4"
                                >
                                    Update Profile
                                </motion.button>

                                <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                                        {snackbar.message}
                                    </Alert>
                                </Snackbar>
                            </div>
                        </form>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

            {userType !== "staff" && <Footer />}

        </div>
    );
};

export default UserManagement;
