import { createContext } from "react";

export type SliderContextType = {
	width: number
	margin: number
	sliderKeys: symbol[]
	addSliderKey?: (key: symbol) => void
}

export const SliderContext = createContext<SliderContextType | null>(null);
export const SliderContextProvider = SliderContext.Provider;
