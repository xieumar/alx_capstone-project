import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/Hero-img.jpg";

function Hero() {
  return (
    <section
      className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-400/20" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-12 w-full max-w-full">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Discover the Art of <br />
          <span className="text-blue-200 border-b-4 sm:border-b-8 border-blue-200 pb-1">
            Easy
          </span>{" "}
          Travel
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        >
          Explore cities, find vibes, and get inspired for your next adventure.
        </motion.p>

        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        >
          <button className="relative px-6 sm:px-8 py-2 sm:py-3 border-2 border-white text-white rounded-lg overflow-hidden group">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#143D60]">
              Learn More
            </span>
            <span className="absolute top-0 left-0 w-0 h-full bg-white transition-all duration-500 group-hover:w-full z-0"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
