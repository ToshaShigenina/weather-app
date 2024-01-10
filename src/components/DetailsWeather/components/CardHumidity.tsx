import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../../UI/Card';
import { useRootStore } from '../../../store';

export const CardHumidity: FC = observer(() => {
	const { current } = useRootStore();
	return <Card className="card-detail" extra>
		<div className="card-detail__title">Влажность</div>
		<div className="card-detail__value">
			{ current.getHumidity() } <small>%</small>
		</div>
	</Card>;
})
