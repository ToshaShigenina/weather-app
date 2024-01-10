import { dateFormat, timeFormat, getIcon, getWindDirection } from "helpers";

describe('Проверка хелперов', () => {
	describe('Метод dateFormat', () => {
		it('При передаче 0 возвращается пустая строка', () => {
			expect(dateFormat(0)).toEqual('');
		});

		it('Возвращается форматированная дата', () => {
			expect(dateFormat(1704374393)).toEqual('чт, 4 янв.');
		});

		it('При передаче завтрашней даты возвращается Завтра', () => {
			const date = new Date();
			date.setDate(date.getDate() + 1);
			expect(dateFormat(Math.floor(date.getTime() / 1000))).toEqual('Завтра');
		});
	});

	describe('Метод timeFormat', () => {
		it('При передаче 0 возвращается 00:00', () => {
			expect(timeFormat(0)).toEqual('00:00');
		});

		it('Возвращается форматированной время', () => {
			expect(timeFormat(1704376800)).toEqual('19:00');
		});
	});

	describe('Метод getIcon', () => {
		it('Возвращается ссылка на большую картинку', () => {
			expect(getIcon('12i')).toEqual('http://openweathermap.org/img/wn/12i@4x.png');
		});

		it('Возвращается ссылка на маленькую картинку', () => {
			expect(getIcon('12i', true)).toEqual('http://openweathermap.org/img/wn/12i@2x.png');
		});
	});

	describe('Метод getWindDirection', () => {
		it('Возвращается север', () => {
			expect(getWindDirection(0)).toEqual('С');
		});

		it('Возвращается северо-восток', () => {
			expect(getWindDirection(40)).toEqual('СВ');
		});

		it('Возвращается восток', () => {
			expect(getWindDirection(90)).toEqual('В');
		});

		it('Возвращается юго-восток', () => {
			expect(getWindDirection(130)).toEqual('ЮВ');
		});

		it('Возвращается юг', () => {
			expect(getWindDirection(180)).toEqual('Ю');
		});

		it('Возвращается юго-запад', () => {
			expect(getWindDirection(210)).toEqual('ЮЗ');
		});

		it('Возвращается запад', () => {
			expect(getWindDirection(260)).toEqual('З');
		});

		it('Возвращается северо-запад', () => {
			expect(getWindDirection(300)).toEqual('СЗ');
		});
	});
});