import React, { useEffect, useState } from 'react';
import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { selectStock, deselectStock } from '@/store/selectedStockSlice';
import SymbolPrice from './src/SymbolPrice';
import CardHeader from './src/CardHeader';
import useGlow from '@/hooks/useGlow';
import useFormatMarketCap from '@/hooks/useFormatMarketCap';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { selectStockById } from '@/store/stocksSlice';

type SymbolCardProps = {
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

  if (!stock) {
    return null;
  }

  const { trend, companyName, industry, marketCap } = stock;

  const priceChange = price - prevPrice;
  const shakeTrigger = price > prevPrice * 1.25 || price < prevPrice * 0.75;

  const glow = useGlow(priceChange, prevPrice);
  const formattedMarketCap = useFormatMarketCap(marketCap);

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
      {showCardInfo && (
        <div className="symbolCard__additional-info">
          <ListItem spacing='space-between' Icon={<CompanyIcon />} label={companyName} />
          <ListItem spacing='space-between' Icon={<IndustryIcon />} label={industry} />
          <ListItem spacing='space-between' Icon={<MarketCapIcon />} label={formattedMarketCap} />
        </div>
      )}
    </div>
  );
};

export default React.memo(SymbolCard);
