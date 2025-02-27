import petsData from "../data/petsData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const AdoptPet = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("username"));
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [filteredPets, setFilteredPets] = useState(petsData);

  // Extract unique values for filters
  const speciesOptions = [...new Set(petsData.map((pet) => pet.petType))];
  const genderOptions = [...new Set(petsData.map((pet) => pet.gender))];
  const breedOptions = [
    ...new Set(
      petsData
        .filter((pet) => !selectedSpecies || pet.petType === selectedSpecies)
        .map((pet) => pet.breed)
    ),
  ];

  const ageCategories = [
    { label: "< 1 Month Old", condition: (months) => months < 1 },
    { label: "1 Month to < 1 Year Old", condition: (months) => months >= 1 && months < 12 },
    { label: "1 Year Old", condition: (months) => months == 12 },
    { label: "2 Years Old", condition: (months) => months == 24 },
    { label: "3 Years Old", condition: (months) => months == 36 },
    { label: "4+ Years Old", condition: (months) => months > 36 },
  ];

  const ageOptions = ageCategories
    .filter((category) => petsData.some((pet) => category.condition(pet.months)))
    .map((category) => category.label);

  useEffect(() => {
    let filtered = petsData;

    if (selectedSpecies) {
      filtered = filtered.filter((pet) => pet.petType === selectedSpecies);
    }
    if (selectedGender) {
      filtered = filtered.filter((pet) => pet.gender === selectedGender);
    }
    if (selectedBreed) {
      filtered = filtered.filter((pet) => pet.breed === selectedBreed);
    }
    if (selectedAge) {
      const selectedAgeCategory = ageCategories.find((category) => category.label === selectedAge);
      if (selectedAgeCategory) {
        filtered = filtered.filter((pet) => selectedAgeCategory.condition(pet.months));
      }
    }

    setFilteredPets(filtered);
  }, [selectedSpecies, selectedGender, selectedBreed, selectedAge]);

  useEffect(() => {
    setSelectedBreed("");
  }, [selectedSpecies]);

  const handleRedirect = (id) => {
    let url = `/pet-details?id=${id}`; // Default URL without username

    if (username) {
      url = `/pet-details?username=${username}&id=${id}`; // Include username if it's valid
    }
    navigate(url);
  };

  return (
    <div>
      <div id="adopt-pet" className="adopt-pet">
        <h4>Adopt a Pet</h4>
        <p>Explore pets that are available for adoption!</p>
        <div className="adopt-container">
          <div className="row filter-container">
            <div className="col-lg-3 col-12">
              <label className="label-style">Species:</label>
              <div className="input-icon">
                <select value={selectedSpecies} onChange={(e) => setSelectedSpecies(e.target.value)} disabled={!!selectedBreed}>
                  <option value="">All Species</option>
                  {speciesOptions.map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-12">
              <label className="label-style">Gender:</label>
              <div className="input-icon">
                <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                  <option value="">All Gender</option>
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-12">
              <label className="label-style">Breed:</label>
              <div className="input-icon">
                <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
                  <option value="">All Breed</option>
                  {breedOptions.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-12">
              <label className="label-style">Age Range:</label>
              <div className="input-icon">
                <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
                  <option value="">All Age Range</option>
                  {ageOptions.map((ageLabel) => (
                    <option key={ageLabel} value={ageLabel}>
                      {ageLabel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
          <div className="adopt-image-container">
            {filteredPets.map((pet, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="adopt-content" onClick={() => handleRedirect(pet.id)}>
                  <img key={pet.id} src={pet.image} alt={pet.name} />
                  {hoveredIndex === index && (
                    <div className="adopt-image-description">
                      <span>
                        Name: <b>{pet.name}</b> <br />
                        Breed: <b>{pet.breed}</b> <br />
                        Age: <b>{pet.age}</b>
                      </span>
                    </div>
                  )}
                </div>
              </div>

            ))}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdoptPet;
