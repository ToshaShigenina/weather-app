import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../../UI/Card';
import { Icon } from '../../UI/Icon';
import { useRootStore } from '../../../store';

export const CardWind: FC = observer(() => {
	const { current } = useRootStore();
	return <Card className="card-detail" extra>
		<div className="card-detail__title">Скорость ветра</div>
		<div className="card-detail__value">
			{ current.getWindSpeed() } <small>м/с</small>
		</div>
		<div className="card-detail__info">
			{ /* @ts-ignore */ }
			<span className="card-detail__icon" style={ { '--deg': current.getWindDeg() } }>
				<Icon type="arrow" size="lg" />
			</span>
			<span>{ current.getWindDirection() }</span>
		</div>
	</Card>;
})
