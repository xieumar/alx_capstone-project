import fallbackDestinations from "./data/fallbackDestinations";
import { attractions } from "./data/fallbackAttractions";

// normalize function
const normalize = (str) => (str ? str.trim().toLowerCase() : "");

// precompute normalized attractions
const normalizedAttractions = {};
for (const key in attractions) {
  normalizedAttractions[normalize(key)] = attractions[key];
}

// 🔑 Amadeus Auth
async function getAmadeusToken() {
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
    return data.results[0]?.urls?.small || null;
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
      )}&client_id=${ACCESS_KEY}&per_page=6`
    );
    if (!res.ok) throw new Error("Unsplash request failed");

    const data = await res.json();
    return data.results.map((img) => img.urls.small);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// 📖 Destination Details: Wikipedia + Amadeus POIs + Travel Guide link
export async function getDestinationDetails(cityName) {
  try {
    // Wikipedia
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        cityName
      )}`
    );
    const wikiData = await wikiRes.json();
    const description = wikiData.extract || "No description available.";
    const guideLink = wikiData.content_urls?.desktop?.page || "";

    // Amadeus coordinates
    const access_token = await getAmadeusToken();
    const geoRes = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(
        cityName
      )}&subType=CITY`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const geoData = await geoRes.json();
    const firstMatch = geoData.data?.[0];
    const coordinates = firstMatch?.geoCode
      ? { lat: firstMatch.geoCode.latitude, lng: firstMatch.geoCode.longitude }
      : null;

    // OpenStreetMap attractions
    let attractionsList = [];
    if (coordinates) {
      const radius = 2000;
      const overpassQuery = `
        [out:json];
        node(around:${radius},${coordinates.lat},${coordinates.lng})["tourism"~"museum|attraction|viewpoint"];
        out;`;
      const osmRes = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
      );
      const osmData = await osmRes.json();
      attractionsList = osmData.elements.map((el) => el.tags?.name).filter(Boolean);
    }

    // Fetch multiple images for gallery
    const images = await fetchCityImages(cityName);

    return {
      name: wikiData.title || cityName,
      description,
      guideLink,
      attractions: attractionsList.length ? attractionsList : ["No attractions found"],
      coordinates,
      images,       // ✅ add images array
      image: images[0] || null, // ✅ first image as main header image
    };
  } catch (err) {
    console.error("Error fetching destination details:", err);
    return {
      name: cityName,
      description: "No information available.",
      guideLink: "",
      attractions: [],
      coordinates: null,
      images: [],
      image: null,
    };
  }
}



// 🖼️ Unsplash single image helper
export async function getUnsplashImage(cityName) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        cityName
      )}&client_id=${ACCESS_KEY}&per_page=1`
    );
    if (!response.ok) throw new Error("Unsplash request failed");
    const data = await response.json();
    return data.results[0]?.urls?.regular || "https://via.placeholder.com/800";
  } catch (err) {
    console.error("Error fetching Unsplash image:", err);
    return "https://via.placeholder.com/800";
  }
}
