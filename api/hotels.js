import { getAmadeusToken } from "./_utils.js";

let cachedData = null;
let cachedKey = null;
let cachedAt = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export default async function handler(req, res) {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Missing required query params: lat, lng" });
  }

  const cacheKey = `${lat}-${lng}`;
  const now = Date.now();
  if (cachedData && cachedKey === cacheKey && now - cachedAt < CACHE_DURATION) {
    return res.status(200).json({ ...cachedData, cached: true });
  }

  try {
    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lng}&radius=5&radiusUnit=KM&hotelSource=ALL`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Amadeus hotel-by-geocode error:", response.status, errBody);
      return res
        .status(response.status)
        .json({ error: "Amadeus hotels error", details: errBody });
    }

    const data = await response.json();

    // ✅ Limit to 10 hotels
    const limitedData = {
      data: (data.data || []).slice(0, 10),
    };

    cachedData = limitedData;
    cachedKey = cacheKey;
    cachedAt = Date.now();

    return res.status(200).json({ ...limitedData, cached: false });
  } catch (err) {
    console.error("Hotels fetch failed:", err);
    return res.status(500).json({ error: "Hotels fetch failed" });
  }
}
