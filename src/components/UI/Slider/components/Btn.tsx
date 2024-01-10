import React, { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';
import { ReactComponent as SliderArrow } from '../svg/slider-arrow.svg'

type SliderBtnDirectionType = 'prev' | 'next';
interface SliderBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    direction: SliderBtnDirectionType
}

export const Btn: FC<SliderBtnProps> = ({ direction = '', className, ...otherProps }) => {
    return (
        <button
            className={ cn(className, 'slider__btn', direction && `slider__btn-${direction}`) }
            { ...otherProps }
        >
            <SliderArrow />
        </button>
    );
};
