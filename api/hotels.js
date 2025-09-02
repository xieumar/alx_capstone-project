import { getAmadeusToken } from "./_utils.js";

let cachedData = null;
let cachedKey = null;
let cachedAt = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export default async function handler(req, res) {
  const { cityCode, checkInDate, checkOutDate } = req.query;

  if (!cityCode || !checkInDate || !checkOutDate) {
    return res
      .status(400)
      .json({ error: "Missing required query params (cityCode, checkInDate, checkOutDate)" });
  }

  const cacheKey = `${cityCode}-${checkInDate}-${checkOutDate}`;
  const now = Date.now();

  // ✅ Serve from cache if still valid
  if (cachedData && cachedKey === cacheKey && now - cachedAt < CACHE_DURATION) {
    return res.status(200).json({ ...cachedData, cached: true });
  }

  try {
    const token = await getAmadeusToken();

    // ✅ POST body
    const body = {
      currency: "USD",
      travelerId: "1",
      hotelCriteria: [
        {
          cityCode,
          checkInDate,
          checkOutDate,
          roomQuantity: 1,
          adults: 1,
          radius: 5,
          radiusUnit: "KM",
        },
      ],
    };

    const response = await fetch(
      "https://test.api.amadeus.com/v3/shopping/hotel-offers",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Amadeus hotel error:", response.status, errBody);
      throw new Error(`Amadeus error: ${response.status} ${errBody}`);
    }

    const data = await response.json();

    // ✅ Cache result
    cachedData = data;
    cachedKey = cacheKey;
    cachedAt = Date.now();

    return res.status(200).json({ ...data, cached: false });
  } catch (err) {
    console.error("Hotels fetch failed:", err);
    return res.status(500).json({ error: "Hotels fetch failed" });
  }
}
