import React from 'react';
import cn from 'classnames';

import './css/icon.css';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconType = 'point' | 'search' | 'switch' | 'arrow';
export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: IconSize
  type: IconType
}

const sizes: Record<IconSize, number> = {
  xl: 64,
  lg: 32,
  md: 24,
  sm: 16,
  xs: 8,
};

const Icon: React.FC<IconProps> = ({
  type,
  size = 'md',
  className,
  width,
  height,
  ...otherProps
}) => {
  const iconWidth = width || sizes[size];
  const iconHeight = height || sizes[size];

  return (
    <svg
      className={ cn(className, 'svg-icon') }
      width={ iconWidth }
      height={ iconHeight }
      { ...otherProps }
    >
      <use xlinkHref={ `#${type}` } />
    </svg>
  )
};

export default Icon;