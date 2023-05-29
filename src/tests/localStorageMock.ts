export const localStorageMock = (() => {
	let store: Record<string, unknown> = {};
	return {
		setItem(key: string, value: unknown) {
			store[key] = value;
		},
		getItem(key: string) {
			return store[key] || null;
		},
		removeItem(key: string) {
			delete store[key]
		},
		getAll() {
			return store;
		},
		clear() {
			store = {};
		}
	}
})();
