import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SliderBtn from './SlideBtn/index';

import './style.css';

const Slider = ({ children, slidesPerView = 1, marginBetweenSlides = 0, breackpoints = {} }) => {
    const sliderRef = useRef(null);
    const sliderContainerRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(2);
    const [slideWidth, setSlideWidth] = useState(0);
    const countSlides = children.length;
    const [countSlidesPerView, setCountSlidesPerView] = useState(slidesPerView);
    const [translate, setTranslate] = useState(0);

    useEffect(() => {
        console.log(slideWidth)
        if(sliderRef.current && sliderContainerRef.current) {
            setSlideWidth((sliderContainerRef.current.clientWidth - marginBetweenSlides * (countSlidesPerView - 1)) / countSlidesPerView);
            sliderRef.current.querySelectorAll('.slide').forEach((item, i) => {
                if(i) item.style.marginLeft = `${marginBetweenSlides}`;
                item.style.width = `${slideWidth}`;
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliderRef.current, sliderContainerRef.current]);

    const toPrevBtn = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1);
            if (countSlides > countSlidesPerView && translate < 0) {
                setTranslate((slideWidth + marginBetweenSlides) * (currentSlide - 1))
            }
        } else {
            setTranslate((sliderContainerRef.current.scrollWidth - sliderContainerRef.current.clientWidth) * -1);
            setCurrentSlide(countSlides - countSlidesPerView + 1);
        }
        console.log(currentSlide)
        console.log(translate)
    };
    const toNextBtn = () => {};

    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider__wrapper">
                <div className="slider__container" ref={sliderContainerRef} style={{
                    transform: `translateX(${translate}px)`
                }}>
                    {React.Children.toArray(children)}
                </div>
            </div>
            <SliderBtn handler={toPrevBtn} direction="prev"/>
            <SliderBtn handler={toNextBtn} direction="next"/>
        </div>
    );
};

Slider.propTypes = {
    children: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
        const name = new RegExp(componentName);
        if (!name.test(propValue[key].type.name)) {
            return new Error('Prop type is not equal ' + componentName);
        }
    }),
    slidesPerView: PropTypes.number,
    marginBetweenSlides: PropTypes.number,
    breackpoints: PropTypes.object,
}

export default Slider;