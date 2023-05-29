import React from 'react';

export type ThemeNameType = 'dark' | 'light'
export type ThemeContextType = {
	theme: ThemeNameType,
	setTheme: (theme: ThemeNameType) => void
}
const getInitialTheme: () => ThemeNameType = () => {
	if (window) {
		const initialTheme = window.localStorage.getItem('theme');
		if (initialTheme) {
			return initialTheme as ThemeNameType;
		}
		const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
		if (userMedia && userMedia.matches) {
			return 'dark';
		}
	}
	return 'light';
};
const setRawTheme = (theme: ThemeNameType) => {
	localStorage.setItem('theme', theme);
	if (theme === 'dark') {
		document.body.classList.add('theme-dark');
	} else {
		document.body.classList.remove('theme-dark');
	}
};

export const ThemeContext = React.createContext<ThemeContextType | null>(null);
export const ThemeContextProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
	const [theme, setTheme] = React.useState(getInitialTheme);
	const ctx: ThemeContextType = {
		theme,
		setTheme
	};
	React.useEffect(() => {
		setRawTheme(theme);
	});
	React.useEffect(() => {
		setRawTheme(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={ ctx }>
			{ children }
		</ThemeContext.Provider>
	);
};