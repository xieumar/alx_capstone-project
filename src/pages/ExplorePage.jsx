// src/pages/ExplorePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import fallbackDestinations from "../data/fallbackDestinations";

function ExplorePage() {
  return (
    <div className="explore-page my-[80px] flex flex-col gap-6 w-full p-4 my-12">
      <div className="section-title w-full">
        <div className="text flex flex-col text-center mb-6">
          <p className="text-[#143D60] font-bold">EXPLORE</p>
          <h1 className="text-4xl font-semibold">Explore Destinations</h1>
        </div>
      </div>

      <div className="card-container flex justify-center items-center flex-wrap gap-6">
        {fallbackDestinations.map((city, index) => (
          <div
            key={index}
            className="card relative shadow-lg rounded-xl overflow-hidden
                      transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-[250px] h-[350px] object-cover rounded-xl"
            />
            <h3 className="text-lg font-semibold absolute bottom-2 left-3 px-2 text-stone-50 drop-shadow-md">
              {city.name}
            </h3>

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#143D60]/60 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 flex items-center justify-center">
              <Link to={`/destination/${city.name}`}>
                <p className="relative px-6 py-2 text-white text-lg font-semibold cursor-pointer transition-colors duration-300 group">
                  Explore {city.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all ease-in duration-300 group-hover:w-full"></span>
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
