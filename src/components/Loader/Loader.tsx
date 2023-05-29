import React from 'react';
import cn from 'classnames';

import './css/style.css';

const Loader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...otherProps }) => {
    return (
        <div className={ cn('loader', className) } { ...otherProps }>
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default Loader;