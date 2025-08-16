import React from 'react'
import locationIcon from '../assets/location.png'
import { GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

function Navbar() {
  return (
    <div className=' fixed top-0 left-0 right-0 bg-white/1 backdrop-blur-sm  z-10 h-18 flex items-center justify-between px-8'>
      <div className="icon flex w-[20%] items-center gap-2">
        <img src={locationIcon} alt="icon" />
        <p className='text-2xl'>Trip Planner</p>
      </div>

      <div className="searchbar w-[45%] relative">
        <input 
          type="text" 
          placeholder='Search for a destination' 
          className='w-full h-10 px-8 border placeholder-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900'
        />
        <div className="search-icon absolute left-2 top-1/2 transform -translate-y-1/2 text-black-500">
            <GoSearch />
        </div>
      </div>

        <div className="nav-links w-[35%] ml-30 flex items-center gap-8 text-black-300 ">
            {["Home", "Travel Guides", "Explore", "Trip Plans"].map((link) => (
                <p
                key={link}
                className="relative cursor-pointer group transition-colors duration-300 hover:text-blue-800"
                >
                {link}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
                </p>
            ))}
        </div>


      <div className="user w-[5%] flex justify-center items-centers">
        <FaRegUser />
      </div>
    </div>
  )
}

export default Navbar
