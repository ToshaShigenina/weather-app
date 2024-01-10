import { makeAutoObservable } from 'mobx';
import { getIcon, dateFormat, getWindDirection } from '../../helpers';

interface Weather {
	id: number
	icon: string
	main: string
	description: string
}
interface WeatherValue {
	dt: number
	temp: number
	feels_like: number
	weather: Weather[]
	wind_speed: number
	wind_deg: number
	pressure: number
	humidity: number
	visibility: number
}
export interface CurrentWeather {
	date: number,
	temp: number,
	feels: number,
	description: string,
	icon: string
	windSpeed: number
	windDeg: number
	pressure: number
	humidity: number
	visibility: number
};
export interface ICurrentWeatherStore {
	current: CurrentWeather | null
	setCurrentWeather: (value: WeatherValue) => void
	getDate: () => string
	getTemp: () => number
	getFeelsTemp: () => number
	getDescription: () => string
	getIcon: () => string
	getWindSpeed: () => number
	getWindDeg: () => string
	getWindDirection: () => string
	getPressure: () => number
	getHumidity: () => number
	getVisibility: () => number
};

export const createCurrentWeatherStore = (): ICurrentWeatherStore => {
	return makeAutoObservable({
		current: null as CurrentWeather | null,
		setCurrentWeather(value: WeatherValue) {
			this.current = {
				date: value.dt,
				temp: value.temp,
				feels: value.feels_like,
				description: value.weather[0].description,
				icon: value.weather[0].icon,
				windSpeed: value.wind_speed,
				windDeg: value.wind_deg,
				pressure: value.pressure,
				humidity: value.humidity,
				visibility: value.visibility,
			}
		},
		getDate(): string {
			return dateFormat(this.current?.date || 0);
		},
		getTemp(): number {
			return Math.floor(this.current?.temp || 0);
		},
		getFeelsTemp(): number {
			return Math.floor(this.current?.feels || 0);
		},
		getDescription(): string {
			return this.current?.description || "";
		},
		getIcon(): string {
			if (this.current) {
				return getIcon(this.current.icon);
			}
			return '';
		},
		getWindSpeed(): number {
			return Math.floor(this.current?.windSpeed || 0);
		},
		getWindDeg(): string {
			return `${this.current?.windDeg || 0}deg`;
		},
		getWindDirection(): string {
			return getWindDirection(this.current?.windDeg || 0);
		},
		getPressure(): number {
			return Math.floor(((this.current?.pressure || 0) * 100) / 133.3);
		},
		getHumidity(): number {
			return this.current?.humidity || 0;
		},
		getVisibility(): number {
			return Math.floor((this.current?.visibility || 0) / 1000);
		},
	});
};