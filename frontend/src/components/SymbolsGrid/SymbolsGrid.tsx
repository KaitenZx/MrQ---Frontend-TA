import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors, selectAllStocks } from '@/store/stocksSlice';
import './symbolsGrid.css';

const SymbolsGrid = () => {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector(selectAllStocks);
  const prices = useAppSelector((state) => state.prices);

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className='symbolsGrid'>
      {stocks.map(stock => (
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
