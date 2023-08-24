import { useContext } from "react";
import { weatherDataContext } from "../../App";
import {
	FaLocationDot,
	FaWind,
	FaCloudShowersHeavy,
	FaTemperatureEmpty,
	FaTemperatureFull,
} from "react-icons/fa6";

import {
	FIRST_DAY_IN_DAILY,
	WMO_WEATHER_INTERPRETATION_CODE,
	WEATHER_ICONS_WITH_WMO_CODES,
} from "../../constants";

import "./WeatherSummary.css";

const WeatherSummary = ({ isGeolocation }) => {
	const { data, location } = useContext(weatherDataContext);
	if (data === null || location === null) return;

	const { current_weather, daily } = data;

	const { temperature, windspeed, weathercode } = current_weather;

	const {
		precipitation_probability_max: precipitation,
		temperature_2m_min: tempMin,
		temperature_2m_max: tempMax,
	} = daily;

	return (
		<div id="weather_summary_container">
			<div className="weather_summary_row">
				<div id="degrees">{Math.round(temperature)}&#176;</div>
				<img
					src={WEATHER_ICONS_WITH_WMO_CODES[weathercode]}
					alt={WMO_WEATHER_INTERPRETATION_CODE[weathercode]}
					id="weather_summary_img"
				/>
			</div>
			<div className="weather_summary_row">
				<div className="weather_summary_additional_temp">
					<FaTemperatureEmpty />
					{Math.round(tempMin[FIRST_DAY_IN_DAILY])}&#176;
				</div>
				<div className="weather_summary_additional_temp">
					<FaTemperatureFull />
					{Math.round(tempMax[FIRST_DAY_IN_DAILY])}&#176;
				</div>
			</div>
			<div className="weather_summary_row">
				<div id="weather_summary_type">
					{WMO_WEATHER_INTERPRETATION_CODE[weathercode]}
				</div>
			</div>
			<div className="weather_summary_row">
				<div className="weather_summary_info">
					<FaLocationDot />
					{isGeolocation ? "Current location" : location}
				</div>
			</div>
			<div className="weather_summary_row">
				<div className="weather_summary_info">
					<FaWind />
					{Math.round(windspeed)}km/h
				</div>
				<div className="weather_summary_info">
					<FaCloudShowersHeavy />
					{precipitation[FIRST_DAY_IN_DAILY]}%
				</div>
			</div>
		</div>
	);
};
export default WeatherSummary;
