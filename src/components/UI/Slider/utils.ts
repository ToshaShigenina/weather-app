import { ReactNode } from 'react';
import { SliderBreackpointProps } from './components/Slider'

const asArray = (children: ReactNode): Array<ReactNode> => {
	if (children) {
		if (Array.isArray(children)) {
			return [...children];
		}
		return [children];
	}
	return [];
};
export const getCountSlides = (children: ReactNode): number => {
	return asArray(children).length
};
export const getMinBreackpoint = (breackpoints: Record<number, boolean>): number => {
	const bpTemp = Object.entries(breackpoints)
		.filter(([_, value]) => value)
		.map(([key, _]) => Number(key));
	return Math.min(...bpTemp);
};
export const getBreackpointsMap = (breackpoints: Record<number, SliderBreackpointProps>, width: number): Record<number, boolean> => {
	const keys = Object.keys(breackpoints);
	return keys.reduce((obj, key) => {
		if (!isNaN(Number(key))) {
			return {
				...obj,
				[key]: Number(key) > width
			}
		}
		return obj;
	}, {});
};