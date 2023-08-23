import React from "react";
import cn from "classnames";

export interface NavProps extends Omit<React.OlHTMLAttributes<HTMLUListElement>, 'children' | 'onClick'> {
	active: number,
	tabsList: string[],
	onClick?: (index: number) => void
}

const Nav: React.FC<NavProps> = ({ active = 0, tabsList = [], className, onClick, ...otherProps }) => {
	const onClickHandler = (index: number) => {
		if (onClick) {
			onClick(index);
		}
	};

	return (
		<>
			{
				Boolean(tabsList.length) &&
				<ul { ...otherProps } className={ cn(className, 'tabs__nav') }>
					{
						tabsList.map((item, i) => {
							return (
								<li className="tabs__nav-item" key={ 'tabs-nav-item-' + i }>
									<button
										className={ cn('tabs__nav-btn', active === i && 'active') }
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