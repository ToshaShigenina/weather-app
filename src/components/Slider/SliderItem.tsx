import React from 'react';
import cn from 'classnames';

import './css/slide.css';

const SliderItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...otherProps }) => {
    return (
        <div className={ cn(className, 'slide') } { ...otherProps }>
            { children }
        </div>
    );
};

export default SliderItem;