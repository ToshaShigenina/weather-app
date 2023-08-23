import React from 'react';
import { render, screen } from '@testing-library/react';
import { mountTest } from '../../../tests';

import Icon, { type IconProps } from '../Icon';

const testId = 'icon';

describe('Icon', () => {
	mountTest<IconProps>(Icon, { type: 'point' } as IconProps);

	it('установлены дефолтная ширина и высота', () => {
		render(<Icon type="point" data-testid={ testId } />);
		expect(screen.getByTestId(testId).getAttribute('width')).toEqual('24');
		expect(screen.getByTestId(testId).getAttribute('height')).toEqual('24');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
	it('ширина и высота заданы через проп size', () => {
		render(<Icon type="point" size="lg" data-testid={ testId } />);
		expect(screen.getByTestId(testId).getAttribute('width')).toEqual('32');
		expect(screen.getByTestId(testId).getAttribute('height')).toEqual('32');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
	it('меняется тип иконки', () => {
		render(<Icon type="switch" data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
	it('добавляется дополнительный класс', () => {
		render(<Icon type="point" className="test-class" data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toHaveClass('svg-icon');
		expect(screen.getByTestId(testId)).toHaveClass('test-class');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
	it('задается кастомная ширина и высота', () => {
		render(<Icon type="point" width="100" height="150" data-testid={ testId } />);
		expect(screen.getByTestId(testId).getAttribute('width')).toEqual('100');
		expect(screen.getByTestId(testId).getAttribute('height')).toEqual('150');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
});