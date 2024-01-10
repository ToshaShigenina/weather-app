import React, { FC } from 'react'
import { type DayWeather } from '../../../store/DailyWeatherStore';
import { type HourWeather } from '../../../store/HourlyWeatherStore';

export const Weather: FC<DayWeather & HourWeather> = ({ date, icon, temp, tempMax, tempMin }) => {
	return <>
		<time className="card-weather__date">{ date }</time>
		<img className="card-weather__icon" src={ icon } />
		<div className="card-weather__temp">
			{ temp !== undefined && <span>{ temp }°C</span> }
			{ tempMax !== undefined && <span>{ tempMax }°C</span> }
			{ tempMin !== undefined && <span>{ tempMin }°C</span> }
		</div>
	</>;
}
