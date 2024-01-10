import React, { useEffect } from "react";
import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { createRootStore, type RootStoreType } from './RootStore';
import { useLocalStorage } from "../../hooks";
import { HISTORY_KEY } from '../../components/History'

const RootStoreContext = createContext<RootStoreType | null>(null);

export const RootStoreProvider = observer<any>(({ children }) => {
	const [historyList] = useLocalStorage<string[]>(HISTORY_KEY, []);
	const store = useLocalObservable(() => createRootStore());
	useEffect(() => {
		if (historyList.length) {
			store.location.setCity(historyList[0]);
		}
		store.loadCity();
	}, []);
	return <RootStoreContext.Provider value={ store }>{ children }</RootStoreContext.Provider>;
});
export const useRootStore = () => {
	const store = useContext(RootStoreContext);
	if (!store) throw new Error('Use Root store within provider!');
	return store;
};