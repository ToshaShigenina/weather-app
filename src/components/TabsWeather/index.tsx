import React, { FC } from 'react';
import { DailyTab } from './components/DailyTab';
import { HourlyTab } from './components/HourlyTab';
import { Tabs } from '../UI/Tabs';
import './style.css';

const getTabs = () => {
	return [
		{
			label: 'на неделю',
			children: (<DailyTab />)
		},
		{
			label: 'почасовой',
			children: (<HourlyTab />)
		},
	];
};
export const TabsWeather: FC = () => {
	return <section className="weather-tabs">
		<h1 className="heading">Прогноз</h1>
		<Tabs items={ getTabs() } />
	</section>;
}
