import React from "react";

export type SliderContextType = {
	width: number
}

export const SliderContext = React.createContext<SliderContextType | null>(null);
export const SliderContextProvider = SliderContext.Provider;
