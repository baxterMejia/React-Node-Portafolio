import axios from 'axios';

export async function getCryptoData() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum',
        order: 'market_cap_desc',
        per_page: 2,
        page: 1,
        sparkline: true
      }
    }
  );

  return response.data;
}
