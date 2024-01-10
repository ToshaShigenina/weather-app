import { makeAutoObservable } from 'mobx';
import { timeFormat, getIcon } from '../../helpers';

interface HourValue {
	dt: number
	temp: number
	weather: [{
		id: string
		icon: string
	}]
}
export interface HourWeather {
	date: string
	temp?: number
	icon: string
}
type HoursValueType = Array<HourValue | null>
export type HoursWeatherType = Array<HourWeather | null>
export interface IHourlyStore {
	hourly: HoursValueType
	setHourly: (value: HourValue[]) => void
	resetHourly: () => void
	getHourly: () => HoursWeatherType
}

export const createHourlyStore = (): IHourlyStore => {
	return makeAutoObservable({
		hourly: Array(12).fill(null),
		setHourly(value: HourValue[]) {
			this.hourly = value.slice(0, 12);
		},
		resetHourly() {
			this.hourly = Array(12).fill(null);
		},
		getHourly(): Array<HourWeather | null> {
			return this.hourly.map(item => {
				if (item) {
					return {
						date: timeFormat(item.dt),
						temp: Math.trunc(item.temp),
						icon: getIcon(item.weather[0].icon, true),
					}
				}
				return null;
			})
		}
	})
};
