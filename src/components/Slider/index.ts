import { default as InitialSlider } from './Slider';
import { default as Slide } from './Slide';

type InitialSliderType = typeof InitialSlider;
type CompaundComponentType = InitialSliderType & {
	Slide: typeof Slide
};

const Slider = InitialSlider as CompaundComponentType;
Slider.Slide = Slide;

export { Slider };
export type { SliderBreackpointProps, SliderProps } from './Slider';