import { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import PropTypes from "prop-types";

const Hero = ({ theme }) => {
  useEffect(() => {
    AOS.refresh();
  });
  return (
    <div className="dark:bg-black dark:text-white duration-300 relative overflow-hidden" dir="rtl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container min-h-[620px] flex relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent dark:from-primary/20 rounded-full blur-3xl animate-pulse" />
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt="سيارة"
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] transform transition-all duration-500 hover:scale-110 hover:rotate-1"
            />
          </div>
          <div className="space-y-6 order-2 sm:order-1 sm:pr-32">
            <p 
              data-aos="fade-up" 
              className="text-primary text-2xl font-serif font-medium tracking-wide"
            >
              استأجر سيارتك بسهولة
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-bold font-serif bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent leading-tight"
            >
              تأجير السيارات
            </h1>
            <p 
              data-aos="fade-up" 
              data-aos-delay="1000" 
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl"
            >
              استمتع بتجربة تأجير سيارات سهلة وسريعة مع أفضل الأسعار والخدمات المميزة. اختر سيارتك الآن وانطلق بثقة!
            </p>
            <Link
              to="/available-cars"
              data-aos="fade-up"
              data-aos-delay="1500"
              className="rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 py-4 px-10 text-black font-medium shadow-lg hover:shadow-primary/30 hover:scale-105 transform inline-block text-lg"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Hero;
