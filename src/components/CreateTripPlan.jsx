import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DatePicker, Input, Button, TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import useTripStore from "../store/tripStore";
import moment from "moment";

const { RangePicker } = DatePicker;

function CreateTripPlan() {
  const { cityName } = useParams();
  const addTrip = useTripStore((state) => state.addTrip);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (cityName) {
      formInitialValues.destination = decodeURIComponent(cityName);
    }
  }, [cityName]);

  const formInitialValues = {
    tripName: "",
    destination: cityName ? decodeURIComponent(cityName) : "",
    dates: [],
    flights: [],
    hotels: [],
  };

  const handleAddActivity = (activity) => {
    setActivities((prev) => [...prev, activity]);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 max-w-lg mx-auto bg-blue-100 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Create Trip Plan</h2>

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values, { resetForm }) => {
          const newTrip = {
            id: Date.now(),
            name: values.tripName,
            destination: values.destination,
            startDate: values.dates[0].format("YYYY-MM-DD"),
            endDate: values.dates[1].format("YYYY-MM-DD"),
            flights: values.flights,
            hotels: values.hotels,
            activities,
          };

          addTrip(newTrip);
          alert("Trip saved successfully!");
          resetForm();
          setActivities([]);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-y-3">
            <Field name="tripName">
              {({ field }) => <Input placeholder="Trip Name" {...field} />}
            </Field>

            <Field name="destination">
              {({ field }) => <Input placeholder="Destination" {...field} />}
            </Field>

            <RangePicker
              value={values.dates}
              onChange={(dates) => setFieldValue("dates", dates || [])}
              className="w-full"
            />

            <Button
              type="dashed"
              onClick={() =>
                setFieldValue("flights", [
                  ...values.flights,
                  {
                    airline: "",
                    price: "",
                    currency: "USD",
                    origin: "",
                    destination: "",
                    departureDate: "",
                    arrivalDate: "",
                  },
                ])
              }
            >
              Add Flight
            </Button>

            <Button
              type="dashed"
              onClick={() =>
                setFieldValue("hotels", [
                  ...values.hotels,
                  {
                    name: "",
                    price: "",
                    currency: "USD",
                    checkIn: "",
                    checkOut: "",
                    address: "",
                  },
                ])
              }
            >
              Add Hotel
            </Button>

            <ActivityForm onAdd={handleAddActivity} />

            {activities.length > 0 && (
              <ul className="mt-2 list-disc pl-5">
                {activities.map((act, idx) => (
                  <li key={idx}>
                    {act.date} {act.time} – {act.name} ({act.notes})
                  </li>
                ))}
              </ul>
            )}

            <Button type="primary" block htmlType="submit">
              Save Trip
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Separate Activity form for adding activities
function ActivityForm({ onAdd }) {
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState(null);
  const [activityTime, setActivityTime] = useState(null);
  const [activityNotes, setActivityNotes] = useState("");

  const handleAdd = () => {
    if (!activityName || !activityDate || !activityTime) return;

    onAdd({
      name: activityName,
      date: activityDate.format("YYYY-MM-DD"),
      time: activityTime.format("HH:mm"),
      notes: activityNotes,
    });

    setActivityName("");
    setActivityDate(null);
    setActivityTime(null);
    setActivityNotes("");
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Add Activity</h3>
      <Input
        placeholder="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        className="mb-2"
      />
      <DatePicker
        placeholder="Activity Date"
        value={activityDate}
        onChange={setActivityDate}
        className="mb-2 w-full"
      />
      <TimePicker
        placeholder="Activity Time"
        value={activityTime}
        onChange={setActivityTime}
        className="mb-2 w-full"
      />
      <Input
        placeholder="Notes"
        value={activityNotes}
        onChange={(e) => setActivityNotes(e.target.value)}
        className="mb-2"
      />
      <Button type="dashed" block onClick={handleAdd}>
        Add Activity
      </Button>
    </div>
  );
}

export default CreateTripPlan;
