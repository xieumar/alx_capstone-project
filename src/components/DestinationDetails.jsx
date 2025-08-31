import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel, Button } from "antd";
import LoadingPage from "./Loading";
import {
  getDestinationDetails,
  getFlightsFromServer,
  getHotelsFromServer,
} from "../auth";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function DestinationDetails() {
  const { cityName } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        setLoading(true);

        // 1️⃣ Main city details
        const data = await getDestinationDetails(cityName);
        setDetails(data);

        // 2️⃣ Fetch flights and hotels concurrently if cityCode exists
        let flights = [];
        let hotels = [];
        if (data.cityCode) {
          [flights, hotels] = await Promise.all([
            getFlightsFromServer(data.cityCode),
            getHotelsFromServer(data.cityCode),
          ]);
        }

        setDetails((prev) => ({
          ...prev,
          flights,
          hotels,
        }));

        
        const loadedSlides = await Promise.all(
          data.images.map(
            (src) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => resolve(src);
              })
          )
        );
        setSlides(loadedSlides);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [cityName]);

  if (loading) return <LoadingPage cityName={cityName} />;
  if (!details) return <p className="text-center mt-10">No details found.</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 my-[70px] px-8">
    
      <div className="lg:w-2/3 flex flex-col gap-6">
        <h1 className="text-4xl font-semibold -mb-2 mt-2">{details.name}</h1>

        {slides.length > 0 ? (
          <Carousel autoplay className="rounded-lg overflow-hidden">
            {slides.map((img, idx) => (
              <div key={idx} className="w-full h-[70vh] flex justify-center items-center overflow-hidden rounded-lg">
                <img
                  src={`${img}?w=1080&auto=format&fit=crop`}
                  alt={`${cityName} ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center mt-10">Loading images...</p>
        )}

        <p className="text-gray-700 text-justify">{details.description}</p>

        {details.guideLink && (
          <div className="button">
            <a
              href={details.guideLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-10 py-2 border-2 border-[#143D60] text-[#143D60] bg-transparent rounded-md overflow-hidden transition-all duration-500 z-10 group inline-block"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
                Read Full Guide
              </span>
              <span className="absolute top-0 left-0 w-0 h-full bg-[#143D60] transition-all duration-500 group-hover:w-full z-0"></span>
            </a>
          </div>
        )}

        {details.attractions?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-5 border-b-2 inline-block pb-1">Top Attractions</h2>
            <ul className="flex flex-wrap gap-3 gap-y-4">
              {details.attractions.slice(0, 12).map((attraction, idx) => (
                <li key={idx}>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(attraction)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#143D60] font-medium px-3 py-1 border border-[#143D60] border-[2px] rounded-lg hover:bg-[#143D60] hover:text-white transition-colors duration-300"
                  >
                    {attraction}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex gap-4">
          <h1 className="text-2xl font-semibold mb-4">
            Does {details.name} look like a great trip destination?
          </h1>
          <Link to={`/trip-planner/${encodeURIComponent(details.name)}`}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate(`/trip-planner/${details.name}`)}
            >
              Plan Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Right column */}
      <div className="map mt-16 lg:w-1/3 flex flex-col gap-y-6">
        {details.coordinates && (
          <div className="map h-[50vh]">
            <MapContainer center={[details.coordinates.lat, details.coordinates.lng]} zoom={12} className="h-full w-full rounded-xl">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
              <Marker position={[details.coordinates.lat, details.coordinates.lng]}>
                <Popup>{details.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {details.weather && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Weather</h2>
            <p>{details.weather.description}, {details.weather.temp}°C</p>
          </div>
        )}

        {/* Flights */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Flights</h2>
          {details.flights?.length > 0 ? (
            <ul>
              {details.flights.map((f, idx) => (
                <li key={idx}>{f.airline} – {f.price} {f.currency}</li>
              ))}
            </ul>
          ) : (
            <p>No flights available</p>
          )}
        </div>

        {/* Hotels */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Hotels</h2>
          {details.hotels?.length > 0 ? (
            <ul>
              {details.hotels.map((h, idx) => (
                <li key={idx}>{h.name} – {h.price} {h.currency}</li>
              ))}
            </ul>
          ) : (
            <p>No hotels available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;
