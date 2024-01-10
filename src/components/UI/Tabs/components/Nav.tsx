import React, { FC, OlHTMLAttributes } from "react";
import cn from "classnames";

export interface NavProps extends Omit<OlHTMLAttributes<HTMLUListElement>, 'children' | 'onClick'> {
	active?: number,
	items?: string[],
	onClick?: (index: number) => void
}

export const Nav: FC<NavProps> = ({ active = 0, items = [], onClick, ...othrProps }) => {
	const onClickHandler = (index: number) => {
		if (onClick) {
			onClick(index);
		}
	};

	return (
		<>
			{
				Boolean(items.length) &&
				<ul className={ 'tabs-nav' } { ...othrProps }>
					{
						items.map((item, i) => {
							return (
								<li className={ cn('tabs-nav__item', active === i && 'active') } key={ 'tabs-nav-item-' + i }>
									<button
										className="tabs-nav__btn"
										onClick={ () => onClickHandler(i) }
									>
										{ item }
									</button>
								</li>
							)
						})
					}
				</ul>
			}
		</>
	);
};
