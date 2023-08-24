import "./SettingsPanel.css";
import { useContext, useRef } from "react";
import { weatherDataContext } from "../../App";
import Input from "../Inputs/Input";
import SwitchInput from "../Inputs/SwitchInput";
import useClickOutside from "../../hooks/useClickOutside";

const SettingsPanel = () => {
	const { isSettings, setIsSettings } = useContext(weatherDataContext);
	if (isSettings === null && setIsSettings === null) return;
	const settingsPanelRef = useRef(null);

	useClickOutside(settingsPanelRef, setIsSettings);

	return (
		<div id="screen_container">
			<div id="settings_panel_container" ref={settingsPanelRef}>
				<div id="settings_container_text">Settings</div>
				<div className="settings_entry">
					<label htmlFor="settings_location_gps_input">
						Set your current location as default:
					</label>
					<SwitchInput />
				</div>
				<div className="settings_entry">
					<label htmlFor="settings_location_input">
						Default starting location:
					</label>
					<Input />
				</div>
				<button
					id="settings_button"
					onClick={() => {
						setIsSettings(!isSettings);
						location.reload();
					}}
					className="button-4">
					Save
				</button>
			</div>
		</div>
	);
};
export default SettingsPanel;

// before chatgpt
/*
import "./SettingsPanel.css";
import { useContext } from "react";
import { weatherDataContext } from "../../App";
import Input from "../Inputs/Input";
import SwitchInput from "../Inputs/SwitchInput";

const SettingsPanel = () => {
	const { isSettings, setIsSettings } = useContext(weatherDataContext);
	if ((isSettings === null) || (setIsSettings === null)) return;

	return (
		<div id="screen_container">
			<div id="settings_panel_container">
				<div id="settings_container_text">Settings</div>
				<div className="settings_entry">
					<label htmlFor="settings_location_gps_input">
						Set your current location as default:
					</label>
					<SwitchInput />
				</div>
				<div className="settings_entry">
					<label htmlFor="settings_location_input">
						Default starting location:
					</label>
					<Input />
				</div>
				<button
					id="settings_button"
					onClick={() => {
						setIsSettings(!isSettings);
						location.reload();
					}}>
					Save
				</button>
			</div>
		</div>
	);
};
export default SettingsPanel;
*/
