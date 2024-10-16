import { NextRequest, NextResponse } from 'next/server';

export async function getSpotifyToken() {

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(
    tokenUrl,
    {
      method: "POST",
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  const data = await response.json();
  return data.access_token;
}