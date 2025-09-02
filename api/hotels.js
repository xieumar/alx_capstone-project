// /api/hotels.js
import { getAmadeusToken } from "./_utils.js";

let cachedData = null;
let cachedKey = null;
let cachedAt = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export default async function handler(req, res) {
  const { cityCode } = req.query;

  if (!cityCode) {
    return res.status(400).json({ error: "Missing required query param: cityCode" });
  }

  const cacheKey = cityCode;
  const now = Date.now();

  // ✅ Serve from cache
  if (cachedData && cachedKey === cacheKey && now - cachedAt < CACHE_DURATION) {
    return res.status(200).json({ ...cachedData, cached: true });
  }

  try {
    const token = await getAmadeusToken();

    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Amadeus hotels error:", response.status, errBody);
      return res.status(response.status).json({ error: errBody });
    }

    const data = await response.json();

    // ✅ Limit to 10 hotels
    data.data = (data.data || []).slice(0, 10);

    // ✅ Cache
    cachedData = data;
    cachedKey = cacheKey;
    cachedAt = Date.now();

    return res.status(200).json({ ...data, cached: false });
  } catch (err) {
    console.error("Hotels fetch failed:", err);
    return res.status(500).json({ error: "Hotels fetch failed" });
  }
}
