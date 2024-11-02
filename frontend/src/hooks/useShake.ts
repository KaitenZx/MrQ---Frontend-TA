import { useState, useEffect } from 'react';

const useShake = (trigger: boolean, duration: number = 620) => {
	const [shake, setShake] = useState(false);

	useEffect(() => {
		if (trigger) {
			setShake(true);
			const timeout = setTimeout(() => setShake(false), duration);
			return () => clearTimeout(timeout);
		}
	}, [trigger, duration]);

	return shake;
};

export default useShake;
