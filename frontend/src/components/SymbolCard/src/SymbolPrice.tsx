import React from 'react';
import './symbolPrice.css';

type SymbolPriceProps = {
	price: string;
};

const SymbolPrice = ({ price }: SymbolPriceProps) => {
	return (
		<div className="symbolPrice">
			PRICE:	<span>${price}</span>
		</div>

	)
}

export default React.memo(SymbolPrice)