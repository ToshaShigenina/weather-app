import { default as InitialIcon } from './Icon';
import { default as Sprite } from './Sprite';

type InitialIconType = typeof InitialIcon;
type CompaundComponentType = InitialIconType & {
	Sprite: typeof Sprite
}

const Icon = InitialIcon as CompaundComponentType;
Icon.Sprite = Sprite;

export { Icon };
export type { IconProps, IconSize, IconType } from './Icon';
