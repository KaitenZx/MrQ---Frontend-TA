import { useState, useEffect } from 'react';

type GlowType = 'green-glow' | 'red-glow' | '';

const useGlow = (priceChange: number, prevPrice: number, duration: number = 1000): GlowType => {
	const [glow, setGlow] = useState<GlowType>('');

	useEffect(() => {
		if (priceChange > 0) {
			setGlow('green-glow');
		} else if (priceChange < 0) {
			setGlow('red-glow');
		}

		const timeout = setTimeout(() => setGlow(''), duration);

		return () => clearTimeout(timeout);
	}, [priceChange, duration]);

	return glow;
};

export default useGlow;
