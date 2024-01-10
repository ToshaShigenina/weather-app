import React, { FC } from 'react';
import { HourlySlider } from './HourlySlider';
import { HourlyList } from './HourlyList';
import { useResize } from '../../../hooks';

export const HourlyTab: FC = () => {
	const { width } = useResize();
	return <>{ width < 768 ? <HourlyList /> : <HourlySlider /> }</>;
}
