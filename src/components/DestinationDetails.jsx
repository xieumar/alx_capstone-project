import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LoadingPage from "./Loading";

import { getUnsplashImage, getDestinationDetails, fetchCityImages } from "../auth";

function DestinationDetails() {
  const { cityName } = useParams();
  const [details, setDetails] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch main image, gallery, and wiki details
        const [unsplashImg, wikiDetails, galleryImgs] = await Promise.all([
          getUnsplashImage(cityName),
          getDestinationDetails(cityName),
          fetchCityImages(cityName),
        ]);

        setDetails({
          image: unsplashImg,
          ...wikiDetails,
        });

        setGallery(galleryImgs);
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
    <div className="mt-[50px] p-6 max-w-4xl mx-auto space-y-6">
     <h1 className="text-3xl font-bold mb-2">{details.name}</h1>
      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${cityName} ${idx + 1}`}
              className="w-full h-32 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* City Info */}
      <div>
        <p className="text-gray-700 mb-2">{details.description}</p>
        {details.guideLink && (
          <div className="button mt-12 text-center mx-auto">
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

      </div>

      {/* Attractions */}
      {details.attractions?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Top Attractions</h2>
          <ul className="list-disc ml-6 space-y-1">
            {details.attractions.slice(0, 12).map((attraction, idx) => (
              <li key={idx}>{attraction}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Map */}
      {details.coordinates && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Map</h2>
          <MapContainer
            center={[details.coordinates.lat, details.coordinates.lng]}
            zoom={12}
            className="h-64 w-full rounded-xl z-0"
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
