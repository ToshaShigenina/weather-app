import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mountTest, localStorageMock, mathcMediaMock } from '../../../tests';

import Switcher from '../Switcher';
import { ThemeContextProvider } from '../context';

const testId = 'switch';

describe('Switcher', () => {
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

	mountTest(Switcher);

	it('отрабатывает изменение темы', () => {
		const { baseElement } = render(
			<ThemeContextProvider>
				<Switcher data-testid={ testId } />
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
				<Switcher />
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
				<Switcher />
			</ThemeContextProvider>
		);

		expect(baseElement).not.toHaveClass('theme-dark');
		expect(baseElement).toMatchSnapshot();
	});
});