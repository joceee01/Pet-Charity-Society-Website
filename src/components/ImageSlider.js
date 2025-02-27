import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
    const slides = [
        {
          src: "../images/slide-img-3.jpg",
          title: "Adopt, Release Animal",
          description: "Give abandoned pets a second chance at a loving home.",
          align: "right"
        },
        {
          src: "../images/slide-img-2.png",
          title: "Support Animal Welfare",
          description: "Every donation helps feed and shelter rescued animals.",
          align: "left"
        }
      ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="image-slider"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.src} alt={`Slide ${index + 1}`} className="slider-image" />
          <div className={`slider-text ${slide.align}`}>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
