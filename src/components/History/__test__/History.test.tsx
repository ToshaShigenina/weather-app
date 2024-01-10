import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mountTest, localStorageMock } from '../../../tests';

import { History, type HistoryProps, HISTORY_KEY } from '../';

const testId = 'history';

describe('History', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock
		});
	});

	mountTest<HistoryProps>(History);

	it('рендерится пустой компонент, в LS устанавливается значение', () => {
		const { baseElement } = render(<History data-testid={ testId } />);
		expect(screen.queryByTestId(testId)).toEqual(null);
		expect(window.localStorage.getItem(HISTORY_KEY)).toEqual('[]');
		expect(baseElement).toMatchSnapshot();
	});
	it('история загружается из LS', () => {
		const historyItems = ['Item 1', 'Item 2', 'Item 3']
		window.localStorage.setItem(HISTORY_KEY, JSON.stringify(historyItems));
		render(<History data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
})
