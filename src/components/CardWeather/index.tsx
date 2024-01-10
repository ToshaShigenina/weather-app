import React, { FC } from 'react';
import { type DayWeather } from '../../store/DailyWeatherStore';
import { type HourWeather } from '../../store/HourlyWeatherStore';
import { Weather } from './components/Weather';
import { Card } from '../UI/Card';
import { Loader } from '../UI/Loader';
import './style.css'

export type IProps = {
	data: (DayWeather & HourWeather) | null
}

export const CardWeather: FC<IProps> = ({ data }) => {
	return <Card className="card-weather">
		{ data ? <Weather { ...data } /> : <Loader /> }
	</Card>;
}
