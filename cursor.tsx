import useMousePosition from "./use-mouse-position";
import styled from "styled-components";

export function isTouchDevice() {
	return (
		"ontouchstart" in window ||
		navigator?.MaxTouchPoints > 0 ||
		navigator?.msMaxTouchPoints > 0
	);
}

export default function Cursor() {
	const { secondaryCursor, mainCursor } = useMousePosition();
	if (isTouchDevice()) return null;

	return (
		<div>
			<CursorSvg ref={mainCursor} width={35} height={35} viewBox="0 0 50 50">
				<circle cx="25" cy="25" r="8" />
			</CursorSvg>
			<Follower
				ref={secondaryCursor}
				width={35}
				height={35}
				viewBox="0 0 50 50"
			>
				<circle cx="25" cy="25" r="8" />
			</Follower>
		</div>
	);
}

const CursorSvg = styled.svg`
  position: absolute;
  pointer-events: none;
  stroke-width: 1;
  fill: rgb(190, 28, 28);
  opacity: 1;
  z-index: 2;
`;

const Follower = styled.svg`
  position: absolute;
  pointer-events: none;
  stroke-width: 1;
  fill: rgba(246, 150, 150, 0.78);
  transition: transform 0.05s ease-in-out;
  opacity: 1;
  z-index: 1;
`;
