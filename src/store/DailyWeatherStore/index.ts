import { makeAutoObservable } from 'mobx';
import { dateFormat, getIcon } from '../../helpers';

interface DayValue {
	dt: number
	temp: {
		max: number
		min: number
	}
	weather: [{
		id: string
		icon: string
	}]
}
export interface DayWeather {
	date: string
	tempMax?: number
	tempMin?: number
	icon: string
}
type DaysValueType = Array<DayValue | null>;
export type DaysWeatherType = Array<DayWeather | null>;
export interface IDailyStore {
	daily: DaysValueType
	setDaily: (value: DayValue[]) => void
	resetDaily: () => void
	getDaily: () => DaysWeatherType
}

export const createDailyStore = (): IDailyStore => {
	return makeAutoObservable({
		daily: Array(7).fill(null),
		setDaily(value: DayValue[]) {
			this.daily = value.slice(1);
		},
		resetDaily() {
			this.daily = Array(7).fill(null);
		},
		getDaily(): DaysWeatherType {
			return this.daily.map(item => {
				if (item) {
					return {
						date: dateFormat(item.dt),
						tempMax: Math.trunc(item.temp.max),
						tempMin: Math.trunc(item.temp.min),
						icon: getIcon(item.weather[0].icon, true),
					}
				}
				return null;
			});
		}
	})
};
