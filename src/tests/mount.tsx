import React, { ComponentType } from 'react';
import { render } from '@testing-library/react';

export function mountTest<T>(Component: ComponentType<T>, requiredType: T | null = null) {
	describe('монтирование и удаление компонента', () => {
		it('компонент монтируется и удаляется без ошибок', () => {
			if (requiredType) {
				const { unmount, rerender } = render(<Component { ...requiredType } />)

				expect(() => {
					rerender(<Component { ...requiredType } />);
					unmount();
				}).not.toThrow();
			} else {
				// @ts-ignore
				const { unmount, rerender } = render(<Component />)

				expect(() => {
					// @ts-ignore
					rerender(<Component />);
					unmount();
				}).not.toThrow();
			}
		});
	});
}
