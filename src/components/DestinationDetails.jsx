import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!details) return <p className="text-center mt-10">No details found.</p>;

  return (
    <div className="mt-[50px] p-6 max-w-4xl mx-auto space-y-6">
      {/* Header Image */}
      <img
        src={details.image}
        alt={cityName}
        className="w-full h-64 object-cover rounded-2xl shadow-lg"
      />

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
        <h1 className="text-3xl font-bold mb-2">{details.name}</h1>
        <p className="text-gray-700 mb-2">{details.description}</p>
        {details.guideLink && (
          <a
            href={details.guideLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Read Full Guide
          </a>
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
