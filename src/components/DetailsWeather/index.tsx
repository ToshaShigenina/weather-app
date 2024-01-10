import React, { FC } from 'react';
import { CardHumidity } from './components/CardHumidity';
import { CardPressure } from './components/CardPressure';
import { CardVisibility } from './components/CardVisibility';
import { CardWind } from './components/CardWind';
import './style.css';

export const DetailsWeather: FC = () => {
	return <section className="weather-details">
		<h2 className="heading">Подробно на сегодня</h2>
		<div className="weather-details__container">
			<div className="weather-details__item">
				<CardWind />
			</div>
			<div className="weather-details__item">
				<CardHumidity />
			</div>
			<div className="weather-details__item">
				<CardVisibility />
			</div>
			<div className="weather-details__item">
				<CardPressure />
			</div>
		</div>
	</section>;
}
