import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CardWeather } from '../../CardWeather';
import { Slider } from '../../UI/Slider';
import { useRootStore } from '../../../store';
import { sliderOptions } from '../settings';

export const HourlySlider: FC = observer(() => {
	const { hourly } = useRootStore();
	return <Slider { ...sliderOptions }>
		{
			hourly.getHourly() && hourly.getHourly()
				.map((data, i) => (<Slider.Slide key={ 'hourly-slide-' + i }>
					<CardWeather data={ data } />
				</Slider.Slide>))
		}
	</Slider>;
})
