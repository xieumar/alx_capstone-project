import { getAmadeusToken } from "./_utils.js";

export default async function handler(req, res) {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "Missing required query params" });
  }

  try {
    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&nonStop=false&max=250`;

    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    if (!response.ok) throw new Error("Failed to fetch flights");

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Flights fetch failed" });
  }
}
