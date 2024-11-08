import './priceChart.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useGetPriceHistoryQuery } from '@/services/priceHistoryApi';
import Loading from '@/components/Loading';

type PriceChartProps = {
  symbolId: string | null;
};

const PriceChart = ({ symbolId }: PriceChartProps) => {
  const { data, error, isLoading, isFetching } = useGetPriceHistoryQuery(symbolId!, {
    skip: !symbolId,
  });

  if (!symbolId) {
    return <div className="priceChart">Select stock</div>;
  }

  if (isLoading || isFetching) {
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="priceChart">Failed to get price history!</div>;
  }

  if (!data || !data.history.length) {
    return <div className="priceChart">No price history available</div>;
  }

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
