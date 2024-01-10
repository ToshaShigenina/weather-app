import { API } from "../../services/api";
import { API as API_MOCKS } from '../../mock/api';
import { createLocationStore, type ILocationStore } from "../LocationStore";
import { createCurrentWeatherStore, type ICurrentWeatherStore } from "../CurrentWeatherStore";
import { createDailyStore, type IDailyStore } from "../DailyWeatherStore";
import { createHourlyStore, type IHourlyStore } from "../HourlyWeatherStore";

export type RootStoreType = {
	location: ILocationStore
	current: ICurrentWeatherStore
	daily: IDailyStore
	hourly: IHourlyStore
	loadWeather: () => any
	loadCity: () => any
}
const api = process.env.NODE_ENV === 'production' ? API : API_MOCKS;
export const createRootStore = () => {
	return {
		location: createLocationStore(),
		current: createCurrentWeatherStore(),
		daily: createDailyStore(),
		hourly: createHourlyStore(),
		async loadWeather() {
			return api.getWeather(this.location.coordinates as unknown as Record<string, unknown>)
				.then((response) => {
					if (!response.code && !response.message) {
						this.current.setCurrentWeather(response.current);
						this.daily.setDaily(response.daily);
						this.hourly.setHourly(response.hourly);
					}
				});
		},
		async loadCity() {
			return api.getCity({ q: this.location.city })
				.then((response) => {
					if (response.length) {
						this.location.setCoordinates(response[0].lat, response[0].lon);
					}
				})
				.then(() => this.loadWeather());
		},
	};
};