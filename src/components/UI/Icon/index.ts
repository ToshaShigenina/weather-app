import { Icon as InitialIcon } from './components/Icon';
import { Sprite } from './components/Sprite';

type InitialIconType = typeof InitialIcon;
type CompaundComponentType = InitialIconType & {
	Sprite: typeof Sprite
};

const Icon = InitialIcon as CompaundComponentType;
Icon.Sprite = Sprite;

export { Icon };
export type { IconProps, IconSize, IconType } from './components/Icon';
