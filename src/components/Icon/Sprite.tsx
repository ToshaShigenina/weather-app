import React from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as SpriteSvg } from './svg/sprite.svg'

import './css/sprite.css';

const portalNode = document.createElement('div');
portalNode.setAttribute('id', 'sprite');
portalNode.setAttribute('data-testid', 'sprite');
portalNode.hidden = true;

const Sprite: React.FC<React.SVGAttributes<SVGElement>> = (props) => {
	React.useEffect(() => {
		console.log(portalNode)
		document.body.appendChild(portalNode);
		return () => portalNode.remove();
	});
	return createPortal(<SpriteSvg { ...props } />, portalNode)
};

export default Sprite;