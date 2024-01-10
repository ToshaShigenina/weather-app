import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CardWeather } from '../../CardWeather';
import { useRootStore } from '../../../store';

export const DailyList: FC = observer(() => {
	const { daily } = useRootStore();
	return <div className="weather-list">
		{
			daily.getDaily() && daily.getDaily()
				.map((data, i) => (<div key={ 'daily-slide-mobile-' + i } className="weather-list__item">
					<CardWeather data={ data } />
				</div>))
		}
	</div>;
})
