import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import './style.css';

interface IProps extends HTMLAttributes<HTMLDivElement> {
	extra?: boolean
}

export const Card: FC<IProps> = ({ className, children, extra, ...otherProps }) => {
	return <div className={ cn(className, 'card', extra && 'card-extra') } { ...otherProps }>{ children }</div>;
}
