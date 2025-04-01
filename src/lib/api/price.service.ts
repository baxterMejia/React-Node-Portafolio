import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBitcoinMonthlyHighsLows() {
  try {
    const response = await axios.get(`${API_URL}/bitcoin/monthly-highs-lows`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Bitcoin monthly data:', error);
    throw error;
  }
}
