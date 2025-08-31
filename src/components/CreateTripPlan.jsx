import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DatePicker, Input, Button, TimePicker, Select } from "antd";
import useTripStore from "../store/tripStore";
import moment from "moment";

const { RangePicker } = DatePicker;

function CreateTripPlan() {
  const { cityName } = useParams();
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([]);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);

  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState(null);
  const [activityTime, setActivityTime] = useState(null);
  const [activityNotes, setActivityNotes] = useState("");

  const addTrip = useTripStore((state) => state.addTrip);

  useEffect(() => {
    if (cityName) setDestination(decodeURIComponent(cityName));
  }, [cityName]);

  const handleAddActivity = () => {
    if (!activityName || !activityDate || !activityTime) return;

    setActivities((prev) => [
      ...prev,
      {
        name: activityName,
        date: activityDate.format("YYYY-MM-DD"),
        time: activityTime.format("HH:mm"),
        notes: activityNotes,
      },
    ]);

    setActivityName("");
    setActivityDate(null);
    setActivityTime(null);
    setActivityNotes("");
  };

  const handleCreateTrip = () => {
    if (!tripName || !destination || dates.length !== 2) return;

    const newTrip = {
      id: Date.now(),
      name: tripName,
      destination,
      startDate: dates[0].format("YYYY-MM-DD"),
      endDate: dates[1].format("YYYY-MM-DD"),
      flights,
      hotels,
      activities,
    };

    addTrip(newTrip);


    setTripName("");
    setDestination(cityName ? decodeURIComponent(cityName) : "");
    setDates([]);
    setFlights([]);
    setHotels([]);
    setActivities([]);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 max-w-lg mx-auto shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Create Trip Plan</h2>

      <Input
        placeholder="Trip Name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
      />

      <Input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <RangePicker
        value={dates}
        onChange={(vals) => setDates(vals || [])}
        className="w-full"
      />

     
      <Button
        type="dashed"
        onClick={() =>
          setFlights((prev) => [
            ...prev,
            { airline: "", price: "", currency: "USD", origin: "", destination: "", departureDate: "", arrivalDate: "" },
          ])
        }
      >
        Add Flight
      </Button>

      <Button
        type="dashed"
        onClick={() =>
          setHotels((prev) => [
            ...prev,
            { name: "", price: "", currency: "USD", checkIn: "", checkOut: "", address: "" },
          ])
        }
      >
        Add Hotel
      </Button>

      
      <h3 className="font-semibold mt-4">Add Activity</h3>
      <Input
        placeholder="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        className="mb-2"
      />
      <DatePicker
        placeholder="Activity Date"
        value={activityDate}
        onChange={(val) => setActivityDate(val)}
        className="mb-2 w-full"
      />
      <TimePicker
        placeholder="Activity Time"
        value={activityTime}
        onChange={(val) => setActivityTime(val)}
        className="mb-2 w-full"
      />
      <Input
        placeholder="Notes"
        value={activityNotes}
        onChange={(e) => setActivityNotes(e.target.value)}
        className="mb-2"
      />
      <Button type="dashed" block onClick={handleAddActivity}>
        Add Activity
      </Button>

   
      {activities.length > 0 && (
        <ul className="mt-2 list-disc pl-5">
          {activities.map((act, idx) => (
            <li key={idx}>
              {act.date} {act.time} – {act.name} ({act.notes})
            </li>
          ))}
        </ul>
      )}

      <Button type="primary" block onClick={handleCreateTrip} className="mt-4">
        Save Trip
      </Button>
    </div>
  );
}

export default CreateTripPlan;
