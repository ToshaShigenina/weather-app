import React from "react";
import cn from "classnames";

export interface NavProps extends Omit<React.OlHTMLAttributes<HTMLUListElement>, 'children' | 'onClick'> {
	active?: number,
	items?: string[],
	onClick?: (index: number) => void
}

const Nav: React.FC<NavProps> = ({ active = 0, items = [], className, onClick, ...otherProps }) => {
	const onClickHandler = (index: number) => {
		if (onClick) {
			onClick(index);
		}
	};

	return (
		<>
			{
				Boolean(items.length) &&
				<ul { ...otherProps } className={ cn(className, 'tabs__nav') }>
					{
						items.map((item, i) => {
							return (
								<li className={ cn('tabs__nav-item', active === i && 'active') } key={ 'tabs-nav-item-' + i }>
									<button
										className="tabs__nav-btn"
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

export default Nav;