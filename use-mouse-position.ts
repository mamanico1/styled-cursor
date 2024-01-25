import { useEffect, useRef } from "react";

export default function useMousePosition() {
	// keep it persistent
	const secondaryCursor = useRef<any>(null);
	const mainCursor = useRef<any>(null);
	const positionRef = useRef({
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
		key: -1,
	});

	useEffect(() => {
		document.addEventListener("mousemove", updatePosition, false);
		document.addEventListener("mouseenter", updatePosition, false);

		return () => {
			document.removeEventListener("mousemove", updatePosition);
			document.removeEventListener("mouseenter", updatePosition);
		};
	}, []);

	useEffect(() => {
		followMouse();
	}, []);

	function updatePosition(e: MouseEvent) {
		const { clientX, clientY } = e;
		if (!clientX || !clientY) return;
		positionRef.current.mouseX =
			clientX - secondaryCursor.current.clientWidth / 2;
		positionRef.current.mouseY =
			clientY - secondaryCursor.current.clientHeight / 2;
		mainCursor.current.style.left = `${
			clientX - mainCursor.current.clientWidth / 2
		}px`;
		mainCursor.current.style.top = `${
			clientY - mainCursor.current.clientHeight / 2
		}px`;
	}

	function followMouse() {
		positionRef.current.key = requestAnimationFrame(followMouse);
		const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } =
			positionRef.current;
		if (!destinationX || !destinationY) {
			positionRef.current.destinationX = mouseX;
			positionRef.current.destinationY = mouseY;
		} else {
			positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
			positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
			if (
				Math.abs(positionRef.current.distanceX) +
				Math.abs(positionRef.current.distanceY) <
				0.1
			) {
				positionRef.current.destinationX = mouseX;
				positionRef.current.destinationY = mouseY;
			} else {
				positionRef.current.destinationX += distanceX;
				positionRef.current.destinationY += distanceY;
			}
		}
		secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
	}

	return { secondaryCursor, mainCursor };
}
