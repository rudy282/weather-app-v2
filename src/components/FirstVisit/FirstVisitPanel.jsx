import { useContext, useState } from "react";
import { weatherDataContext } from "../../App";
import "./FirstVisitPanel.css";
import Input from "../Inputs/Input";
import {
	LOCAL_STORAGE_DEFAULT_PLACE,
	LOCAL_STORAGE_IS_FIRST_VISIT,
} from "../../constants";
import Switch from "../Inputs/SwitchInput";

const FirstVisitPanel = () => {
	const {
		setIsFirstVisit,
		isFirstVisit,
		setIsGeolocationDefault,
		isGeolocationDefault,
	} = useContext(weatherDataContext);
	if (
		setIsFirstVisit === null ||
		isFirstVisit === null ||
		setIsGeolocationDefault === null ||
		isGeolocationDefault === null
	)
		return;

	const [isTextCompleted, setIsTextCompleted] = useState(false);

	const defaultPlaceLocalStorage = localStorage.getItem(
		LOCAL_STORAGE_DEFAULT_PLACE
	);

	return (
		<div id="first_visit_panel_container">
			<div id="option_square">
				<div id="first_visit_panel_header">weather-app</div>
				<div id="first_visit_panel_text">
					Experience weather like never before.
				</div>
				<div className="panel_entry">
					<label id="locationSwitch">
						Use your GPS location on start of application
					</label>
					<Switch id="locationSwitch" />
				</div>
				<div className="panel_entry">
					<label htmlFor="settings_location_input">
						Default starting location:
					</label>
					<Input
						isTextCompleted={isTextCompleted}
						setIsTextCompleted={setIsTextCompleted}
					/>
				</div>
				<div className="panel_entry">
					<button
						className="button-4"
						onClick={() => {
							localStorage.setItem(
								LOCAL_STORAGE_IS_FIRST_VISIT,
								false
							);
							location.reload();
						}}
						disabled={
							isGeolocationDefault
								? false
								: !isGeolocationDefault &&
								  defaultPlaceLocalStorage !== null
								? false
								: true
						}
						id="panel_button">
						Let's go!
					</button>
				</div>
			</div>
		</div>
	);
};
export default FirstVisitPanel;
