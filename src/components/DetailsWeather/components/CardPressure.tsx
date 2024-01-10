import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../../UI/Card';
import { useRootStore } from '../../../store';

export const CardPressure: FC = observer(() => {
	const { current } = useRootStore();
	return <Card className="card-detail" extra>
		<div className="card-detail__title">Давление</div>
		<div className="card-detail__value">
			{ current.getPressure() } <small className="card-detail__abbr">мм рт.ст.</small>
		</div>
	</Card>;
})
