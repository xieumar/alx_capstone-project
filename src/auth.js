import fallbackDestinations from "./data/fallbackDestinations";
import { attractions } from "./data/fallbackAttractions";

// normalize function
const normalize = (str) => (str ? str.trim().toLowerCase() : "");

// precompute normalized attractions
const normalizedAttractions = {};
for (const key in attractions) {
  normalizedAttractions[normalize(key)] = attractions[key];
}


export async function fetchDestinations(keyword) {
  const trimmedKeyword = keyword?.trim().toLowerCase() || "";

  // fallback for empty search
  if (!trimmedKeyword) {
    return fallbackDestinations.map((city) => ({
      ...city,
      attractions: normalizedAttractions[normalize(city.name)] || [],
    }));
  }

  try {
    // Get Amadeus token
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

    // fetch cities from Amadeus
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
        // find fallback if available
        const fallback = fallbackDestinations.find(
          (d) => normalize(d.name) === normalize(city.name)
        );

        const cityAttractions =
          normalizedAttractions[normalize(city.name)] ||
          normalizedAttractions[normalize(fallback?.name)] ||
          [];

        return {
          name: city.name,
          country: city.address?.countryName || fallback?.country || "Unknown",
          cityCode: city.iataCode || city.name.toUpperCase().slice(0, 3),
          image: fallback?.image || null,
          attractions: cityAttractions,
        };
      });
    }

    // fallback if Amadeus returns nothing
    return fallbackDestinations
      .filter((d) => normalize(d.name).includes(trimmedKeyword))
      .map((city) => ({
        ...city,
        attractions: normalizedAttractions[normalize(city.name)] || [],
      }));

  } catch (err) {
    console.error("Error fetching destinations:", err);

    // fallback on error
    return fallbackDestinations
      .filter((d) => normalize(d.name).includes(trimmedKeyword))
      .map((city) => ({
        ...city,
        attractions: normalizedAttractions[normalize(city.name)] || [],
      }));
  }
}

export async function fetchCityImage(cityName) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;
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
