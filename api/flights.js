import { getAmadeusToken } from "./_utils.js";

let cachedData = null;
let cachedKey = null;
let cachedAt = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export default async function handler(req, res) {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "Missing required query params" });
  }

  // create a cache key specific to the request params
  const cacheKey = `${origin}-${destination}-${date}`;

  // ✅ serve from cache if still valid
  const now = Date.now();
  if (cachedData && cachedKey === cacheKey && now - cachedAt < CACHE_DURATION) {
    return res.status(200).json({ ...cachedData, cached: true });
  }

  try {
    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&nonStop=false&max=50`;

    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Amadeus error: ${response.status} ${errBody}`);
    }

    const data = await response.json();

    // ✅ save to cache
    cachedData = data;
    cachedKey = cacheKey;
    cachedAt = Date.now();

    return res.status(200).json({ ...data, cached: false });
  } catch (err) {
    console.error("Flights fetch failed:", err);
    return res.status(500).json({ error: "Flights fetch failed" });
  }
}
