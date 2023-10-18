import React, { useState } from "react";
import cn from "classnames";

import Nav from './Nav';

export type TabItem = {
	label: string
	children: React.ReactNode
};
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
	items: TabItem[]
};
type LabelsFunc = (items: TabItem[]) => string[];

const getLabels: LabelsFunc = (items) => {
	return items.map(item => item.label);
};
const Tabs: React.FC<TabsProps> = ({ items = [], className, ...otherProps }) => {
	const [active, setActive] = useState(0);

	const changeActiveTab = (index: number) => {
		setActive(index);
	};

	return (
		<div { ...otherProps } className={ cn(className, 'tabs') }>
			<Nav active={ active } items={ getLabels(items) } onClick={ changeActiveTab } />
			<div className="tabs__content">
				{ items[active].children }
			</div>
		</div>
	);
};

export default Tabs;