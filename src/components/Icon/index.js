import React from "react";
import PropTypes from 'prop-types'

const Icon = ({ name, className = '' }) => {
    const path = require('../../assets/img/sprite.svg').default + `#${name}`;
    const useTemplate = `<use xlink:href=${path} />`
    
    return (
        <svg className={className}
            dangerouslySetInnerHTML={{ __html: useTemplate}}></svg>
    )
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Icon;