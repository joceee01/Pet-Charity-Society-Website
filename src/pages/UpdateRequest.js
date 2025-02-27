import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UpdateRequest = () => {
    const requests = JSON.parse(localStorage.getItem("requests"));
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("ticketId");
    const req = requests.find((r) => r.ticketId === id);
    const username = JSON.parse(localStorage.getItem("username"));

    const [status, setStatus] = useState(req?.requestStatus || "Pending");
    const [deniedReason, setDeniedReason] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        if (event.target.value !== "Denied") {
            setDeniedReason(""); // Clear denied reason if not denied
        }
    };

    const getSingaporeTime = () => {
        return new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get requests from localStorage
        let requests = JSON.parse(localStorage.getItem("requests")) || [];

        // Find the request and update the status
        let updatedRequests = requests.map((r) =>
            r.ticketId === req.ticketId
                ? { ...r, requestStatus: status, deniedReason: status === "Denied" ? deniedReason : "", updateDateTime: getSingaporeTime() }
                : r
        );


        // Save back to localStorage
        localStorage.setItem("requests", JSON.stringify(updatedRequests));

        // Show snackbar notification
        setSnackbarOpen(true);
        navigate(`/all-requests?username=${username}`)
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="update-request">
            <h4>Pet {req.requestType} Request</h4>
            <p>Update Pet {req.requestType} request for <b>{req.ticketId}</b>.</p>

            <div className="request-form">
                <div className="request-form-container">
                    <form className="row request-information" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <h5>Pet Information</h5>
                        </div>
                        <div className="col-lg-5 col-12">
                            <img style={{ width: "100%" }} src={req.petImage} />
                        </div>
                        <div className="col-lg-7 col-12 update-pet-detail">
                            <p>Name: {req.petName}</p>
                            <p>Gender: {req.petGender}</p>
                            <p>Breed: {req.petBreed}</p>
                            <p>Species: {req.petType}</p>
                            <p>Age: {req.petAge}</p>
                            <p>Information: {req.petInfo}</p>
                        </div>

                        <hr className="mt-4 mb-4" />

                        <div className="col-12 update-requester-detail">
                            <h5>Requester Information</h5>
                        </div>
                        <div className="col-12">
                            <p>Full Name: {req.fullName}</p>
                            <p>Email: {req.email}</p>
                            <p>Phone: {req.phone}</p>
                            <p>Pet {req.requestType} Reason: {req.reason}</p>
                        </div>
                        <div className="col-lg-6 col-12">
                            <label className="label-style">Request Status:</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-spinner"></i>
                                <select name="requestStatus" value={status} onChange={handleStatusChange} required>
                                    <option value="" disabled>Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Denied">Denied</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="label-style">Denied Reason:</label> <br />
                            <textarea placeholder="Why request denied?" name="deniedReason"
                                value={deniedReason}
                                onChange={(e) => setDeniedReason(e.target.value)}
                                disabled={status !== "Denied"}
                                required={status === "Denied"}
                            />
                        </div>
                        <div className="col-12 responsive-btn-container">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="confirm-adopt-btn transition mt-4"
                            >
                                Update Status
                            </motion.button>

                            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                                <Alert onClose={handleCloseSnackbar} severity="success">
                                    Request status updated successfully!
                                </Alert>
                            </Snackbar>
                        </div>
                    </form>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdateRequest;