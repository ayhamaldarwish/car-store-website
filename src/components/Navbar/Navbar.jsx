import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaCar, FaUserCircle, FaEnvelope, FaUser, FaTools } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import PropTypes from "prop-types";

export const Navlinks = [
  {
    id: 1,
    name: "الرئيسية",
    link: "/",
  },
  {
    id: 2,
    name: "السيارات",
    link: "/available-cars",
  },
  {
    id: 3,
    name: "من نحن",
    link: "/about",
  },
  {
    id: 4,
    name: "الحجز",
    link: "/booking",
  },
  {
    id: 5,
    name: "تواصل معنا",
    link: "/contact-us",
  },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('registeredUser');
    if (user) {
      try {
        setRegisteredUser(JSON.parse(user));
      } catch (e) {
        console.error("Failed to parse registered user from localStorage:", e);
        localStorage.removeItem('registeredUser');
      }
    } else {
      setRegisteredUser(null);
    }

    const handleStorageChange = () => {
      const user = localStorage.getItem('registeredUser');
       if (user) {
         try {
           setRegisteredUser(JSON.parse(user));
         } catch (e) {
           console.error("Failed to parse registered user from localStorage:", e);
           localStorage.removeItem('registeredUser');
         }
       } else {
         setRegisteredUser(null);
       }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleUserIconClick = () => {
    if (registeredUser) {
      setShowUserInfo(!showUserInfo);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    localStorage.removeItem('isLoggedIn');
    setRegisteredUser(null);
    setShowUserInfo(false);
    navigate('/');
  };

  return (
    <div className="z-[50] shadow-md w-full dark:bg-black dark:text-white duration-300 fixed top-0">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-3xl font-bold font-serif">
              تأجير السيارات
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link}
                    className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              {/* DarkMode feature implement */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl cursor-pointer"
                />
              )}

              {/* Admin Dashboard Icon (Desktop) */}
              <Link
                to="/admin"
                className="relative text-2xl cursor-pointer hover:text-primary transition-colors duration-300"
                title="لوحة تحكم المسؤول"
              >
                <FaTools />
              </Link>

              {/* Booked Cars Icon */}
              <Link
                to="/booked-cars"
                className="relative text-2xl cursor-pointer hover:text-primary transition-colors duration-300"
              >
                <FaCar />
                <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {JSON.parse(localStorage.getItem('bookedCars') || '[]').length}
                </span>
              </Link>
              {/* User Icon / Info */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleUserIconClick}
                  className="text-2xl cursor-pointer hover:text-primary transition-colors duration-300 focus:outline-none"
                >
                  <FaUserCircle />
                </button>
                
                {showUserInfo && registeredUser && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-gray-800 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-600 pb-2 flex items-center gap-2"><FaUser className="text-primary" />{registeredUser.username}</p>
                    <p className="mb-4 flex items-center gap-2"><FaEnvelope className="text-primary" />{registeredUser.email}</p>
                    
                    {/* Admin Dashboard Link (inside dropdown) - Optional: Keep this if you want it in the dropdown too */}
                    <Link
                      to="/admin"
                      className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition-colors duration-300 mb-2"
                      onClick={() => setShowUserInfo(false)} // Close dropdown on click
                    >
                      لوحة تحكم المسؤول
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition-colors duration-300"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden">
            {/* dark  mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl cursor-pointer"
              />
            )}

            {/* Admin Dashboard Icon (Mobile) */}
            <Link
              to="/admin"
              className="relative text-2xl cursor-pointer hover:text-primary transition-colors duration-300"
              title="لوحة تحكم المسؤول"
            >
              <FaTools />
            </Link>

            {/* Booked Cars Icon for Mobile */}
            <Link
              to="/booked-cars"
              className="relative text-2xl cursor-pointer hover:text-primary transition-colors duration-300"
            >
              <FaCar />
              <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {JSON.parse(localStorage.getItem('bookedCars') || '[]').length}
              </span>
            </Link>
            {/* Login Icon for Mobile */}
            <div className="relative">
              <button
                type="button"
                onClick={handleUserIconClick}
                className="text-2xl cursor-pointer hover:text-primary transition-colors duration-300 focus:outline-none"
              >
                <FaUserCircle />
              </button>
              {/* User Info Dropdown for Mobile - Can reuse the same state and structure or simplify */}
              {showUserInfo && registeredUser && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-bold text-gray-800 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-600 pb-2 flex items-center gap-2"><FaUser className="text-primary" />{registeredUser.username}</p>
                  <p className="mb-4 flex items-center gap-2"><FaEnvelope className="text-primary" />{registeredUser.email}</p>
                   {/* Admin Dashboard Link (inside dropdown) - Optional: Keep this if you want it in the dropdown too */}
                   <Link
                     to="/admin"
                     className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition-colors duration-300 mb-2"
                     onClick={() => setShowUserInfo(false)} // Close dropdown on click
                   >
                     لوحة تحكم المسؤول
                   </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition-colors duration-300"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Navbar;
