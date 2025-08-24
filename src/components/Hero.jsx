import React from "react";
import heroImage from "../assets/Hero-img.jpg";

function Hero({ user = { name: "Uriel" } }) {
  return (
    <div className="hero h-[540px] w-full bg-center bg-[length:100%] bg-no-repeat flex justify-center items-center"
    style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="text-container">
        <div className="hero-text text-stone-100 text-center">
          <h1 className=" text-4xl">Good afternoon {user.name}</h1>
          <div className="hero-btn w-[450px] h-[40px] bg-white rounded-lg flex items-center mt-4">
            <input 
            type="text px-12"
            className="w-full h-full placeholder-black px-3 border-none rounded-l-lg"
            placeholder="Location, place ....." />
            <button className="bg-[#143D60] items-center text-white rounded-r-lg h-[40px] px-4">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
