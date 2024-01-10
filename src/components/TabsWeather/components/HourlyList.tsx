import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CardWeather } from '../../CardWeather';
import { useRootStore } from '../../../store';

export const HourlyList: FC = observer(() => {
	const { hourly } = useRootStore();
	return <div className="weather-list">
		{
			hourly.getHourly() && hourly.getHourly()
				.map((data, i) => (<div key={ 'hourly-slide-mobile-' + i } className="weather-list__item">
					<CardWeather data={ data } />
				</div>))
		}
	</div>;
})
