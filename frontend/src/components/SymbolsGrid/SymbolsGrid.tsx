// frontend/src/components/SymbolsGrid/SymbolsGrid.tsx

import React from 'react';
import { useGetAllStocksQuery, selectAllStocks } from '@/services/stocksApi';
import { useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import './symbolsGrid.css';

const SymbolsGrid: React.FC = () => {
  const { data: stocksData, error, isLoading } = useGetAllStocksQuery();
  const stocks = useAppSelector(selectAllStocks);
  const prices = useAppSelector((state) => state.prices);

  if (isLoading) return <div>Loading stocks...</div>;
  if (error) return <div>Error loading stocks</div>;

  return (
    <div className='symbolsGrid'>
      {stocks.map((stock) => (
        <SymbolCard
          key={stock.symbol}
          id={stock.symbol}
          price={prices[stock.symbol]}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
