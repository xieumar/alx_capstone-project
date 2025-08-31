import fetch from "node-fetch";

export async function getAmadeusToken() {
  const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to get token: " + text);
  }

  const data = await res.json();
  return data.access_token;
}
