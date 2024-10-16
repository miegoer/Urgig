import { NextApiRequest, NextApiResponse } from "next";
import { getSpotifyToken } from "./token";

export default async function handler
(req: NextApiRequest, res: NextApiResponse) {

  const access_token = await getSpotifyToken();
  
  const url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
  const data = await response.json();
  return data;
}

