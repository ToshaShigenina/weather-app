import React, { useState } from "react";
import cn from "classnames";

import Nav from './Nav';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
	tabsList: string[]
}

const Tabs: React.FC<TabsProps> = ({ tabsList = [], children, className, ...otherProps }) => {
	const [active, setActive] = useState(0);

	const changeActiveTab = (index: number) => {
		setActive(index);
	};

	return (
		<div { ...otherProps } className={ cn(className, 'tabs') }>
			<Nav active={ active } tabsList={ tabsList } onClick={ changeActiveTab } />
			<div className="tabs__content">
				{ children }
			</div>
		</div>
	);
};

export default Tabs;