import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import SliderBtn from './SliderBtn';

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
const Slider: React.FC<SliderProps> = ({ children, slidesPerView = 1, marginBetweenSlides = 0, breackpoints = {}, ...otherProps }) => {
    const sliderRef = useRef(null);
    const sliderContainerRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [slideWidth, setSlideWidth] = useState(100);
    const countSlides = asArray(children).length;
    const [countSlidesPerView, setCountSlidesPerView] = useState(slidesPerView);
    const [translate, setTranslate] = useState(0);

    useEffect(() => {
        console.log(asArray(children))
    }, [children]);

    const clickToPrevBtn = () => {
        setCurrentSlide(currentSlide + 1)
    };
    const clickToNextBtn = () => {
        setCurrentSlide(currentSlide - 1)
    };

    return (
        <div className="slider" ref={ sliderRef } { ...otherProps }>
            <div className="slider__wrapper">
                <div className="slider__container" ref={ sliderContainerRef }>
                    { children }
                </div>
            </div>
            <SliderBtn onClick={ clickToPrevBtn } direction="prev" />
            <SliderBtn onClick={ clickToNextBtn } direction="next" />
        </div>
    );
};

export default Slider;