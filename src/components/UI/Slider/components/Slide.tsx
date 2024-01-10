import React, { FC, HTMLAttributes, useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { SliderContext, type SliderContextType } from '../context';

export const Slide: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', style = {}, ...otherProps }) => {
    const slideKey = Symbol();
    const [slideIndex, setSlideIndex] = useState(0);
    const sliderCtx = useContext<SliderContextType | null>(SliderContext);
    const width = sliderCtx && sliderCtx.width > 0
        ? sliderCtx.width + 'px'
        : '100%';
    const marginLeft = sliderCtx?.margin || 0;

    useEffect(() => {
        if (sliderCtx && sliderCtx.addSliderKey && !sliderCtx.sliderKeys.includes(slideKey)) {
            setSlideIndex(sliderCtx.sliderKeys.length);
            sliderCtx.addSliderKey(slideKey);
        }
    }, []);
    return (
        <div
            className={ cn(className, 'slide') }
            style={ {
                ...style,
                width,
                marginLeft: slideIndex ? marginLeft : 0,
            } }
            { ...otherProps }
        >
            { children }
        </div>
    );
};
