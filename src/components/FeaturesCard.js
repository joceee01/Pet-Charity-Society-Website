import { motion } from "framer-motion";

const cardData = [
    {
        title: "PET ADOPTION",
        description: "We connect pets with caring families, ensuring they find a safe and happy forever home.",
        src: "../images/pet-adopt.gif",
    },
    {
        title: "PET RELEASE",
        description: "We provide a responsible and ethical way for pet owners to surrender pets when they can no longer care for them.",
        src: "../images/cat-release.gif",
    },
    {
        title: "HEALTH & REHABILITATION",
        description: "Every pet in our care receives proper medical attention, vaccinations, and behavioral support.",
        src: "../images/health.gif",
    },
    {
        title: "COMMUNITY AWARENESS",
        description: "We educate and promote responsible pet ownership to reduce abandonment and improve animal welfare.",
        src: "../images/awareness.gif",
    },
];

export default function FeaturesCard() {
    return (
        <div className="row card-container">
            {cardData.map((card, index) => (
                <div key={index} className="col-lg-3 col-sm-2 col-12 card-content">
                    <div className="card-header">
                        <img src={card.src} />
                        <h3 className="text-lg">{card.title}</h3>
                    </div>
                    <div className="card-body">
                        <p className="text-sm">{card.description}</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "transparent", color: "#00c2cb", fontWeight: "bold" }}
                        whileTap={{ scale: 0.9 }}
                        className="card-button transition mt-4"
                        >
                        <span>LEARN MORE &gt;&gt;</span>
                    </motion.button>
                </div>

            ))}
        </div>
    );
}
