import { getAmadeusToken } from "./_utils.js";

export default async function handler(req, res) {
  const { cityCode } = req.query;

  if (!cityCode) {
    return res.status(400).json({ error: "Missing cityCode param" });
  }

  try {
    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`;

    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    if (!response.ok) throw new Error("Failed to fetch hotels");

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Hotels fetch failed" });
  }
}
