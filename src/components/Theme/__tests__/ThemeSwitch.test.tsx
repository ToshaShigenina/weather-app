import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mountTest, localStorageMock, mathcMediaMock } from '../../../tests';

import ThemeSwitch from '../ThemeSwitch';
import { ThemeContextProvider, type ThemeNameType } from '../context';

const testId = 'switch';

describe('ThemeSwitch', () => {
	beforeAll(() => {
		Object.defineProperty(
			window,
			'matchMedia',
			mathcMediaMock(() => {
				return {
					matches: false,
				}
			})
		);
	})

	mountTest(ThemeSwitch);

	it('отрабатывает изменение темы', () => {

		const { baseElement } = render(
			<ThemeContextProvider>
				<ThemeSwitch data-testid={ testId } />
			</ThemeContextProvider>
		);

		expect(screen.getByTestId(testId)).toMatchSnapshot();
		expect(baseElement).toMatchSnapshot();
		expect(baseElement).not.toHaveClass('theme-dark');
		fireEvent.click(screen.getByRole('checkbox'));
		expect(baseElement).toHaveClass('theme-dark');
		expect(baseElement).toMatchSnapshot();
	});
	it('сразу устанавливается темная тема из темы браузера', () => {
		Object.defineProperty(
			window,
			'matchMedia',
			mathcMediaMock(() => {
				return {
					matches: true,
				}
			})
		);

		const { baseElement } = render(
			<ThemeContextProvider>
				<ThemeSwitch />
			</ThemeContextProvider>
		);

		expect(baseElement).toMatchSnapshot();
		expect(baseElement).toHaveClass('theme-dark');
		fireEvent.click(screen.getByRole('checkbox'));
		expect(baseElement).not.toHaveClass('theme-dark');
		expect(baseElement).toMatchSnapshot();
	});
	it('устанавливается светлая тема из localStorage', () => {
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock
		});

		const { baseElement } = render(
			<ThemeContextProvider>
				<ThemeSwitch />
			</ThemeContextProvider>
		);

		expect(baseElement).not.toHaveClass('theme-dark');
		expect(baseElement).toMatchSnapshot();
	});
});