import React, { useRef, useState, useEffect } from 'react';
import SliderBtn from './SliderBtn';
import { SliderContextProvider, type SliderContextType } from './context';

import './css/slider.css';

export type SliderBreackpointProps = {
    slidesPerView?: number,
    marginBetweenSlides?: number,
}
export interface SliderProps extends React.HTMLAttributes<HTMLDivElement>, SliderBreackpointProps {
    breackpoints?: Record<number, SliderBreackpointProps>,
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
const Slider: React.FC<SliderProps> = ({ children = null, slidesPerView = 1, marginBetweenSlides = 0, breackpoints = {}, ...otherProps }) => {
    const sliderRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [slideWidth, setSlideWidth] = useState(0);
    const [countSlides, setCountSlides] = useState(0);
    const [countSlidesPerView, setCountSlidesPerView] = useState(slidesPerView);
    const [translate, setTranslate] = useState(0);
    const [sliderKeys, setSliderKeys] = useState<symbol[]>([]);
    const context: SliderContextType = {
        width: slideWidth,
        margin: marginBetweenSlides,
        sliderKeys,
        addSliderKey: (key: symbol) => {
            sliderKeys.push(key);
            setSliderKeys(sliderKeys);
        }
    };

    useEffect(() => {
        const count = getCountSlides(children);
        setCountSlides(count);
        if (count > 0 && sliderWrapperRef && sliderWrapperRef.current) {
            const sliderWidth = (sliderWrapperRef.current as HTMLDivElement).clientWidth
            setSlideWidth((sliderWidth - ((countSlidesPerView - 1) * marginBetweenSlides)) / countSlidesPerView);
        }
    }, [children, countSlidesPerView, marginBetweenSlides]);

    const clickToPrevBtn = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1)
            setTranslate(translate + (slideWidth + marginBetweenSlides));
        }
    };
    const clickToNextBtn = () => {
        if (currentSlide <= countSlides - countSlidesPerView) {
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
                        style={ { transform: `translateX(${translate}px)` } }
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