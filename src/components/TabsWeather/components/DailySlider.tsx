import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CardWeather } from '../../CardWeather';
import { Slider } from '../../UI/Slider';
import { useRootStore } from '../../../store';
import { sliderOptions } from '../settings';

export const DailySlider: FC = observer(() => {
	const { daily } = useRootStore();
	return <Slider { ...sliderOptions }>
		{
			daily.getDaily() && daily.getDaily()
				.map((data, i) => (<Slider.Slide key={ 'daily-slide-' + i }>
					<CardWeather data={ data } />
				</Slider.Slide>))
		}
	</Slider>;
})
