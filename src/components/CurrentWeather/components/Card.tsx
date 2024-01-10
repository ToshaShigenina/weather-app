import React, { FC } from 'react';
import { useRootStore } from "../../../store";
import { Icon } from "../../UI/Icon";

export const Card: FC = () => {
	const { current, location } = useRootStore();
	return <>
		<img className="current__icon" src={ current.getIcon() } alt={ current.getDescription() } />
		<div className="current__temp">
			{ current.getTemp() } <small>°C</small>
		</div>
		<div className="current__description">{ current.getDescription() }</div>
		<div className="current__text">Ощущается как { current.getFeelsTemp() }</div>
		<div className="current__date">
			<span>Сегодня</span>
			<span>{ current.getDate() }</span>
		</div>
		<div className="current__city">
			<Icon type="point" size="lg" />
			{ location.getCity() }
		</div>
	</>;
}
