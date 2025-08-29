import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel } from "antd";
import LoadingPage from "./Loading";
import { getDestinationDetails } from "../auth";

function DestinationDetails() {
  const { cityName } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getDestinationDetails(cityName);

        setDetails(data);

        // Lazy-load images
        const tempSlides = [];
        for (let src of data.images || []) {
          await new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          });
          tempSlides.push(src);
          setSlides([...tempSlides]); // progressively render slides
        }
      } catch (err) {
        console.error("Error fetching destination details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [cityName]);

  if (loading) return <LoadingPage cityName={cityName} />;
  if (!details) return <p className="text-center mt-10">No details found.</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 my-[70px] px-8">
      {/* Left column */}
      <div className="lg:w-2/3 flex flex-col gap-6">
        <h1 className="text-4xl font-semibold -mb-2 mt-2">{details.name}</h1>

        {slides.length > 0 && (
          <Carousel autoplay className="rounded-lg overflow-hidden">
            {slides.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-[70vh] flex justify-center items-center overflow-hidden rounded-lg"
              >
                <img
                  src={`${img}?w=1080&auto=format&fit=crop`}
                  alt={`${cityName} ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </Carousel>
        )}

        {slides.length === 0 && (
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
            <h2 className="text-2xl font-semibold mb-5 text-[#143D60] border-b-2 border-[#143D60] inline-block pb-1">
              Top Attractions
            </h2>
            <ul className="flex flex-wrap gap-3 gap-y-4">
              {details.attractions.slice(0, 12).map((attraction, idx) => {
                const wikiLink = `https://en.wikipedia.org/wiki/${encodeURIComponent(
                  attraction
                )}`;
                return (
                  <li key={idx}>
                    <a
                      href={wikiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#143D60] font-medium px-3 py-1 border border-[#143D60] border-[2px] rounded-lg hover:bg-[#143D60] hover:text-white transition-colors duration-300"
                    >
                      {attraction}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Right column: map */}
      {details.coordinates && (
        <div className="lg:w-1/3 h-[100vh] my-15 text-center">
          <MapContainer
            center={[details.coordinates.lat, details.coordinates.lng]}
            zoom={12}
            className="h-full w-full rounded-xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker position={[details.coordinates.lat, details.coordinates.lng]}>
              <Popup>{details.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default DestinationDetails;
