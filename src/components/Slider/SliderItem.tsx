import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { SliderContext, type SliderContextType } from './context';

import './css/slide.css';

const SliderItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', style = {}, ...otherProps }) => {
    const slideKey = Symbol();
    const sliderCtx = useContext<SliderContextType | null>(SliderContext);
    const width = sliderCtx && sliderCtx.width > 0
        ? sliderCtx.width + 'px'
        : '100%';
    const [marginLeft, setMarginLeft] = useState<number>(sliderCtx?.margin || 0)

    useEffect(() => {
        if (sliderCtx && sliderCtx.addSliderKey && !sliderCtx.sliderKeys.includes(slideKey)) {
            const index = sliderCtx.sliderKeys.length;
            sliderCtx.addSliderKey(slideKey);
            if (marginLeft && !index) setMarginLeft(0);
        }
    }, []);
    return (
        <div
            className={ cn(className, 'slide') }
            style={ {
                ...style,
                width,
                marginLeft
            } }
            { ...otherProps }
        >
            { children }
        </div>
    );
};

export default SliderItem;