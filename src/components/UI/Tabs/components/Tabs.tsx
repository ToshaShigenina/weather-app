import React, { FC, HTMLAttributes, ReactNode, useState } from "react";
import cn from "classnames";
import { Nav } from './Nav';
import '../style.css';

export type TabItem = {
	label: string
	children: ReactNode
};
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	items: TabItem[]
};
type LabelsFunc = (items: TabItem[]) => string[];

const getLabels: LabelsFunc = (items) => {
	return items.map(item => item.label);
};
export const Tabs: FC<TabsProps> = ({ items = [], ...otherProps }) => {
	const [active, setActive] = useState(0);

	const changeActiveTab = (index: number) => {
		setActive(index);
	};

	return (
		<>
			<Nav active={ active } items={ getLabels(items) } onClick={ changeActiveTab } />
			<div className="tabs-content" { ...otherProps }>
				{ items[active].children }
			</div>
		</>
	);
};
