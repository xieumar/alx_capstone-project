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

    // ✅ new POST body
    const body = {
      currencyCode: "USD",
      originDestinations: [
        {
          id: "1",
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDateTimeRange: {
            date: date, // "YYYY-MM-DD"
            time: "10:00:00",
          },
        },
      ],
      travelers: [
        {
          id: "1",
          travelerType: "ADULT",
        },
      ],
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: 5,
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: "ECONOMY", // you can change to BUSINESS if you like
              coverage: "MOST_SEGMENTS",
              originDestinationIds: ["1"],
            },
          ],
        },
      },
    };

    const response = await fetch(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
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
