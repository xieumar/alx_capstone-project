import React from "react";
import heroImage from "../assets/Hero-img.jpg";

function Hero() {
  return (
    <div
      className="relative h-[95vh] w-full bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay for sleek readability */}
      <div className="absolute inset-0 bg-blue-400/20" />

      {/* Content */}
      <div className="relative text-center text-stone-100 max-w-2xl px-6">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight drop-shadow-lg">
         Discover the Art of <br /> <span className=" text-blue-200 pb-1 border-b-[6px] border-b-blue-200 ">Easy</span> Travel
        </h1>
        <p className="mt-8 text-lg md:text-xl font-semibold leading-relaxed">
          Explore cities, find vibes, and get inspired for your next adventure.
        </p>

        {/* Button */}
        <div className="mt-7 flex justify-center">
          <button className="relative px-8 py-3 border-2 border-white text-white rounded-lg overflow-hidden transition-all duration-500 z-10 group">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#143D60]">
              Learn More
            </span>
            <span className="absolute top-0 left-0 w-0 h-full bg-white transition-all duration-500 group-hover:w-full z-0"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
