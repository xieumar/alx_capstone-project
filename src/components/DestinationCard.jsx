// DestinationCard.jsx
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCityImage } from "../auth";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

export default function DestinationCard({ city, index = 0 }) {
  const { data: imageUrl, isLoading, isError } = useQuery({
    queryKey: ["cityImage", city.name],
    queryFn: () => fetchCityImage(city.name),
    staleTime: 1000 * 60 * 60,
  });

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="relative shadow-lg rounded-xl overflow-hidden cursor-pointer group w-full max-w-[250px] sm:max-w-[300px] md:max-w-[320px] mx-auto"
    >
      <div className="w-full aspect-[5/7] flex items-center justify-center bg-gray-200">
        {isLoading ? (
          <div className="animate-pulse w-full h-full bg-gray-300 rounded-xl" />
        ) : isError || !imageUrl ? (
          <p className="text-gray-600 font-semibold text-center px-2 sm:px-4">
            Oops! {city.name} not found 😢
          </p>
        ) : (
          <img
            src={imageUrl}
            alt={city.name}
            className="w-full h-full object-cover rounded-xl"
          />
        )}
      </div>

      {imageUrl && !isError && (
        <>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold absolute top-[70%] sm:top-[55%] left-2 sm:left-3 px-1 sm:px-2 text-white drop-shadow-md">
            {city.name}
          </h3>

          {city.attractions?.length > 0 && (
            <ul className="absolute bottom-4 left-2 sm:left-3 px-1 sm:px-2 text-xs sm:text-sm md:text-base text-white drop-shadow-md list-disc list-inside max-w-[90%]">
              {city.attractions.map((attr, idx) => (
                <li key={idx}>{attr}</li>
              ))}
            </ul>
          )}

          <div className="absolute inset-0 bg-[#143D60]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link to={`/destination/${city.name.toLowerCase()}`}>
              <p className="relative px-2 sm:px-4 py-1 sm:py-2 text-white text-sm sm:text-base font-semibold cursor-pointer transition-colors duration-300 group">
                Explore {city.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all ease-in duration-300 group-hover:w-full"></span>
              </p>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}
