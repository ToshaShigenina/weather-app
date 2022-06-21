import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const SliderItem = ({ children, className = '', style = {} }) => {
    return (
        <div className={className ? `slide ${className}` : 'slide'} 
            style={style}>
            {React.Children.only(children)}
        </div>
    );
};

SliderItem.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
}

export default SliderItem;