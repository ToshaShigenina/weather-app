import React from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import { ThemeContext, type ThemeNameType } from './context';

import './css/style.css';

const ThemeSwitch: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...otherProps }) => {
    const ctx = React.useContext(ThemeContext);
    const theme: ThemeNameType = ctx?.theme || 'light';

    const onToggleTheme = () => {
        if (ctx) {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            ctx.setTheme(newTheme)
        }
    };

    return (
        <div className={ cn(className, 'theme') } { ...otherProps }>
            <label className="theme__switch"
                htmlFor="theme" >
                <input id="theme"
                    type="checkbox"
                    className="theme__checkbox"
                    checked={ theme === 'dark' }
                    onChange={ onToggleTheme } />
                <div className="theme__switch-item">
                    <Icon type="switch" className="theme__icon" />
                </div>
            </label>
        </div>
    );
};

export default ThemeSwitch;