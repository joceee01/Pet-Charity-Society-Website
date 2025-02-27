import AboutImg from "../images/about4.jpg";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import FeaturesCard from "../components/FeaturesCard";
import AdoptPetComponent from "../components/AdoptPet";
import Footer from "../components/Footer";


const Home = () => {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const offset = 100; // Adjust the margin from the top
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <ImageSlider />

      <div id="about-us" className="about-us">
        <div className="row">
          <div className="col-lg-6 col-12 order-md-1 order-sm-1 order-2 about-body">
            <h4>About Us 🐾</h4>
            <h2>Pet Heaven - Love & Adopt</h2>
            <p>Welcome to Pet Heaven, dedicated to the welfare of abandoned pets. <br /><br />
              Our mission is to provide a safe haven for cats and dogs that have been left without a home,
              ensuring they receive the care, love, and medical attention they deserve.
              At Pet Heaven, we bridge the gap between these vulnerable animals and kind-hearted individuals looking to adopt a furry companion.
              Through our intuitive online platform, visitors can easily submit adoption requests or responsibly release a pet they can no longer care for.
              With a strong commitment to animal welfare, we work closely with shelters and volunteers to give every pet a second chance at a happy life.
              Join us in making a difference—because every pet deserves a loving home.</p>
          </div>
          <div className="col-lg-6 col-12 order-md-2 order-sm-2 order-1 about-body">
            <img src={AboutImg} />
          </div>
        </div>
      </div>
      <div className="features">
      <FeaturesCard />
      </div>

      <div id="home-adopt-pet" className="home-adopt-pet">
        <h4>Ready to Adopt?</h4>
        <p>Explore pets that are available for adoption!</p>
        <div className="adopt-container">
          <AdoptPetComponent />
        </div>
      </div>

      <div id="release-pet" className="release-pet">
        {/* <img src="../../images/release-pet.jpg" /> */}
        <div className="row">
          <div className="col-lg-6 col-12 text-center">
            <img src="../../images/release-pet-normal.jpg" />
          </div>
          <div className="col-lg-6 col-12 release-content">
            <h2>Looking for a new home for your pet?</h2>
            <p>Releasing a pet is a life-changing decision for both you and the pet. 
              Always prioritize the pet’s well-being and take responsible actions to ensure they find a safe, loving home.</p>
            <button className="release-btn" onClick={() => navigate(`/release-pet?username=${username}`)}>
              <span>Release Pets</span>
            </button>
          </div>
        </div>
      </div>

      <div id="contact-us" className="contact-us">
        <div className="row contact-us-body">
          <div className=" contact-us-content col-lg-6 col-12">
            <h4>Contact Us</h4>
            <p>If you have any questions or enquiries,
              please don't hesitate to send us a message and we will try our best to get back to you shortly.</p>
            <p>
              <i className="fa-solid fa-envelope"></i> Email Us: enquiries@petheaven.org.sg
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> Call Us: +65 6543 2103
            </p>
            <p>
              <i className="fa-solid fa-map-pin" style={{ paddingRight: "15px" }}></i> Visit Us: 123 Pet Heaven Road Singapore 567890
            </p>
            <p>
              <i className="fa-solid fa-info-circle"></i> Operation Hours: Monday to Friday, 9am to 6pm
            </p>
          </div>

          <div className="col-lg-6 col-12">
            <div className="form-container">
              <h2>Send us an Enquiry</h2>
              <div className="col-12">
                <label className="label-style">Name:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-address-card"></i>
                  <input type="text" id="name" name="name" />
                </div>
              </div>
              <div className="col-12">
                <label className="label-style">Email:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="text" id="email" name="email" />
                </div>
              </div>
              <div className="col-12">
                <label className="label-style">Contact Number:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-phone"></i>
                  <input type="text" id="phone" name="phone" />
                </div>
              </div>
              <div className="col-12">
                <label className="label-style">Enquiry Type:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-question-circle"></i>
                  <select>
                    <option>General Enquiry</option>
                    <option>Adoption</option>
                    <option>Pet Release</option>
                  </select>
                </div>
              </div>
              <div className="col-12">
                <label className="label-style">Message:</label>
                <div className="input-icon">
                  <textarea type="text" id="message" name="message" placeholder="Please type your message here" style={{backgroundColor : "transparent"}} />
                </div>
              </div>
              <div className="col-12">
                <button className="contact-btn"><i className="fa fa-paper-plane"></i> Send Message</button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div style={{ width: "100%", height: "600px", overflow: "hidden", borderRadius: "10px" }}>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14355.37101531275!2d103.85195963955078!3d1.2902701795093074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da190f62f3f3c5%3A0x1c1e1c3a4b1e1e1d!2sSingapore!5e0!3m2!1sen!2s!4v1617662057316"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
