import React, { FC, useEffect, HTMLAttributes } from "react";
import { useLocalStorage } from "../../hooks";
import "./style.css";

export interface HistoryProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
	value?: string
	setValue?: (value: string) => void
}

export const HISTORY_KEY = 'history';
export const History: FC<HistoryProps> = ({ value, setValue, ...otherProps }) => {
	const [historyList, setHistoryList] = useLocalStorage<string[]>(HISTORY_KEY, []);

	const changeValue = (value: string, index: number) => {
		const tempList = [...historyList.slice(0, index), ...historyList.slice(index + 1)];
		setHistoryList([value, ...tempList.slice(0, 5)]);
		if (setValue) {
			setValue(value);
		}
	};
	const addValue = (value: string) => {
		if (historyList.includes(value)) {
			const index = historyList.findIndex(item => item === value);
			changeValue(value, index);
		} else {
			setHistoryList([value, ...historyList.slice(0, 5)]);
		}
	};

	useEffect(() => {
		if (value) addValue(value);
	}, [value]);

	return (
		<>
			{
				Boolean(historyList.length) &&
				<ul { ...otherProps } className="history">
					{ historyList.map((item, i) => {
						return <li
							key={ 'history-item-' + i }
							className="history__item"
							onClick={ () => changeValue(item, i) }
						>{ item }</li>
					}) }
				</ul>
			}
		</>
	);
};
