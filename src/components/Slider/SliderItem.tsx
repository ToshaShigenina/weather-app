import React, { useContext } from 'react';
import cn from 'classnames';
import { SliderContext, type SliderContextType } from './context';

import './css/slide.css';

const SliderItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', style = {}, ...otherProps }) => {
    const sliderCtx = useContext<SliderContextType | null>(SliderContext);
    const width = sliderCtx && sliderCtx.width > 0
        ? sliderCtx.width + 'px'
        : '100%';
    const slideStyle = {
        ...style,
        width,
    }
    return (
        <div className={ cn(className, 'slide') } style={ slideStyle } { ...otherProps }>
            { children }
        </div>
    );
};

export default SliderItem;