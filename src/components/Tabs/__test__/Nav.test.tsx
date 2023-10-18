import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mountTest } from '../../../tests';

import Nav, { type NavProps } from '../Nav';

const testId = 'nav';

describe('Nav', () => {
	mountTest<NavProps>(Nav);

	it('компонент рендерится с тремя кнопками, активна первая', () => {
		const labels = ['Item 1', 'Item 2', 'Item 3'];
		render(<Nav items={ labels } data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
		const items = screen.getByTestId(testId).querySelectorAll('li');
		items.forEach((li, i) => {
			if (i === 0) expect(li).toHaveClass('active');
			else expect(li).not.toHaveClass('active');
			expect(li).toHaveClass('tabs__nav-item');
			expect(li.textContent).toContain(labels[i]);
		});
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});

	it('компонент рендерится с тремя кнопками, активна вторая', () => {
		const labels = ['Item 1', 'Item 2', 'Item 3'];
		render(<Nav items={ labels } active={ 1 } data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
		const items = screen.getByTestId(testId).querySelectorAll('li');
		items.forEach((li, i) => {
			if (i === 1) expect(li).toHaveClass('active');
			else expect(li).not.toHaveClass('active');
			expect(li).toHaveClass('tabs__nav-item');
			expect(li.textContent).toContain(labels[i]);
		});
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});

	it('активная кнопка изменяется при клике', () => {
		const labels = ['Item 1', 'Item 2'];
		const onClick = jest.fn();
		const TestComponent: React.FC = () => {
			const [active, setActive] = React.useState(0);
			const changeActive = (index: number) => {
				onClick();
				setActive(index);
			};
			return (<Nav
				items={ labels }
				active={ active }
				onClick={ changeActive }
				data-testid={ testId }
			/>);
		};
		render(<TestComponent />);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
		expect(screen.getByTestId(testId)).toMatchSnapshot();
		const items = screen.getByTestId(testId).querySelectorAll('li');
		expect(items[0]).toHaveClass('active');
		expect(items[1]).not.toHaveClass('active');
		const btn = items[1].querySelector('button');
		expect(btn).not.toEqual(null);
		btn && fireEvent.click(btn);
		expect(onClick).toHaveBeenCalled();
		expect(items[0]).not.toHaveClass('active');
		expect(items[1]).toHaveClass('active');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
});