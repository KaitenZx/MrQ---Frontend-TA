import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useState } from 'react';

const SymbolsView = () => {
  const [activeSymbol, setActiveSymbol] = useState<null | string>(null);


  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__chart">
        <h3>PRICE HISTORY</h3>
      </div>
      <div className="symbolsView__content">
        <PriceChart symbolId={activeSymbol} />
        <div className="symbolsView__cards">
          <SymbolsGrid />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
