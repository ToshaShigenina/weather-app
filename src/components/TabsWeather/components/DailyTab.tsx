import React, { FC } from 'react';
import { DailySlider } from './DailySlider';
import { DailyList } from './DailyList';
import { useResize } from '../../../hooks';

export const DailyTab: FC = () => {
	const { width } = useResize();
	return <>{ width < 768 ? <DailyList /> : <DailySlider /> }</>;
}
