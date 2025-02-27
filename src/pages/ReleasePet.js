import React, { useState, useCallback, useEffect } from "react";
import Footer from "../components/Footer";
import { useDropzone } from "react-dropzone";
import { Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { motion } from "framer-motion";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

function MyVerticallyCenteredModal({ show, onHide, ticketId }) {
    const handleClose = () => {
        onHide();
        window.location.reload();
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
                    Once your release request has been approved by us,
                    a release approval document with the release details will be emailed you.<br /><br />
                    You may check the Release Status under "Check Status" using the Ticket ID provided.<br /><br />
                    Please show the release approval document on the day of pet release at <br /> <b>123 Pet Heaven Road Singapore 567890</b>.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-btn" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ReleasePet = () => {
    const [modalShow, setModalShow] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState("");
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

    const getDefaultUserData = {
        fullName: user?.fullName || "",
        username: user?.username || "",
        gender: user?.gender || "",
        address: "",
        residentialType: "",
        email: user?.email || "",
        phone: user?.phone || "",
        reason: "",
        petId: "",
        petName: "",
        petImage: "",
        petGender: "",
        petBreed: "",
        petType: "",
        petAge: "",
        petInfo: "",
        requestType: "Release",
        requestStatus: "Pending",
        createdDateTime: getSingaporeTime(),
        updateDateTime: getSingaporeTime(),
        deniedReason: "",
        costPayable: 0
    };

    const [formData, setFormData] = useState(getDefaultUserData);

    useEffect(() => {
        setFormData(getDefaultUserData);
    }, []);

    // Handle dropped files
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]; // Get the first dropped file
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Create preview URL
        setFileName(file.name);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*", // Accept only images
        multiple: false, // Allow only one image
    });

    // Remove selected image
    const removeImage = () => {
        setImage(null);
        setPreview(null);
        setFileName("");
    };
    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please upload an image.");
            return;
        }

        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            const base64Image = await convertToBase64(image);

            // Generate a unique ticket ID
            const newTicketId = `TID-${Date.now()}`;
            setTicketId(newTicketId);

            // Save release request to local storage
            const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
            const newRequest = {
                ...formData,
                ticketId: newTicketId,
                petImage: base64Image,
                petInfo: formData.petInfo.trim() === "" ? "No Information Stated." : formData.petInfo
            };
            localStorage.setItem("requests", JSON.stringify([...savedRequests, newRequest]));

            // Show confirmation modal
            setModalShow(true);
        } catch (error) {
            console.error("Error converting image:", error);
        }
    };

    return (
        <div>
            <div className="release-pet-page">
                <h4>Release Pet</h4>
                <p>Give your pet a second chance</p>
                <div className="release-form">
                    <div className="release-form-container">
                        <form className="row release-pet-information" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <h5>Pet Information</h5>
                            </div>
                            <div className="col-12">
                                {/* Drag and Drop Area */}
                                <div
                                    {...getRootProps()}
                                    className="dropzone mt-2 mb-2 p-4 rounded d-flex align-items-center justify-content-center flex-column"
                                    style={{ cursor: "pointer", border: "2px dashed #ccc", backgroundColor: "#eceeef", padding: "20px" }}
                                >
                                    <input {...getInputProps()} />
                                    {preview ? (
                                        // Display image preview
                                        <div className="d-flex align-items-center">
                                            <img src={preview} alt="Preview" style={{ height: "50vh", objectFit: "cover", marginRight: "20px" }} />
                                            <span>File Selected: <b>{fileName}</b></span>
                                            <Button variant="danger" className="ms-2" onClick={removeImage} size="sm">
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </div>
                                    ) : (
                                        <p className="text-grey" style={{ textAlign: "center", fontSize: "15px" }}>
                                            Drag & drop your pet's image here <br /> or click to select from folder
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Pet Name:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-address-card"></i>
                                    <input type="text" name="petName" value={formData.petName} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Gender:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-venus-mars"></i>
                                    <select name="petGender" value={formData.petGender} onChange={handleChange} required>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Breed:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-paw"></i>
                                    <input type="text" name="petBreed" value={formData.petBreed} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Species:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-paw"></i>
                                    <select name="petType" value={formData.petType} onChange={handleChange} required>
                                        <option value="" disabled>Select Species</option>
                                        <option value="Cat">Cat</option>
                                        <option value="Dog">Dog</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="label-style">Age:</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-question-circle"></i>
                                    <input type="text" name="petAge" value={formData.petAge} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                            </div>
                            <div className="col-12">
                                <label className="label-style">Additional Information</label> <br />
                                <textarea placeholder="Share extra details about your pet" name="petInfo" value={formData.petInfo} onChange={handleChange} required />
                            </div>
                            <hr className="mt-4 mb-4" />

                            <div className="col-12">
                                <h5>Your Information</h5>
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
                            <div className="col-12">
                                <label className="label-style">What made you decide to release a pet?</label> <br />
                                <textarea placeholder="Share your reasons" name="reason" value={formData.reason} onChange={handleChange} required />
                            </div>
                            <div className="col-12 responsive-btn-container">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="confirm-adopt-btn transition mt-4"
                                    onClick={() => setModalShow(true)}
                                >
                                    Release Pet
                                </motion.button>

                                {/* Adoption Confirmation */}
                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => {
                                        setModalShow(false);
                                        window.location.reload();
                                    }}
                                    ticketId={ticketId}
                                />
                            </div>
                        </form>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ReleasePet;
