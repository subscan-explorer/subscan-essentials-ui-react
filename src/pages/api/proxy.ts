import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_HOST = 'https://assethub-westend-lite.webapi.subscan.io';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { path, data } = req.body;
    
    const response = await axios.post(`${API_HOST}${path}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
