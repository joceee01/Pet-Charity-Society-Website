import logoDark from "../images/logo-dark.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const StaffNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = JSON.parse(localStorage.getItem("username"));
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleRedirect = (path) => {
        navigate(path); // Redirect to a new page
        setDropdownOpen(false); // Close dropdown after clicking
        setMenuOpen(!menuOpen);
    };


    return (
        <div className="staff-navbar-container">
            <div className="logo">
                <img src={logoDark} alt="Logo" onClick={() => navigate(`/all-requests?username=${username}`)} />
            </div>
            <div className="staff-responsive-nav">
                <div className="staff-toggle-container">
                    <button className="staff-menu-toggle" onClick={toggleMenu}>
                        ☰
                    </button>
                </div>

                <nav className={`staff-navbar ${menuOpen ? "open" : ""}`}>
                    <span className={`nav-link ${location.pathname === "/all-requests" ? "active" : ""}`} onClick={() => navigate(`/all-requests?username=${username}`)}>All Requests</span>
                    <div
                        className="dropdown"
                        onMouseEnter={!isMobile ? () => setDropdownOpen(true) : null}
                            onMouseLeave={!isMobile ? () => setDropdownOpen(false) : null}
                    >
                        <button className="dropbtn" onClick={isMobile ? toggleDropdown : null}>
                            <i className="fa-solid fa-user"></i>
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-content">
                                <span className="dropdown-item" onClick={() => handleRedirect(`/user-management?username=${username}`)}>Account Management</span>
                                <span className="dropdown-item" onClick={() => {
                                    localStorage.removeItem("username"); // Remove username from local storage
                                    localStorage.removeItem("userType");
                                    navigate("/"); // Redirect to home page
                                    window.location.reload(); // Refresh page to update UI
                                }}>Logout</span>
                            </div>
                        )}
                    </div>

                </nav>
            </div>

        </div>
    );
};

export default StaffNavigation;
