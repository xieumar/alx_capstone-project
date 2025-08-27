// src/components/DestinationSearch.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDestinations } from "../auth"; // or ../api
import DestinationCard from "./DestinationCard";

export default function DestinationSearch() {
  const [keyword, setKeyword] = useState("");

  const {
    data: destinations,
    isLoading: loadingDestinations,
    error: destinationsError,
    refetch: refetchDestinations,
  } = useQuery({
    queryKey: ["destinations", keyword],
    queryFn: () => fetchDestinations(keyword),
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = () => {
    if (keyword.trim()) refetchDestinations();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search city"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loadingDestinations && <p>Loading destinations...</p>}
      {destinationsError && (
        <p className="text-red-500">Error: {destinationsError.message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations?.map((city) => (
          <DestinationCard key={city.cityCode} city={city} />
        ))}
      </div>
    </div>
  );
}
