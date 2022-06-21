import React from 'react';
import PropTypes from 'prop-types';

const SliderBtn = ({ handler, direction = '' }) => {
    return (
        <button className={direction ? `slider__btn slider__btn-${direction}` : "slider__btn"}
            onClick={handler}></button>
    );
};

SliderBtn.propTypes = {
    handler: PropTypes.func.isRequired,
    direction: PropTypes.oneOf(['prev', 'next']),
};

export default SliderBtn;