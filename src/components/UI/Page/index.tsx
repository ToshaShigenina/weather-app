import React, { FC, ReactNode } from "react";
import './style.css';

interface IProps {
	sidebar?: ReactNode
	children?: ReactNode
}

export const Page: FC<IProps> = ({ sidebar, children }) => {
	return (
		<div className="wrapper">
			{ sidebar }
			<div className="content">
				{ children }
			</div>
		</div>
	);
}
