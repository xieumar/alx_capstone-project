import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaRegUser, FaBars } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";
import DestinationSearch from "./DestinationSearch";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Travel Guides", path: "/guides" },
    { name: "Trip Plans", path: "/plans" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-sm z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
       
        <div className="flex items-center gap-2 text-2xl text-[#143D60]">
          <ImLocation2 className="text-3xl" />
          <p className="font-semibold text-black">Trip Planner</p>
        </div>

      
        <div className="hidden lg:flex md:w-2/5">
          <DestinationSearch />
        </div>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="relative cursor-pointer group transition-colors duration-300 hover:text-[#143D60]"
            >
              {name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#143D60] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <FaRegUser className="text-xl cursor-pointer" />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4 ">
          <FaRegUser className="text-xl cursor-pointer" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-300/20 shadow-md px-4 py-3 flex flex-col gap-3">
          <DestinationSearch />
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-2 text-black text-center font-medium rounded transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
