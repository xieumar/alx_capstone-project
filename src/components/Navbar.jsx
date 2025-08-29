import React from 'react'
import { GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";
import DestinationSearch from './DestinationSearch';

function Navbar() {
  return (
    <div className=' fixed top-0 left-0 right-0 bg-white/1 backdrop-blur-sm  z-10 h-18 flex items-center justify-between px-8'>
      <div className="icon flex w-[20%] items-center gap-1 text-2xl text-[#143D60]">
        <ImLocation2 className=' text-3xl' />
        <p className=' text-black font-semibold'>Trip Planner</p>
      </div>

      <div className="searchbar w-[40%] my-auto">
        <DestinationSearch />
      </div>

      <div className="nav-links w-[35%] ml-30 flex items-center gap-8 text-black-300 ">
        {[
          { name: "Home", path: "/" },
          { name: "Explore", path: "/explore" },
          { name: "Travel Guides", path: "/guides" },
          { name: "Trip Plans", path: "/plans" },
        ].map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="relative cursor-pointer group transition-colors duration-300 hover:text-[#143D60]"
          >
            {name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#143D60] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>


      <div className="user w-[5%] flex justify-center items-centers">
        <FaRegUser />
      </div>
    </div>
  )
}

export default Navbar