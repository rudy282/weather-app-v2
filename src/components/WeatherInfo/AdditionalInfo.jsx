import { useContext } from "react";
import { weatherDataContext } from "../../App";
import { FIRST_DAY_IN_DAILY, DIRECTIONS } from "../../constants";

const AdditionalInfo = () => {
	const { data } = useContext(weatherDataContext);
	if (data === null) return;

	const { daily } = data;

	const { sunrise, sunset, uv_index_max, winddirection_10m_dominant } = daily;

	const getTime = (ts) => {
		const unixTimestamp = ts;
		const utcDate = new Date(unixTimestamp * 1000);
		const targetTimezone = data.timezone;
		const options = {
			timeZone: targetTimezone,
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		};
		const formattedTime = utcDate.toLocaleString("en-US", options);

		return formattedTime;
	};

	const getWindDirection = (degrees) => {
		const index = Math.round(degrees / 45) % 8;
		return DIRECTIONS[index];
	};

	return (
		<div id="additional_weather_info">
			<div className="additional_weather_info_column">
				<div>Sunrise: {getTime(sunrise[FIRST_DAY_IN_DAILY])}</div>
				<div>
					Wind direction:{" "}
					{getWindDirection(
						winddirection_10m_dominant[FIRST_DAY_IN_DAILY]
					)}
				</div>
			</div>
			<div className="additional_weather_info_column">
				<div>Sunset: {getTime(sunset[FIRST_DAY_IN_DAILY])}</div>
				<div>UV index: {uv_index_max[FIRST_DAY_IN_DAILY]}</div>
			</div>
		</div>
	);
};
export default AdditionalInfo;
