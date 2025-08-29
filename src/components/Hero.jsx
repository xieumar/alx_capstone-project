import React from "react";
import heroImage from "../assets/Hero-img.jpg";
import DestinationSearch from "./DestinationSearch";

function Hero({ user = { name: "Uriel" } }) {
  return (
    <div className="hero h-[540px] w-full bg-center bg-[length:100%] bg-no-repeat flex justify-center items-center"
    style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="text-container">
        <div className="hero-text text-stone-100 text-center">
          <h1 className=" text-4xl">Good afternoon {user.name}</h1>
          
        </div>
      </div>
    </div>
  );
}

export default Hero;
