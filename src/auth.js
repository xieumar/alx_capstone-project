
import fallbackDestinations from "./data/fallbackDestinations";

export async function fetchDestinations(keyword) {
  if (!keyword || keyword.trim() === "") return fallbackDestinations;

  try {
    const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_AMADEUS_API_KEY,
        client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      throw new Error("Failed to get token: " + text);
    }

    const { access_token } = await tokenRes.json();

    const url = `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(
      keyword
    )}&subType=CITY`;

    const res = await fetch(url, { headers: { Authorization: `Bearer ${access_token}` } });

    if (!res.ok) throw new Error("Amadeus request failed");

    const data = await res.json();

    if (data.data?.length) {
      return data.data.map((city) => ({
        name: city.name,
        country: city.address?.countryName || "Unknown",
        cityCode: city.iataCode || city.name.toUpperCase().slice(0, 3),
        image: null,
      }));
    }

    // fallback if Amadeus returns nothing
    return fallbackDestinations.filter((d) =>
      d.name.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (err) {
    console.error(err);
    return fallbackDestinations.filter((d) =>
      d.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}

export async function fetchCityImage(cityName) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY; // store key in .env
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        cityName
      )}&client_id=${ACCESS_KEY}&per_page=1`
    );
    if (!res.ok) throw new Error("Unsplash request failed");
    const data = await res.json();
    return data.results[0]?.urls?.small || null; // fallback null if no image
  } catch (err) {
    console.error(err);
    return null;
  }
}
