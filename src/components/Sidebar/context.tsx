import React from 'react';

export type SidebarContextType = {
	isOpenSearch: boolean,
	toggleSearch: (isOpen: boolean) => void,
}
export const SidebarContext = React.createContext<SidebarContextType | null>(null);
export const SidebarContextProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children
}) => {
	const [isOpenSearch, setIsOpenSearch] = React.useState(false);
	const ctx: SidebarContextType = {
		isOpenSearch,
		toggleSearch: setIsOpenSearch
	};

	return (
		<SidebarContext.Provider value={ ctx }>
			{ children }
		</SidebarContext.Provider>
	)
};