import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDestinations } from "../auth";
import DestinationCard from "../components/DestinationCard";
import Loading from "../components/Loading";

export default function DestinationsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword") || "";

  const { data: destinations, isLoading, error } = useQuery({
    queryKey: ["destinations", keyword],
    queryFn: () => fetchDestinations(keyword),
    enabled: !!keyword,
  });

  return (
    <div className="mt-[50px] p-4 max-w-5xl mx-auto">

      {isLoading && <Loading />}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations?.map((city) => (
          <DestinationCard key={city.cityCode} city={city} />
        ))}
      </div>
    </div>
  );
}
