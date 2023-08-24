import { useState, useRef } from "react";
import {
	DAY_OF_WEEK,
	WEATHER_ICONS_WITH_WMO_CODES,
	WMO_WEATHER_INTERPRETATION_CODE,
	DIRECTIONS,
} from "../../../constants";
import {
	FaChevronDown,
	FaChevronUp,
	FaTemperatureEmpty,
	FaTemperatureFull,
	FaCloudShowersHeavy,
} from "react-icons/fa6";

const ForecastEntry = ({
	time,
	weathercode,
	temperature_2m_max,
	temperature_2m_min,
	precipitation_probability_max,
	windspeed_10m_max,
	winddirection_10m_dominant,
	uv_index_max,
}) => {
	const [isToggled, setIsToggled] = useState(false);
	const forecastRef = useRef(null);

	const date = new Date(time * 1000);
	const dayOfWeek = date.getDay();

	const getWindDirection = (degrees) => {
		const index = Math.round(degrees / 45) % 8;
		return DIRECTIONS[index];
	};

	const toggle = () => {
		!isToggled
			? (forecastRef.current.style.borderRadius = "1.5rem 1.5rem 0 0")
			: (forecastRef.current.style.borderRadius = "1.5rem");
		setIsToggled(!isToggled);
	};

	return (
		<>
			<div
				className="forecast_entry_container"
				ref={forecastRef}
				onClick={() => toggle()}>
				<div className="forecast_entry_day">
					{DAY_OF_WEEK[dayOfWeek]}
				</div>
				<div>
					<img
						src={WEATHER_ICONS_WITH_WMO_CODES[weathercode]}
						alt={WMO_WEATHER_INTERPRETATION_CODE[weathercode]}
						style={{ width: "50px" }}
					/>
				</div>
				<div className="forecast_entry_data">
					{/* <FaTemperatureFull /> */}
					{Math.round(temperature_2m_max)}&#176;
				</div>
				<div className="forecast_entry_data">
					{/* <FaTemperatureEmpty /> */}
					{Math.round(temperature_2m_min)}&#176;
				</div>
				<div className="forecast_entry_data">
					<FaCloudShowersHeavy />
					{precipitation_probability_max}%
				</div>
				<button onClick={() => toggle()}>
					{isToggled ? <FaChevronUp /> : <FaChevronDown />}
				</button>
			</div>
			{isToggled ? (
				<div className="forecast_entry_additional_info_container">
					<div>Wind speed: {windspeed_10m_max}km/h</div>
					<div>
						Wind direction:{" "}
						{getWindDirection(winddirection_10m_dominant)}
					</div>
					<div>UV index: {uv_index_max}</div>
				</div>
			) : null}
		</>
	);
};
export default ForecastEntry;
