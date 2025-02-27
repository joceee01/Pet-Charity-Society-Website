import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation.js";
import Home from "./pages/Home.js";
import AboutUs from "./pages/AboutUs.js";
import AdoptPet from "./pages/AdoptPet.js";
import PetDetails from "./pages/PetDetails.js";
import AdoptionForm from "./pages/AdoptionForm.js";
import ReleasePet from "./pages/ReleasePet.js";
import CheckStatus from "./pages/CheckStatus.js";
import ContactUs from "./pages/ContactUs.js";
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import UserManagement from "./pages/UserManagement.js";
import StaffNavigation from "./components/StaffNavigation.js";
import AllRequests from "./pages/AllRequests.js";
import ScrollToTop from "./components/ScrollToTop.js";
import './App.css';
import UpdateRequest from "./pages/UpdateRequest.js";

const App = () => {
  const [userType, setUserType] = useState(JSON.parse(localStorage.getItem("userType")) || "user");

  useEffect(() => {
    const handleStorageChange = () => {
      setUserType(JSON.parse(localStorage.getItem("userType")) || "user");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <ScrollToTop />

        {userType === "staff" ? <StaffNavigation /> : <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/adopt-pet" element={<AdoptPet />} />
          <Route path="/pet-details" element={<PetDetails />} />
          <Route path="/adoption-form" element={<AdoptionForm />} />
          <Route path="/release-pet" element={<ReleasePet />} />
          <Route path="/check-status" element={<CheckStatus />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/all-requests" element={<AllRequests />} />
          <Route path="/update-requests" element={<UpdateRequest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
