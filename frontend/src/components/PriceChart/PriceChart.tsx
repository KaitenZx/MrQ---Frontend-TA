// frontend/src/components/PriceChart/PriceChart.tsx

import React from 'react';
import './priceChart.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useGetPriceHistoryQuery } from '@/services/priceHistoryApi';
import Loading from '@/components/Loading';

type PriceChartProps = {
  symbolId: string | null;
};

const PriceChart = ({ symbolId }: PriceChartProps) => {
  // Используем RTK Query hook для получения истории цен
  const { data, error, isLoading, isFetching } = useGetPriceHistoryQuery(symbolId!, {
    skip: !symbolId, // Пропуск запроса, если symbolId не задан
  });

  // Если ни одна акция не выбрана
  if (!symbolId) {
    return <div className="priceChart">Select stock</div>;
  }

  // Если данные загружаются (первичная загрузка или обновление)
  if (isLoading || isFetching) {
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  }

  // Если произошла ошибка при загрузке данных
  if (error) {
    return <div className="priceChart">Failed to get price history!</div>;
  }

  // Если данные отсутствуют или история пустая
  if (!data || !data.history.length) {
    return <div className="priceChart">No price history available</div>;
  }

  // Преобразуем данные для использования с Recharts
  const chartData = data.history.map((entry) => ({
    time: new Date(entry.time).toLocaleTimeString(),
    price: entry.price,
  }));

  return (
    <div className="priceChart">
      {data.symbol && <div className="priceChart__symbol">{data.symbol}</div>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
