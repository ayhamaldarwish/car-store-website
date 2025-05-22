import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCar } from "react-icons/fa";

import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu }) => {
  const bookedCarsCount = JSON.parse(localStorage.getItem('bookedCars') || '[]').length;

  console.log("showMenu", showMenu);
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello User</h1>
            <h1 className="text-sm text-slate-500">Premium user</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id}>
                {link.startsWith('/#') ? (
                  <a href={link} className="mb-5 inline-block hover:text-primary transition-colors duration-300">
                    {name}
                  </a>
                ) : (
                  <Link to={link} className="mb-5 inline-block hover:text-primary transition-colors duration-300">
                    {name}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link 
                to="/booked-cars" 
                className="mb-5 inline-flex items-center gap-2 hover:text-primary transition-colors duration-300"
              >
                <FaCar />
                <span>السيارات المحجوزة</span>
                {bookedCarsCount > 0 && (
                  <span className="bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {bookedCarsCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1>
          Made with ❤ by <a href="https://dilshad-ahmed.github.io/" className="text-primary hover:underline">Dilshad</a>
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
