import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DestinationSearch({ onSearchComplete }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/destinations?keyword=${encodeURIComponent(keyword)}`);
    }

     if (onSearchComplete) onSearchComplete();
  };
   
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex">
        <input
          type="text"
          placeholder="Search city"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        className="flex-1 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-[#143D60]/20 placeholder-black/70 text-black focus:outline-none focus:ring-2 focus:ring-[#143D60] transition-all"

        />
      </div>
    </div>
  );
}
