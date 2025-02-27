import React, { useState } from "react";
import pets from "../data/petsData";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Modal } from "react-bootstrap";
import Footer from "../components/Footer";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adoption Advisory
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>If you wish to adopt a pet, you should understand the responsibilies:</h4>
                <p>
                    1. Pets are a lifetime commitment (10-20 years). Ensure you're ready for the responsibility. <br /><br />
                    2. Owning a pet requires spending on food, vet visits, grooming, and emergencies. <br /><br />
                    3. Pets need daily care, training, and love. Neglect can lead to behavioral issues. <br /><br />
                    4. Ensure your home is pet-friendly and suitable for the pet’s needs. <br /><br />
                    5. Regular checkups, vaccinations, and preventive care are essential. <br /><br />
                    6. Follow local pet laws (licenses, neutering) and never abandon pets.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-btn" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const PetDetails = () => {
    const username = JSON.parse(localStorage.getItem("username"));
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const pet = pets.find((p) => p.id === parseInt(id));
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    if (!pet) return (console.log("Pet not found."));

    const handleRedirect = (id) => {
        let url = `/adoption-form?id=${id}`; // Default URL without username
    
        if (username) {
          url = `/adoption-form?username=${username}&id=${id}`; // Include username if it's valid
        }
        navigate(url);
      };

    return (
        <div>
            <div className="pet-details">
                <div className="row">
                    <div className="col-lg-5 col-12 detail-image-container">
                        <img className="pet-image" src={pet.image} alt={pet.name} />
                    </div>
                    <div className="col-lg-7 col-12 details-description">
                        <h1>Meet {pet.name}, the {pet.breed}</h1>
                        <p>Name: {pet.name}</p>
                        <p>Gender: {pet.gender}</p>
                        <p>Age: {pet.age}</p>
                        <h3>About {pet.breed}</h3>
                        <p>{pet.description}</p>
                        <p>Lifespan: {pet.lifespan}</p>
                        <h3>Adoption Note</h3>
                        <p>1. All adopters is required to license their pet at the point of adoption.</p>
                        <p>2. Adoption fee payment to be made on the day you come for pet collection.</p>
                        <p>3. Pet collection details will be sent to you once we have confirmed your adoption.</p>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "transparent", color: "#00c2cb", fontWeight: "bold" }}
                            whileTap={{ scale: 0.9 }}
                            className="card-button transition mt-2"
                            onClick={() => setModalShow(true)}
                        >
                            <span>LEARN MORE &gt;&gt;</span>
                        </motion.button>
                        <h3>Adoption Fee</h3>
                        <p>${pet.adoptionFee}.00</p>
                        <div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="adopt-btn transition mt-4 mb-4"
                                onClick={() => handleRedirect(pet.id)}
                            >
                                Adopt Now
                            </motion.button>
                        </div>
                    </div>

                    {/* Adoption Modal */}
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PetDetails;
