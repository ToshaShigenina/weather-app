import React, { useRef, useState, useEffect } from 'react';
import { useResize } from '../../hooks';
import Btn from './Btn';
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
const getMinBreackpoint = (breackpoints: Record<number, boolean>): number => {
    const bpTemp = Object.entries(breackpoints)
        .filter(([_, value]) => value)
        .map(([key, _]) => Number(key));
    return Math.min(...bpTemp);
};
const getBreackpointsMap = (breackpoints: Record<number, SliderBreackpointProps>, width: number): Record<number, boolean> => {
    const keys = Object.keys(breackpoints);
    return keys.reduce((obj, key) => {
        if (!isNaN(Number(key))) {
            return {
                ...obj,
                [key]: Number(key) >= width
            }
        }
        return obj;
    }, {});
};
const Slider: React.FC<SliderProps> = ({ children = null, slidesPerView = 1, marginBetweenSlides = 0, breackpoints, ...otherProps }) => {
    const sliderWrapperRef = useRef(null);
    const { width: windowWidth } = useResize();
    const [currentSlide, setCurrentSlide] = useState(1);
    const [slideWidth, setSlideWidth] = useState(0);
    const [countSlides, setCountSlides] = useState(0);
    const [countSlidesPerView, setCountSlidesPerView] = useState(slidesPerView);
    const [sliderGap, setSliderGap] = useState(marginBetweenSlides);
    const [translate, setTranslate] = useState(0);
    const [sliderKeys, setSliderKeys] = useState<symbol[]>([]);
    const context: SliderContextType = {
        width: slideWidth,
        margin: sliderGap,
        sliderKeys,
        addSliderKey: (key: symbol) => {
            sliderKeys.push(key);
            setSliderKeys(sliderKeys);
        }
    };

    const calcSlideWidth = () => {
        const count = getCountSlides(children);
        setCountSlides(count);
        if (count > 0 && sliderWrapperRef && sliderWrapperRef.current) {
            const sliderWidth = (sliderWrapperRef.current as HTMLDivElement).clientWidth
            setSlideWidth((sliderWidth - ((countSlidesPerView - 1) * sliderGap)) / countSlidesPerView);
        }
    };
    useEffect(() => {
        if (breackpoints) {
            const bpMap = getBreackpointsMap(breackpoints, windowWidth);
            if (Object.values(bpMap).every((item) => !item)) {
                setCountSlidesPerView(slidesPerView);
                setSliderGap(marginBetweenSlides);
            } else {
                const bpMin = getMinBreackpoint(bpMap);
                const bpTemp = breackpoints[bpMin];
                if (bpTemp.slidesPerView !== undefined) setCountSlidesPerView(bpTemp.slidesPerView);
                if (bpTemp.marginBetweenSlides !== undefined) setSliderGap(bpTemp.marginBetweenSlides);
            }
        }
        calcSlideWidth();
    }, [windowWidth]);
    useEffect(() => {
        calcSlideWidth();
    }, [children, countSlidesPerView, sliderGap]);

    const clickToPrevBtn = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1)
            setTranslate(translate + (slideWidth + sliderGap));
        }
    };
    const clickToNextBtn = () => {
        if (currentSlide <= countSlides - countSlidesPerView) {
            setCurrentSlide(currentSlide + 1)
            setTranslate(translate - (slideWidth + sliderGap));
        }
    };

    return (
        <SliderContextProvider value={ context }>
            <div className="slider" { ...otherProps }>
                <div className="slider__wrapper" ref={ sliderWrapperRef }>
                    <div
                        className="slider__container"
                        style={ { transform: `translateX(${translate}px)` } }
                    >
                        { children }
                    </div>
                </div>
                <Btn
                    onClick={ clickToPrevBtn }
                    direction="prev"
                    disabled={ currentSlide <= 1 }
                />
                <Btn
                    onClick={ clickToNextBtn }
                    direction="next"
                    disabled={ currentSlide > countSlides - countSlidesPerView }
                />
            </div>
        </SliderContextProvider>
    );
};

export default Slider;