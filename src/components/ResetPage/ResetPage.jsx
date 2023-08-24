import {
	LOCAL_STORAGE_IS_FIRST_VISIT,
	LOCAL_STORAGE_DEFAULT_LOCATION,
	LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT,
	LOCAL_STORAGE_DEFAULT_PLACE,
} from "../../constants";

import "./ResetPage.css";

const ResetPage = ({ message }) => {
	return (
		<div id="geolocation_permission_container">
			<div id="text">{message}</div>
			<div id="disclaimer">
				<label htmlFor="reset_button">
					Reset app and user settings
				</label>
				<button
					className="button-4"
					onClick={() => {
						localStorage.removeItem(LOCAL_STORAGE_IS_FIRST_VISIT);
						localStorage.removeItem(LOCAL_STORAGE_DEFAULT_LOCATION);
						localStorage.removeItem(
							LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT
						);
						localStorage.removeItem(LOCAL_STORAGE_DEFAULT_PLACE);
						window.location.reload();
					}}
					id="reset_button">
					reset
				</button>
			</div>
		</div>
	);
};
export default ResetPage;
