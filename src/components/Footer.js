import LogoImg from "../images/logo-light.png";

export default function Footer() {
    return (
        <div className="footer">
            <div className="row">
                <div className="footer-row col-md-4 col-12">
                    <img src={LogoImg} style={{ width: "190px" }} /><br />
                    <p>
                        A Trusted Charity Society at your fingertip. <br />
                        ISIT207 Assignment 3
                    </p>
                </div>
                <div className="footer-row col-md-4 col-12">
                    <h4>Services</h4>
                    <p>Adopt a Pet</p>
                    <p>Release Pet</p>
                    <p>Check Status</p>
                </div>
                <div className="footer-row col-md-4 col-12">
                    <h4>Contact</h4>
                    <p>Email: enquiries@petheaven.org.sg</p>
                    <p>Phone: +65 6543 2103</p>
                </div>
                <div className="footer-row-2 col-12" style={{ marginTop: "20px" }}>
                    <span>Terms of Service &emsp; Privacy Policy</span>
                </div>
                <div className="footer-row-3 col-12" style={{ marginTop: "20px" }}>
                    <span>&copy; Jocelyn 2025 Pet Heaven <i className="fa fa-paw"></i> - All Rights Reserved.</span>
                </div>
            </div>
        </div>
    );
}
