import React, { useState } from "react";

import "./css/style.css";

const History: React.FC = () => {
	const [historyList, setHistoryList] = useState<string[]>([]);

	const setSearch = (item: string) => {
		console.log(item)
	};

	return (
		<>
			{
				historyList.length &&
				<ul className="history">
					{ historyList.map((item, i) => {
						return <li
							key={ 'history-item-' + i }
							className="history__item"
							onClick={ () => setSearch(item) }
						>{ item }</li>
					}) }
				</ul>
			}
		</>
	);
};

export default History;