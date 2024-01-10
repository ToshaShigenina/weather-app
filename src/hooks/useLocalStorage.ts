import { useState, useEffect } from 'react';

type StorageTuple<T> = [
	T,
	(value: T) => void,
	(key: string) => void
];

function getStorageValue<T>(key: string, defaultValue: T): T {
	const saved = localStorage.getItem(key);
	if (saved) {
		try {
			return JSON.parse(saved);
		} catch {
			return saved as T;
		}
	}
	return defaultValue;
};
const removeStorageValue = (key: string): void => {
	localStorage.removeItem(key);
};

export function useLocalStorage<T>(key: string, initialValue: T): StorageTuple<T> {
	const [value, setValue] = useState<T>(() => getStorageValue(key, initialValue));

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue, removeStorageValue];
};