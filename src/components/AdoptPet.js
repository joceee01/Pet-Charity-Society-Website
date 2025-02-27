import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function AdoptPetComponent() {
    const pets = [
        {
            name: "Max",
            image: "../../images/adopt-dog1.jpg",
            description: "A playful and loving dog looking for a new home.",
        },
        {
            name: "Bella",
            image: "../../images/adopt-cat1.jpg",
            description: "Cute and pettyful kitten waiting for its owner.",
        },
        {
            name: "Luna",
            image: "../../images/adopt-dog2.jpg",
            description: "Friendly and energetic dog ready for adoption.",
        },
    ];
    const username = localStorage.getItem("username");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <div>
            <div className="home-adopt-content">
                {pets.map((pet, index) => (
                    <div key={index}
                        className="home-adopt-body"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="home-adopt-img">
                            <img src={pet.image} alt={pet.name} className="hover-image" />
                            {hoveredIndex === index && (
                                <div className="image-description">
                                    <p>Name: {pet.name}</p>
                                    <p>{pet.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button className="explore-btn" onClick={() => navigate(`/adopt-pet?username=${username}`)} >
                <span>Explore all Pets</span>
            </button>
        </div>


    );
}
