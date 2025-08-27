import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCityImage } from "../auth";

export default function DestinationCard({ city }) {
  const { data: imageUrl, isLoading } = useQuery({
    queryKey: ["cityImage", city.name],
    queryFn: () => fetchCityImage(city.name),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 flex flex-col">
      {/* City Image */}
      <div className="h-40 w-full bg-gray-200 relative">
        {isLoading ? (
          <div className="animate-pulse w-full h-full bg-gray-300" />
        ) : imageUrl || city.image ? (
          <img
            src={imageUrl || city.image}
            alt={city.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
            No Image
          </div>
        )}
      </div>

      {/* City Info */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-bold text-lg">{city.name}</h3>
        <p className="text-gray-600 mb-2">{city.country}</p>

        {/* Attractions */}
        {city.attractions?.length > 0 && (
          <ul className="list-disc list-inside text-sm text-gray-700 mt-auto">
            {city.attractions.map((attr, idx) => (
              <li key={idx}>{attr}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
