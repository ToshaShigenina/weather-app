import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import './style.css';

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    isAbs?: boolean
}

export const Loader: FC<IProps> = ({ className, isAbs = false, ...otherProps }) => {
    return (
        <div className={ cn('loader', isAbs && 'loader-abs', className) } { ...otherProps }>
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};
