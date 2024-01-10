import { makeAutoObservable } from 'mobx';

interface Coordinates {
	lat: string
	lon: string
}
export interface ILocationStore {
	city: string
	coordinates: Coordinates | null
	setCity: (city: string) => void
	setCoordinates: (lat: string, lon: string) => void
	clearCoordinates: () => void
	getCity: () => string
	getCoordinates: () => Coordinates | null
}
export const createLocationStore = (): ILocationStore => {
	return makeAutoObservable({
		city: 'Москва',
		coordinates: null as Coordinates | null,
		setCity(city: string) {
			this.city = city;
		},
		setCoordinates(lat: string, lon: string) {
			this.coordinates = {
				lat,
				lon,
			};
		},
		clearCoordinates() {
			this.coordinates = null;
		},
		getCity(): string {
			return this.city;
		},
		getCoordinates(): Coordinates | null {
			return this.coordinates;
		},
	})
};
