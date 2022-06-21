import React from 'react';
import PropTypes from "prop-types";

import './style.css';

const Loader = ({ className = '' }) => {
    return (
        <div className={className + " loader"}>
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

Loader.propTypes = {
    className: PropTypes.string
}

export default Loader;