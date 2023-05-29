import React from 'react';
import { render, screen } from '@testing-library/react';
import { mountTest } from '../../../tests';

import Loader from '../Loader';

describe('Loader', () => {
	const testId = 'loader';

	mountTest(Loader);

	it('snapshot для лоадера', () => {
		render(<Loader data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toHaveClass('loader');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
	it('добавляется дополнительный класс', () => {
		render(<Loader className="test-class" data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toHaveClass('loader');
		expect(screen.getByTestId(testId)).toHaveClass('test-class');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
});