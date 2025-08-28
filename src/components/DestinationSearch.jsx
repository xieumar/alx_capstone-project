import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DestinationSearch() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      // Navigate to results page with keyword as query param
      navigate(`/destinations?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search city"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 p-2 border rounded w-sm bg-white placeholder-gray-500 text-black"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}
