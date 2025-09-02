import fallbackDestinations from "./data/fallbackDestinations";
import attractions from "./data/fallbackAttractions";

// normalize function
const normalize = (str) => (str ? str.trim().toLowerCase() : "");

// precompute normalized attractions
const normalizedAttractions = {};
for (const key in attractions) {
  normalizedAttractions[normalize(key)] = attractions[key];
}

// 🌍 API Base for backend proxy
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 🔑 Amadeus Auth
export async function getAmadeusToken() {
  const tokenRes = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_AMADEUS_API_KEY,
        client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
      }),
    }
  );

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error("Failed to get token: " + text);
  }
  const { access_token } = await tokenRes.json();
  return access_token;
}

// 🔎 Fetch destinations from Amadeus
export async function fetchDestinations(keyword) {
  const trimmedKeyword = keyword?.trim().toLowerCase() || "";

  if (!trimmedKeyword) {
    return fallbackDestinations.map((city) => ({
      ...city,
      attractions: normalizedAttractions[normalize(city.name)] || [],
    }));
  }

  try {
    const access_token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(
      keyword
    )}&subType=CITY`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!res.ok) throw new Error("Amadeus request failed");

    const data = await res.json();

    if (data.data?.length) {
      return data.data.map((city) => {
        const fallback = fallbackDestinations.find(
          (d) => normalize(d.name) === normalize(city.name)
        );

        const cityAttractions =
          normalizedAttractions[normalize(city.name)] ||
          normalizedAttractions[normalize(fallback?.name)] ||
          [];

        return {
          id: city.id,
          name: city.name,
          country: city.address?.countryName || fallback?.country || "Unknown",
          cityCode: city.iataCode || city.name.toUpperCase().slice(0, 3),
          image: fallback?.image || null,
          attractions: cityAttractions,
          location: city.geoCode
            ? { lat: city.geoCode.latitude, lng: city.geoCode.longitude }
            : null,
        };
      });
    }

    return fallbackDestinations
      .filter((d) => normalize(d.name).includes(trimmedKeyword))
      .map((city) => ({
        ...city,
        attractions: normalizedAttractions[normalize(city.name)] || [],
      }));
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return fallbackDestinations
      .filter((d) => normalize(d.name).includes(trimmedKeyword))
      .map((city) => ({
        ...city,
        attractions: normalizedAttractions[normalize(city.name)] || [],
      }));
  }
}

// 🖼️ Fetch single city image
export async function fetchCityImage(cityName) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        cityName
      )}&client_id=${ACCESS_KEY}&per_page=1`
    );
    if (!res.ok) throw new Error("Unsplash request failed");
    const data = await res.json();
    return data.results[0]?.urls?.regular || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// 🖼️ Fetch multiple images for gallery
export async function fetchCityImages(cityName) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        cityName
      )}&client_id=${ACCESS_KEY}&per_page=6&orientation=landscape`
    );
    if (!res.ok) throw new Error("Unsplash request failed");
    const data = await res.json();
    return data.results.map((img) => img.urls.regular); // ✅ clean URL
  } catch (err) {
    console.error(err);
    return [];
  }
}

// 🔹 Fallback OSM geocoding
export async function getCoordinatesFromOSM(cityName) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch (err) {
    console.error("OSM geocoding error:", err);
    return null;
  }
}

// 📌 Weather
export async function getWeather(lat, lon) {
  try {
    const key = import.meta.env.VITE_OPENWEATHER_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    );
    if (!res.ok) throw new Error("Weather fetch failed");
    return await res.json();
  } catch (err) {
    console.error("getWeather error:", err);
    return null;
  }
}

// 📖 Destination Details (Wikipedia + Amadeus + OSM + Unsplash)
export async function getDestinationDetails(cityName) {
 
}

// Flights
export async function getFlightsFromServer(destinationCode) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `${API_BASE}/api/flights?origin=NYC&destination=${destinationCode}&date=${today}`
    );
    const data = await res.json();
    return (data.data || []).map((offer) => {
      const price = offer?.price?.total || "N/A";
      const currency = offer?.price?.currency || "USD";
      const airline =
        offer?.itineraries?.[0]?.segments?.[0]?.carrierCode || "Unknown Airline";
      return { airline, price, currency };
    });
  } catch (err) {
    console.error("Flights fetch from server failed", err);
    return [];
  }
}

// Hotels
export async function getHotelsFromServer(cityCode) {
  try {
    const res = await fetch(`${API_BASE}/api/hotels?cityCode=${cityCode}`);
    const data = await res.json();
    return (data.data || []).map((hotelOffer) => {
      const hotelName = hotelOffer.hotel?.name || "Unnamed Hotel";
      const price = hotelOffer.offers?.[0]?.price?.total || "N/A";
      const currency = hotelOffer.offers?.[0]?.price?.currency || "USD";
      return { name: hotelName, price, currency };
    });
  } catch (err) {
    console.error("Hotels fetch from server failed", err);
    return [];
  }
}


// 🖼️ Unsplash single image helper
export async function getUnsplashImage(cityName) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${ACCESS_KEY}&per_page=1`
    );
    if (!response.ok) throw new Error("Unsplash request failed");
    const data = await response.json();
    return data.results[0]?.urls?.regular || "https://via.placeholder.com/800";
  } catch {
    return "https://via.placeholder.com/800";
  }
}
