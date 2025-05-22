import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";

const FooterLinks = [
  {
    title: "الرئيسية",
    link: "/",
  },
  {
    title: "السيارات المتاحة",
    link: "/available-cars",
  },
  {
    title: "من نحن",
    link: "/about",
  },
  {
    title: "الحجز",
    link: "/booking",
  },
  {
    title: "تواصل معنا",
    link: "/contact-us",
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 mt-14 py-10 text-black dark:text-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold font-serif">
              تأجير السيارات
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              نحن نقدم أفضل خدمات تأجير السيارات مع ضمان الجودة والموثوقية. هدفنا هو راحتك ورضاك وتوفير تجربة لا تُنسى.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-primary inline-block pb-1">
              روابط سريعة
            </h2>
            <ul className="space-y-2">
              {FooterLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.link}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary transition duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-primary inline-block pb-1">
              تواصل معنا
            </h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>info@carrental.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMobileAlt className="text-primary" />
                <span>+90 5396700366</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationArrow className="text-primary" />
                <span>اسطنبول، تركيا</span>
              </div>
            </div>
          </div>

          {/* Social Media (Optional Fourth Column or below) */}
          <div className="space-y-4">
             <h2 className="text-xl font-semibold mb-3 border-b-2 border-primary inline-block pb-1">
              تابعنا
            </h2>
            <div className="flex items-center gap-4">
              <Link to="https://www.instagram.com/" className="text-gray-600 dark:text-gray-300 hover:text-primary transition duration-300">
                <FaInstagram size={24} />
              </Link>
              <Link to="https://www.facebook.com/" className="text-gray-600 dark:text-gray-300 hover:text-primary transition duration-300">
                <FaFacebook size={24} />
              </Link>
              <Link to="https://www.linkedin.com/" className="text-gray-600 dark:text-gray-300 hover:text-primary transition duration-300">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} تأجير السيارات. جميع الحقوق محفوظة.
        </div>
      </div>
    </div>
  );
};

export default Footer;
