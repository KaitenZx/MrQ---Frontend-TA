// frontend/src/components/SymbolsView/SymbolsView.tsx

import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import './symbolsView.css';
import { useAppSelector } from '@/hooks/redux';

const SymbolsView = () => {
  const selectedStockId = useAppSelector((state) => state.selectedStock.selectedStockId);

  return (
    <div className="symbolsView">
      <DesktopInfo />

      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <h3>PRICE HISTORY</h3>
          {selectedStockId ? <PriceChart symbolId={selectedStockId} /> : <h3>Select a stock</h3>}
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
