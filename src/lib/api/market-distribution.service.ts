import axios from 'axios';

export async function getMarketDistribution() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/market-distribution`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market distribution:', error);
    return [];
  }
}
