import React from "react";
import { useParams } from "react-router-dom";
import CreateTripPlan from "../components/CreateTripPlan";

const TripPlanner = () => {
  const { cityName } = useParams();

  return (
    <div className="p-6 text-center mt-20">
      <h1 className="text-3xl font-bold">
        Trip Planner for {decodeURIComponent(cityName)}
      </h1>
      <p className="mt-2 text-gray-600">
        Let’s create your personalized plan for {decodeURIComponent(cityName)}.
      </p>

      <div className="mx-auto mt-3">
        <CreateTripPlan cityName={decodeURIComponent(cityName)} />
      </div>
    </div>
  );
};

export default TripPlanner;
