import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mountTest } from '../../../tests';

import Tabs, { type TabsProps, TabItem } from '../Tabs';

const testId = 'tabs';

describe('Tabs', () => {
	mountTest<TabsProps>(Tabs, {
		items: [
			{
				label: '',
				children: ''
			}
		]
	});

	it('компонент рендерится с двумя кнопками и контентом, активна первая кнопка и отображается первый контент', () => {
		const items = [
			{
				label: 'Item 1',
				children: 'Children 1',
			},
			{
				label: 'Item 2',
				children: 'Children 2',
			},
		];
		render(<Tabs items={ items } data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
		const navItems = screen.getByTestId(testId).querySelectorAll('li');
		const content = screen.getByTestId(testId).querySelector('.tabs__content');
		expect(navItems.length).toEqual(items.length);
		expect(content).not.toEqual(null);
		expect(navItems[0]).toHaveClass('active');
		expect(navItems[0].textContent).toContain(items[0].label);
		expect(navItems[1]).not.toHaveClass('active');
		expect(navItems[1].textContent).toContain(items[1].label);
		content && expect(content.textContent).toContain(items[0].children);
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});

	it('компонент рендерится с двумя кнопками и контентом, при клике на кнопку происходит изменение контента', () => {
		const items = [
			{
				label: 'Item 1',
				children: 'Children 1',
			},
			{
				label: 'Item 2',
				children: 'Children 2',
			},
		];
		render(<Tabs items={ items } data-testid={ testId } />);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
		const navItems = screen.getByTestId(testId).querySelectorAll('li');
		const content = screen.getByTestId(testId).querySelector('.tabs__content');
		expect(navItems.length).toEqual(items.length);
		expect(content).not.toEqual(null);
		expect(navItems[0]).toHaveClass('active');
		expect(navItems[0].textContent).toContain(items[0].label);
		expect(navItems[1]).not.toHaveClass('active');
		expect(navItems[1].textContent).toContain(items[1].label);
		content && expect(content.textContent).toContain(items[0].children);
		expect(screen.getByTestId(testId)).toMatchSnapshot();
		const btn = navItems[1].querySelector('button');
		expect(btn).not.toEqual(null);
		btn && fireEvent.click(btn);
		expect(navItems[0]).not.toHaveClass('active');
		expect(navItems[1]).toHaveClass('active');
		content && expect(content.textContent).toContain(items[1].children);
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});
})