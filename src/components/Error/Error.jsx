import "./Error.css";
import { useContext, useRef } from "react";
import { weatherDataContext } from "../../App";
import useClickOutside from "../../hooks/useClickOutside";

const Error = () => {
	const { setIsError, errorMsg } = useContext(weatherDataContext);
	if (setIsError === null || errorMsg === null) return;

	const panelRef = useRef(null);
	useClickOutside(panelRef, setIsError);

	return (
		<div id="error_container">
			<div id="panel_container" ref={panelRef}>
				<div id="error_header">Error</div>
				<div id="error_text">{errorMsg}</div>
				<button
					id="error_button"
					onClick={() => {
						setIsError(false);
						location.reload();
					}}
					className="button-4">
					Ok
				</button>
			</div>
		</div>
	);
};
export default Error;
