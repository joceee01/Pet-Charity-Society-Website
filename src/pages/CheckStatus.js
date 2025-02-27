import React, { useState } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";


const CheckStatus = () => {
    const [ticketId, setTicketId] = useState("");
    const [showResult, setShowResult] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info", // Default severity
    });

    const handleCheckStatus = () => {
        const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
        const matchedRequest = storedRequests.find(req => req.ticketId === ticketId);

        if (ticketId.trim() === "") {
            setSnackbar({
                open: true,
                message: "Please key in ticket ID.",
                severity: "error",
            });
            return;
        }
        if (matchedRequest) {
            setShowResult(matchedRequest); // Store the matched result in state
        }

        else {
            setShowResult(null);
            setTicketId("");
            setSnackbar({
                open: true,
                message: "No record found.",
                severity: "warning",
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const getStatusAlert = (status) => {
        switch (status) {
            case "Pending":
                return { severity: "warning", message: "Request pending for approval." };
            case "Approved":
                return { severity: "success", message: "Request approved!" };
            case "Denied":
                return { severity: "error", message: "Request denied!" };
            default:
                return { severity: "info", message: "Status unknown." };
        }
    };

    const status = showResult?.requestStatus || "unknown";
    const { severity, message } = getStatusAlert(status);

    return (
        <div>
            <div id="check-status" className="check-status">
                <div className="status-form-container">
                    <h4>Check Adoption / Release Status</h4>
                    <div className="row release-pet-information">
                        <div className="col-12" style={{ textAlign: "left" }}>
                            <label className="label-style">Ticket ID:</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-search"></i>
                                <input type="text" name="ticketId"
                                    value={ticketId}
                                    onChange={(e) => { setTicketId(e.target.value); }} />
                            </div>
                        </div>
                        <div className="col-12 text-align-center">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="check-status-btn transition mt-4"
                                onClick={handleCheckStatus}
                            >
                                <i className="fa fa-search" style={{ paddingRight: "10px" }}></i>Check Status
                            </motion.button>
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
                    </div>
                    <Collapse in={showResult} timeout={300}>
                        <div className="status-result">
                            <div className="row">
                                <h4>{showResult?.requestType} Result</h4>
                                <div className="col-12">
                                    <Alert className="style-alert mt-2 mb-4" severity={severity}>
                                        {message}
                                    </Alert>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <img className="status-pet-image" src={showResult?.petImage} alt="Pet" />
                                </div>
                                <div className="status-pet-info col-lg-6 col-12">
                                    <h5>{showResult?.petName}</h5>
                                    <p>Ticket ID: {showResult?.ticketId}</p>
                                    <p>Created Date: {showResult?.createdDateTime} </p>
                                    <p>Last Update: {showResult?.updateDateTime}</p>
                                </div>
                            </div>
                        </div>
                    </Collapse>


                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckStatus;
