'use client';
import * as React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { Loader } from '@/components/common/Loader';
import { getCryptoData } from '@/lib/api/crypto.service';
import Typography from '@mui/material/Typography';
import { getBitcoinMonthlyHighsLows } from '@/lib/api/price.service';
import { getMarketDistribution } from '@/lib/api/market-distribution.service';

export default function Page(): React.JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);
  const [monthlyData, setMonthlyData] = React.useState<any[]>([]);
  const [trafficData, setTrafficData] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCryptoData();
        const monthly = await getBitcoinMonthlyHighsLows();
        const marketData = await getMarketDistribution();
        setData(result);
        setMonthlyData(monthly);
        setTrafficData(marketData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const btc = data?.find((coin: any) => coin.id === 'bitcoin');
  const eth = data?.find((coin: any) => coin.id === 'ethereum');

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Example of a dashboard page with integration to API https://api.coingecko.com
      </Typography>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12}>
          <Budget diff={btc?.price_change_percentage_24h} trend="up" sx={{ height: '100%' }} value={`$${btc?.market_cap.toLocaleString()}`} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalCustomers diff={eth?.price_change_percentage_24h} trend="down" sx={{ height: '100%' }} value={`$${eth?.current_price}`} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TasksProgress sx={{ height: '100%' }} value={btc?.price_change_percentage_24h} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalProfit sx={{ height: '100%' }} value={`$${btc?.total_volume.toLocaleString()}`} />
        </Grid>
        <Grid lg={8} xs={12}>
          <Sales
            chartSeries={[
              {
                name: 'Bitcoin higth price',
                data: monthlyData.map((item) => parseFloat(item.high)),
              },
              {
                name: 'Bitcoin low price',
                data: monthlyData.map((item) => parseFloat(item.low)),
              },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid lg={4} md={6} xs={12}>
          <Traffic
            chartSeries={trafficData.map((item: any) => parseFloat(item.percentage))}
            labels={trafficData.map((item: any) => item.name)}
            sx={{ height: '100%' }}
          />
        </Grid>
        {/* <Grid lg={4} md={6} xs={12}>
          <LatestProducts
            products={[
              {
                id: 'PRD-005',
                name: 'Soja & Co. Eucalyptus',
                image: '/assets/product-5.png',
                updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
              },
              {
                id: 'PRD-004',
                name: 'Necessaire Body Lotion',
                image: '/assets/product-4.png',
                updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
              },
              {
                id: 'PRD-003',
                name: 'Ritual of Sakura',
                image: '/assets/product-3.png',
                updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
              },
              {
                id: 'PRD-002',
                name: 'Lancome Rouge',
                image: '/assets/product-2.png',
                updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
              },
              {
                id: 'PRD-001',
                name: 'Erbology Aloe Vera',
                image: '/assets/product-1.png',
                updatedAt: dayjs().subtract(10, 'minutes').toDate(),
              },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid lg={8} md={12} xs={12}>
          <LatestOrders
            orders={[
              {
                id: 'ORD-007',
                customer: { name: 'Ekaterina Tankova' },
                amount: 30.5,
                status: 'pending',
                createdAt: dayjs().subtract(10, 'minutes').toDate(),
              },
              {
                id: 'ORD-006',
                customer: { name: 'Cao Yu' },
                amount: 25.1,
                status: 'delivered',
                createdAt: dayjs().subtract(10, 'minutes').toDate(),
              },
              {
                id: 'ORD-004',
                customer: { name: 'Alexa Richardson' },
                amount: 10.99,
                status: 'refunded',
                createdAt: dayjs().subtract(10, 'minutes').toDate(),
              },
              {
                id: 'ORD-003',
                customer: { name: 'Anje Keizer' },
                amount: 96.43,
                status: 'pending',
                createdAt: dayjs().subtract(10, 'minutes').toDate(),
              },
              {
                id: 'ORD-002',
                customer: { name: 'Clarke Gillebert' },
                amount: 32.54,
                status: 'delivered',
                createdAt: dayjs().subtract(10, 'minutes').toDate(),
              },
              {
                id: 'ORD-001',
                customer: { name: 'Adam Denisov' },
                amount: 16.76,
                status: 'delivered',
                createdAt: dayjs().subtract(10, 'minutes').toDate(),
              },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid> */}
      </Grid>
    </>
  );
}
