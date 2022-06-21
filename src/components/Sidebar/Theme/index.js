import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from "../../../context";

import Icon from '../../Icon/index';

import './style.css';

const Theme = ({ className = '' }) => {
    const { theme, toggleTheme } = useContext(AppContext);

    const onToggleTheme = () => {
        toggleTheme(theme === 'light' ? 'dark' : 'light')
    };

    return (
    <div className={className + ' theme'}>
        <input id="theme" 
            type="checkbox"
            className="theme__checkbox"
            checked={theme === 'dark'}
            onChange={onToggleTheme} />
        <label className="theme__switch" 
            htmlFor="theme" >
            <div className="theme__switch_item">
                <Icon name="switch" className="theme__icon"/>
            </div>
        </label>
    </div>
    );
};

Theme.propTypes = {
    className: PropTypes.string
};

export default Theme;