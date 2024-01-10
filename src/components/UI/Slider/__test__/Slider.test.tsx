import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mountTest } from '../../../../tests';
import { Slider, type SliderProps } from '../components/Slider';
import { Slide } from '../components/Slide';

const testId = 'slider';
const testIdSlide = 'slide';

describe('Slider', () => {
	mountTest<SliderProps>(Slider);

	it('рендеринг пустого слайдера с дефолтными параметрами', () => {
		render(<Slider data-testid={ testId } />);
		const btns = screen.getAllByRole('button');
		expect(screen.getByTestId(testId)).toBeInTheDocument();
		expect(screen.getByTestId(testId)).toHaveClass('slider');
		expect(btns.length).toEqual(2);
		expect(btns[0]).toHaveClass('slider__btn', 'slider__btn-prev');
		expect(btns[1]).toHaveClass('slider__btn', 'slider__btn-next');
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});

	it('рендеринг слайдера с дефолтными параметрами', () => {
		const slidesContent = ['Slide 1', 'Slide 2', 'Slide 3'];
		render(
			<Slider data-testid={ testId }>
				{ slidesContent.map((text, i) => {
					return <Slide key={ i } data-testid={ testIdSlide }>{ text }</Slide>
				}) }
			</Slider>
		);
		const slides = screen.getAllByTestId(testIdSlide);

		expect(slides.length).toEqual(slidesContent.length);
		slides.forEach((item, i) => {
			expect(item).toHaveClass('slide');
			expect(item).toHaveStyle({
				width: '100%',
				'margin-left': '0px',
			});
			expect(item.textContent).toEqual(slidesContent[i]);
		});
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});

	it('рендеринг слайдера с отступами', () => {
		const slidesContent = ['Slide 1', 'Slide 2', 'Slide 3'];
		render(
			<Slider data-testid={ testId } marginBetweenSlides={ 10 }>
				{ slidesContent.map((text, i) => {
					return <Slide key={ i } data-testid={ testIdSlide }>{ text }</Slide>
				}) }
			</Slider>
		);
		const slides = screen.getAllByTestId(testIdSlide);

		slides.forEach((item, i) => {
			expect(item).toHaveStyle({
				width: '100%',
				'margin-left': !i ? '0px' : '10px',
			});
		});
		expect(screen.getByTestId(testId)).toMatchSnapshot();
	});

	it('слайды переключаются правильно', () => {
		const slidesContent = ['Slide 1', 'Slide 2'];
		render(
			<Slider data-testid={ testId }>
				{ slidesContent.map((text, i) => {
					return <Slide key={ i } data-testid={ testIdSlide }>{ text }</Slide>
				}) }
			</Slider>
		);
		const btns = screen.getAllByRole('button');

		expect(screen.getByTestId(testId)).toMatchSnapshot();
		expect(btns[0]).toBeDisabled();
		expect(btns[1]).not.toBeDisabled();
		fireEvent.click(btns[1]);
		expect(screen.getByTestId(testId)).toMatchSnapshot();
		expect(btns[0]).not.toBeDisabled();
		expect(btns[1]).toBeDisabled();
	});
});