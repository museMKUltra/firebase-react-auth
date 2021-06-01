import { useEffect, useRef } from "react";

export default function usePrevious(value, init) {
	const ref = useRef(init);
	useEffect(() => {
		return () => {
			ref.current = value;
		};
	});
	return ref.current;
}
