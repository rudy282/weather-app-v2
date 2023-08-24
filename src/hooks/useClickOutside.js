import { useEffect } from "react";

const useClickOutside = (panelRef, panelCallback) => {
	// from chatgpt
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (panelRef.current && !panelRef.current.contains(event.target)) {
				panelCallback(false);
				window.location.reload();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [panelRef]);
};

export default useClickOutside;
