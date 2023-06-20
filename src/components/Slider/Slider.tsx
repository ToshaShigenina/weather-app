import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import SliderItem from './SliderItem';
import SliderBtn from './SliderBtn';
import { SliderContextProvider, type SliderContextType } from './context';

import './css/slider.css';

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
    slidesPerView?: number,
    marginBetweenSlides?: number,
    breackpoints?: Record<number, string>
}

const asArray = (children: React.ReactNode): Array<React.ReactNode> => {
    if (children) {
        if (Array.isArray(children)) {
            return [...children];
        }
        return [children];
    }
    return [];
};
const getCountSlides = (children: React.ReactNode): number => {
    return asArray(children).length
};
const Slider: React.FC<SliderProps> = ({ children, slidesPerView = 1, marginBetweenSlides = 0, breackpoints = {}, ...otherProps }) => {
    const sliderRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [slideWidth, setSlideWidth] = useState(0);
    const [countSlides, setCountSlides] = useState(0);
    const [countSlidesPerView, setCountSlidesPerView] = useState(slidesPerView);
    const [translate, setTranslate] = useState(0);
    const context: SliderContextType = { width: slideWidth }

    useEffect(() => {
        const count = getCountSlides(children);
        setCountSlides(count);
        if (count > 0 && sliderWrapperRef && sliderWrapperRef.current) {
            const sliderWidth = (sliderWrapperRef.current as HTMLDivElement).clientWidth
            setSlideWidth((sliderWidth - ((slidesPerView - 1) * marginBetweenSlides)) / slidesPerView);
        }
    }, [children]);

    const clickToPrevBtn = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1)
            setTranslate(translate + (slideWidth + marginBetweenSlides));
        }
    };
    const clickToNextBtn = () => {
        if (currentSlide <= countSlides - slidesPerView) {
            setCurrentSlide(currentSlide + 1)
            setTranslate(translate - (slideWidth + marginBetweenSlides));
        }
    };

    return (
        <SliderContextProvider value={ context }>
            <div className="slider" ref={ sliderRef } { ...otherProps }>
                <div className="slider__wrapper" ref={ sliderWrapperRef }>
                    <div
                        className="slider__container"
                        style={ {
                            transform: `translateX(${translate}px)`,
                            gap: marginBetweenSlides
                        } }
                    >
                        { children }
                    </div>
                </div>
                <SliderBtn onClick={ clickToPrevBtn } direction="prev" />
                <SliderBtn onClick={ clickToNextBtn } direction="next" />
            </div>
        </SliderContextProvider>
    );
};

export default Slider;