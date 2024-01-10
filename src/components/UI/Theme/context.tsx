import React, { FC, HTMLAttributes, useEffect, createContext } from 'react';
import { useLocalStorage } from "../../../hooks";

export type ThemeNameType = 'dark' | 'light'
export type ThemeContextType = {
	theme: ThemeNameType | string,
	setTheme: (theme: ThemeNameType) => void
}

export const THEME_KEY = 'theme';
export const THEME_CLASS_NAME = 'theme-dark';

const getInitialTheme = (): ThemeNameType => {
	const userMedia = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)');
	return (userMedia && userMedia.matches) ? 'dark' : 'light';
};
const changeThemeClass = (theme: ThemeNameType) => {
	if (theme === 'dark') {
		document.body.classList.add(THEME_CLASS_NAME);
	} else {
		document.body.classList.remove(THEME_CLASS_NAME);
	}
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const ThemeContextProvider: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
	const [theme, setTheme] = useLocalStorage<ThemeNameType>(THEME_KEY, getInitialTheme());
	const ctx: ThemeContextType = { theme, setTheme };
	const changeTheme = (): void => {
		setTheme(theme as ThemeNameType);
		changeThemeClass(theme as ThemeNameType);
	};
	useEffect(changeTheme, []);
	useEffect(changeTheme, [theme]);

	return (
		<ThemeContext.Provider value={ ctx }>
			{ children }
		</ThemeContext.Provider>
	);
};