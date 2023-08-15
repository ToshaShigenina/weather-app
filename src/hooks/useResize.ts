import { useState, useEffect } from 'react';

type windowSize = {
	width: number
	height: number
}

export const useResize = (): windowSize => {
	const [size, setSize] = useState<windowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return size;
};