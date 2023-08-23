import React from 'react';
import { render, screen } from '@testing-library/react';
import { mountTest } from '../../../tests';

import Sprite from '../Sprite';

const testId = 'sprite';

describe('Sprite', () => {
	mountTest(Sprite);

	it('спрайт добавляется в боди', () => {
		const { baseElement } = render(<Sprite />);
		const spriteElement = screen.getByTestId(testId);

		expect(spriteElement).toBeInTheDocument();
		expect(spriteElement).toHaveAttribute('id', testId);
		expect(spriteElement.parentElement).not.toEqual(null);
		expect(
			spriteElement.parentElement
			&& spriteElement.parentElement.tagName
		).toEqual('BODY');
		expect(baseElement).toMatchSnapshot();
	})
});