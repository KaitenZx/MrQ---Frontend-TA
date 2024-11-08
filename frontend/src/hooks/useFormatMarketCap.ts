const useFormatMarketCap = (cap: number): string => {
	if (cap >= 1_000_000_000) {
		return `$${(cap / 1_000_000_000).toFixed(0)}B`;
	} else if (cap >= 1_000_000) {
		return `$${(cap / 1_000_000).toFixed(0)}M`;
	} else {
		return `$${cap}`;
	}
};

export default useFormatMarketCap;