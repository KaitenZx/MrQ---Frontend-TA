import { useEffect, useState, memo } from 'react';
import './symbolCard.css';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { selectStock, deselectStock } from '@/store/selectedStockSlice';
import SymbolPrice from './src/SymbolPrice';
import CardHeader from './src/CardHeader';
import useGlow from '@/hooks/useGlow';
import useFormatMarketCap from '@/hooks/useFormatMarketCap';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { selectStockById } from '@/services/stocksApi';
import CardAdditionalInfo from './src/CardAdditionalInfo';

interface SymbolCardProps {
  id: string;
  price: number;
};

const SymbolCard = ({ id, price }: SymbolCardProps) => {
  const dispatch = useAppDispatch();
  const stock = useAppSelector((state) => selectStockById(state, id));
  const selectedStockId = useAppSelector((state) => state.selectedStock.selectedStockId);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const isSelected = selectedStockId === id;
  const isOthersSelected = selectedStockId && selectedStockId !== id;

  const [prevPrice, setPrevPrice] = useState(price);
  const [isShaking, setIsShaking] = useState(false);

  const priceChange = price - prevPrice;
  const shakeTrigger = price > prevPrice * 1.25 || price < prevPrice * 0.75;

  const glow = useGlow(priceChange, prevPrice);
  const formattedMarketCap = useFormatMarketCap(stock?.marketCap ?? 0);

  useEffect(() => {
    if (price !== prevPrice) {
      if (shakeTrigger) {
        triggerShake();
      }
      setPrevPrice(price);
    }
  }, [price, shakeTrigger, prevPrice]);

  const triggerShake = () => {
    setIsShaking(true);
  };

  const handleAnimationEnd = () => {
    setIsShaking(false);
  };

  const handleOnClick = () => {
    if (isSelected) {
      dispatch(deselectStock());
    } else {
      dispatch(selectStock(id));
    }
  };

  if (!stock) {
    return null;
  }

  const { trend, companyName, industry } = stock;

  return (
    <div
      onClick={handleOnClick}
      className={`symbolCard 
        ${isSelected ? 'symbolCard--selected' : ''} 
        ${isOthersSelected ? 'symbolCard--unselected' : ''} 
        ${isShaking ? 'symbolCard__shake' : ''} 
        ${glow}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <CardHeader trend={trend} id={id} />

      <SymbolPrice price={price?.toFixed(0)} />
      {showCardInfo &&
        <CardAdditionalInfo
          companyName={companyName}
          industry={industry}
          formattedMarketCap={formattedMarketCap}
        />
      }
    </div>
  );
};

export default memo(SymbolCard);
