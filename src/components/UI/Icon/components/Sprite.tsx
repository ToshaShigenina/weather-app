import React, { FC, SVGAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as SpriteSvg } from '../svg/sprite.svg'

import '../css/sprite.css';

const portalNode = document.createElement('div');
portalNode.setAttribute('id', 'sprite');
portalNode.setAttribute('data-testid', 'sprite');
portalNode.hidden = true;

export const Sprite: FC<SVGAttributes<SVGElement>> = (props) => {
	useEffect(() => {
		document.body.appendChild(portalNode);
		return () => portalNode.remove();
	});
	return createPortal(<SpriteSvg { ...props } />, portalNode)
};
