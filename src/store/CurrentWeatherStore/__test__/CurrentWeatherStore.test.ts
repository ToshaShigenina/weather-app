import { createCurrentWeatherStore } from "../";
import { weatherMock } from '../../../mock/data';
import { getIcon, dateFormat } from '../../../helpers';

describe('Тестирование CerrentWeatherStore', () => {
	it('Инициируется пустой стор', () => {
		const currentStore = createCurrentWeatherStore();
		expect(currentStore).not.toEqual(null);
		expect(currentStore.current).toEqual(null);
	});

	it('Запись в стор', () => {
		const currentStore = createCurrentWeatherStore();
		// @ts-ignore
		currentStore.setCurrentWeather(weatherMock.current);
		expect(currentStore.current).not.toEqual(null);
	});

	describe('Тестирование get методов', () => {
		const currentStore = createCurrentWeatherStore();
		// @ts-ignore
		currentStore.setCurrentWeather(weatherMock.current);

		it('getDate возвращает форматированную дату', () => {
			expect(currentStore.getDate()).toEqual(dateFormat(weatherMock.current.dt));
		});

		it('getTemp возвращает округленную текущую температуру', () => {
			expect(currentStore.getTemp()).toEqual(Math.floor(weatherMock.current.temp));
		});

		it('getFeelsTemp возвращает округленную температуру ощущения', () => {
			expect(currentStore.getFeelsTemp()).toEqual(Math.floor(weatherMock.current.feels_like));
		});

		it('getDescription возвращает описание', () => {
			expect(currentStore.getDescription()).toEqual(weatherMock.current.weather[0].description);
		});

		it('getIcon возвращает ссылку на картирку', () => {
			expect(currentStore.getIcon()).toEqual(getIcon(weatherMock.current.weather[0].icon));
		});

		it('getWindSpeed возвращает скорость ветра', () => {
			expect(currentStore.getWindSpeed()).toEqual(Math.floor(weatherMock.current.wind_speed));
		});

		it('getWindDeg возвращает угол ветра', () => {
			expect(currentStore.getWindDeg()).toEqual(`${weatherMock.current.wind_deg}deg`);
		});

		it('getWindDirection возвращает направление ветра', () => {
			expect(currentStore.getWindDirection()).toEqual('СВ');
		});

		it('getPressure возвращает давление', () => {
			expect(currentStore.getPressure()).toEqual(Math.floor(((weatherMock.current.pressure) * 100) / 133.3));
		});

		it('getHumidity возвращает влажность', () => {
			expect(currentStore.getHumidity()).toEqual(weatherMock.current.humidity);
		});

		it('getVisibility возвращает видимость', () => {
			expect(currentStore.getVisibility()).toEqual(Math.floor((weatherMock.current.visibility) / 1000));
		});
	});
})