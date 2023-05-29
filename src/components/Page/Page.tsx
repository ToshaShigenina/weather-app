import React, { useState, useEffect } from "react";

import { Sidebar } from '../Sidebar';
import { Forecast } from '../Forecast';
import { Icon } from '../Icon';

const Page = () => {
	return (
		<div className="wrapper">
			<div className="content">
				<Forecast />
				<section className="section current">
					<Icon type="arrow" />
					<Icon type="point" />
					<Icon type="search" />
					<Icon type="switch" />
				</section>
			</div>
		</div>
	);
}

export default Page;
