import { citiesMock, weatherMock } from './data';

const getMock = async (value: any) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(value), 1000);
	});
};

export const API = {
	async getCity(params: Record<string, unknown>) {
		console.log('city params');
		console.log(params);
		return getMock(citiesMock);
	},
	async getWeather(params: Record<string, unknown>) {
		console.log('weather params');
		console.log(params);
		return getMock(weatherMock);
	}
}