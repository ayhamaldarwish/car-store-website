import { Link } from "react-router-dom";
import CarPng from "../../assets/car1.png";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 relative overflow-hidden" dir="rtl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-12">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt="سيارة"
              className="sm:scale-125 sm:-translate-x-11 max-h-[350px] drop-shadow-[4px_12px_8px_rgba(0,0,0,0.60)] rounded-xl"
            />
          </div>
          <div>
            <div className="space-y-6 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-4xl sm:text-5xl font-bold font-serif mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              >
                من نحن
              </h1>
              <p data-aos="fade-up" className="leading-relaxed tracking-wide text-gray-700 dark:text-gray-300 text-lg">
                نحن شركة متخصصة في تأجير السيارات، نقدم أفضل الخدمات بأعلى جودة وبأسعار تنافسية لتلبية جميع احتياجاتك.
              </p>
              <p data-aos="fade-up" className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                هدفنا هو راحتك ورضاك، ونسعى دائمًا لتقديم تجربة استثنائية لكل عميل.
              </p>
              <Link
                to="/about"
                data-aos="fade-up"
                className="inline-block bg-primary hover:bg-primary/90 text-black font-medium py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30"
                type="button"
              >
                المزيد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
