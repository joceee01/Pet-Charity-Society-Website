import React, { useState, useEffect } from "react";
import pets from "../data/petsData";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

function MyVerticallyCenteredModal({ show, onHide, ticketId }) {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem("username"));

    const handleClose = () => {
        onHide();
        let url = `/`; // Default URL without username

        if (username) {
            url = `/?username=${username}`; // Include username if it's valid
        }
        navigate(url);
    };

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(ticketId);
        setSnackbar({ open: true, message: "Ticket ID copied!", severity: "success" });
    };

    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i className="fa fa-check-circle" style={{ color: "green", paddingRight: "15px" }}></i>
                    Form Submitted Successfully!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="confirmation-modal-body">
                    <div>
                        <h5>Ticket ID:</h5>
                    </div>

                    <div className="modal-input-icon">
                        <input value={ticketId}></input>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 400 }}
                            overlay={<Tooltip>Copy Ticket ID</Tooltip>}
                        >
                            <i className="fa fa-copy" style={{ paddingLeft: "10px", cursor: "pointer" }} onClick={handleCopy}></i>
                        </OverlayTrigger>
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
                <p>
                    An email confirmation with your ticket ID will be sent to you shortly.<br /><br />
                    Once your adoption request has been approved by us,
                    an adoption approval document with the collection details will be emailed you.<br /><br />
                    You may check the Adoption Status under "Check Status" using the Ticket ID provided.<br /><br />
                    Please show the adoption approval document on the day of pet collection at <br /> <b>123 Pet Heaven Road Singapore 567890</b>.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-btn" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const AdoptionForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const pet = pets.find((p) => p.id === parseInt(id));
    const [modalShow, setModalShow] = useState(false);
    const [ticketId, setTicketId] = useState("");
    const username = JSON.parse(localStorage.getItem("username"));
    const users = JSON.parse(localStorage.getItem("users")) || {};
    var user = "";

    if (!users) {
        user = users.find((u) => u.username === username);
    }
    
    const getSingaporeTime = () => {
        return new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
    };

    // Load user data from localStorage
    const getDefaultUserData = {
        fullName: user?.fullName || "",
        username: user?.username || "",
        gender: user?.gender || "",
        address: "",
        residentialType: "",
        email: user?.email || "",
        phone: user?.phone || "",
        reason: "",
        petId: pet?.id || "",
        petName: pet?.name || "",
        petImage: pet?.image || "",
        petGender: pet?.gender || "",
        petBreed: pet?.breed || "",
        petType: pet?.petType || "",
        petAge: pet?.age || "",
        petInfo: "",
        requestType: "Adoption",
        requestStatus: "Pending",
        createdDateTime: getSingaporeTime(),
        updateDateTime: getSingaporeTime(),
        deniedReason: "",
        costPayable: pet?.adoptionFee
    };
    const [formData, setFormData] = useState(getDefaultUserData);

    useEffect(() => {
        setFormData(getDefaultUserData);
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate a unique ticket ID
        const newTicketId = `TID-${Date.now()}`;
        setTicketId(newTicketId);

        // Save adoption request to local storage
        const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
        const newRequest = {
            ...formData,
            ticketId: newTicketId,
            petInfo: formData.petInfo.trim() === "" ? "No Information Stated." : formData.petInfo
        };
        localStorage.setItem("requests", JSON.stringify([...savedRequests, newRequest]));

        // Show confirmation modal
        setModalShow(true);
    };

    return (
        <div>
            <div className="adoption-form">
                <h4><b>Thanks for choosing {pet.name} for adoption!</b></h4>
                <div className="adoption-form-container">
                    <div className="row pet-information">
                        <div className="col-lg-6 col-12" style={{ textAlign: "right" }}>
                            <img className="form-pet-image" src={pet.image} alt={pet.name} />
                        </div>
                        <div className="col-lg-6 col-12 confirm-pet-detail">
                            <p>{pet.name}, a {pet.age} {pet.breed} {pet.gender} {pet.petType}.</p>
                            <p>
                                Adoption Fee: ${pet.adoptionFee}.00
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 100, hide: 400 }}
                                    overlay={<Tooltip>Adoption fee to be paid on collection day.</Tooltip>}
                                >
                                    <i className="fa fa-info-circle" style={{ paddingLeft: "10px", cursor: "pointer" }}></i>
                                </OverlayTrigger>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <form className="row adopter-information" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <h5>Adopter Information</h5>
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
                            <label className="label-style">Residential Address:</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-map-pin"></i>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <label className="label-style">Residential Type:</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-house"></i>
                                <select name="residentialType" value={formData.residentialType} onChange={handleChange} required>
                                    <option value="" disabled>Select Residential Type</option>
                                    <option value="HDB">HDB</option>
                                    <option value="Condominium">Condominium</option>
                                    <option value="Landed">Landed</option>
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
                        <div className="col-12">
                            <label className="label-style">What made you decide to adopt a pet?</label> <br />
                            <textarea placeholder="Share your reasons" name="reason" value={formData.reason} onChange={handleChange} required />
                        </div>
                        <div className="col-12 responsive-btn-container">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="confirm-adopt-btn transition mt-4"
                            >
                                Adopt {pet.name}!
                            </motion.button>

                            {/* Adoption Confirmation */}
                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                ticketId={ticketId}
                            />
                        </div>
                    </form>
                    <div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdoptionForm;
