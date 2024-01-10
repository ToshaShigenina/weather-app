import { Slider as InitialSlider } from './components/Slider';
import { Slide } from './components/Slide';

type InitialSliderType = typeof InitialSlider;
type CompaundComponentType = InitialSliderType & {
	Slide: typeof Slide
};

const Slider = InitialSlider as CompaundComponentType;
Slider.Slide = Slide;

export { Slider };
export type { SliderBreackpointProps, SliderProps } from './components/Slider';