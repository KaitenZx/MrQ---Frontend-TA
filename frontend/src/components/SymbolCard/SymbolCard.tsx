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
import useShake from '@/hooks/useShake';
import useGlow from '@/hooks/useGlow';
import useFormatMarketCap from '@/hooks/useFormatMarketCap';

type SymbolCardProps = {
  id: string;
  price: number;
};

const SymbolCard = ({ id, price }: SymbolCardProps) => {
  const dispatch = useAppDispatch();
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const selectedStockId = useAppSelector((state) => state.selectedStock.selectedStockId);
  const showCardInfo = useAppSelector((state) => state.store.showCardInfo); // Получаем состояние showCardInfo из Redux
  const isSelected = selectedStockId === id;
  const isOthersSelected = selectedStockId && selectedStockId !== id;

  const [prevPrice, setPrevPrice] = useState(price);

  const priceChange = price - prevPrice;
  const shakeTrigger = price > prevPrice * 1.25 || price < prevPrice * 0.75;
  const shake = useShake(shakeTrigger);
  const glow = useGlow(priceChange, prevPrice);
  const formattedMarketCap = useFormatMarketCap(marketCap);

  useEffect(() => {
    if (price !== prevPrice) {
      setPrevPrice(price);
    }
  }, [price, prevPrice]);

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
        ${shake ? 'symbolCard__shake' : ''} 
        ${glow}`}
    >
      <CardHeader trend={trend} id={id} />

      <SymbolPrice price={price.toFixed(0)} />
      {showCardInfo && (
        <div className="symbolCard__additional-info">
          <ListItem spacing='space-between' Icon={<CompanyIcon />} label={companyName} />
          <ListItem spacing='space-between' Icon={<IndustryIcon />} label={`Industry: ${industry}`} />
          <ListItem spacing='space-between' Icon={<MarketCapIcon />} label={formattedMarketCap} />
        </div>
      )}
    </div>
  );
};

export default React.memo(SymbolCard);
