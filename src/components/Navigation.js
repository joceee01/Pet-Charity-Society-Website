import logoLight from "../images/logo-light.png";
import logoDark from "../images/logo-dark.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
    const username = JSON.parse(localStorage.getItem("username"));
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);

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

    const handleRedirectLink = (location) => {
        let url = `/${location}`; // Default URL without username

        if (username) {
            url = `/${location}?username=${username}`; // Include username if it's valid
        }

        navigate(url);
        setDropdownOpen(false); // Close dropdown after clicking
        setMenuOpen(!menuOpen);
    };

    const goToSection = (page, id) => {
        let url = `/#${id}`; // Default URL without username

        if (username) {
            url = `/?username=${username}#${id}`; // Include username if it's valid
        }
        navigate(url);
        setDropdownOpen(false); // Close dropdown after clicking
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sliderHeight = document.querySelector('.image-slider')?.offsetHeight || 300;
            if (window.scrollY >= sliderHeight) {
                // Change navbar when past the slider
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        handleScroll();

        if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            setScrolled(true);
        }
    }, [location]);

    return (
        <div className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
            <div className="logo">
                <img src={scrolled ? logoDark : logoLight} alt="Logo" onClick={() => handleRedirectLink("")} />
            </div>

            <div className={`responsive-nav ${scrolled ? "scrolled" : ""}`}>
                <div className={`toggle-container ${scrolled ? "scrolled" : ""}`}>
                    <button className={`menu-toggle ${scrolled ? "scrolled" : ""}`} onClick={toggleMenu}>
                        ☰
                    </button>
                </div>

                <div>
                    <nav className={`navbar ${menuOpen ? "open" : ""} ${scrolled ? "scrolled" : ""}`}>
                        <div>
                            <span className={`nav-link ${location.hash === "#about-us" ? "active" : ""}`} onClick={() => goToSection("", "about-us")}>About Us</span>
                        </div>

                        {/* Services Dropdown */}
                        <div
                            className="dropdown"
                            onMouseEnter={!isMobile ? () => setDropdownOpen(true) : null}
                            onMouseLeave={!isMobile ? () => setDropdownOpen(false) : null}
                        >
                            <button className={`dropbtn ${scrolled ? "scrolled" : ""}`} onClick={isMobile ? toggleDropdown : null}>
                                Services <i className="fa fa-caret-down" style={{ paddingLeft: "10px" }}></i>
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-content">
                                    <span className={`dropdown-nav-link ${location.pathname === "/adopt-pet" ? "active" : ""}`} onClick={() => handleRedirectLink("adopt-pet")}>Adopt a Pet</span>
                                    <span className={`dropdown-nav-link ${location.pathname === "/release-pet" ? "active" : ""}`} onClick={() => handleRedirectLink("release-pet")}>Release Pet</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <span className={`nav-link ${location.pathname === "/check-status" ? "active" : ""}`} onClick={() => handleRedirectLink("check-status")}>Check Status</span>
                        </div>

                        <div>
                            <span className={`nav-link ${location.hash === "#contact-us" ? "active" : ""}`} onClick={() => goToSection("", "contact-us")}>Contact Us</span>
                        </div>

                        {/* User Profile Dropdown */}
                        <div
                            className="dropdown"
                            onMouseEnter={!isMobile ? () => setProfileDropdownOpen(true) : null}
                            onMouseLeave={!isMobile ? () => setProfileDropdownOpen(false) : null}
                        >
                            <button className={`dropbtn ${scrolled ? "scrolled" : ""}`} onClick={isMobile ? toggleProfileDropdown : null}>
                                <i className="fa-solid fa-user"></i>
                            </button>
                            {profileDropdownOpen && (
                                <div className="dropdown-content">
                                    {username ? (
                                        <>
                                            <span className="dropdown-item" onClick={() => handleRedirect(`/user-management?username=${username}`)}>Account Management</span>
                                            <span className="dropdown-item" onClick={() => {
                                                localStorage.removeItem("username"); // Remove username from local storage
                                                localStorage.removeItem("userType");
                                                navigate("/"); // Redirect to home page
                                                window.location.reload(); // Refresh page to update UI
                                            }}>Logout</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="dropdown-item" onClick={() => handleRedirect("/login")}>Member Login</span>
                                            <span className="dropdown-item" onClick={() => handleRedirect("/signup")}>Register</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                    </nav>
                </div>

            </div>

        </div>
    );
};

export default Navigation;
