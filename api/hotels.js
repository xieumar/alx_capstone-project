import { getAmadeusToken } from "./_utils.js";

let cachedData = null;
let cachedKey = null;
let cachedAt = 0;
const CACHE_DURATION = 1000 * 60 * 5; 

export default async function handler(req, res) {
  const { cityCode } = req.query;

  if (!cityCode) {
    return res.status(400).json({ error: "Missing required query param: cityCode" });
  }

  const cacheKey = cityCode;

  const now = Date.now();
  if (cachedData && cachedKey === cacheKey && now - cachedAt < CACHE_DURATION) {
    return res.status(200).json({ ...cachedData, cached: true });
  }

  try {
    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}&adults=1&roomQuantity=1&radius=5&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=PRICE&currency=USD`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Amadeus error: ${response.status} ${errBody}`);
    }

    const data = await response.json();

    cachedData = data;
    cachedKey = cacheKey;
    cachedAt = Date.now();

    return res.status(200).json({ ...data, cached: false });
  } catch (err) {
    console.error("Hotels fetch failed:", err);
    return res.status(500).json({ error: "Hotels fetch failed" });
  }
}
