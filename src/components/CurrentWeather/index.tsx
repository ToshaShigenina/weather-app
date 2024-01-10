import React, { FC } from "react";
import { observer } from 'mobx-react-lite';
import { useRootStore } from "../../store";
import { Card } from "./components/Card";
import { Loader } from "../UI/Loader";
import "./style.css";

export const CurrentWeather: FC = observer(() => {
	const { current } = useRootStore();
	return <div className="current">
		{ current.current ? <Card /> : <Loader isAbs /> }
	</div>;
})