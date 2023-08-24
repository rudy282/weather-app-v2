import { useContext } from "react";
import { DAYS_IN_FORECAST, FIRST_DAY_IN_FORECAST } from "../../../constants";
import { weatherDataContext } from "../../../App";
import ForecastEntry from "./ForecastEntry";

const Forecast = () => {
	const { data } = useContext(weatherDataContext);
	if (data === null) return;

	const {
		time,
		weathercode,
		temperature_2m_max,
		temperature_2m_min,
		precipitation_probability_max,
		windspeed_10m_max,
		winddirection_10m_dominant,
		uv_index_max,
	} = data.daily;

	const forecastData = [];

	const createForecastData = () => {
		for (
			let i = FIRST_DAY_IN_FORECAST;
			i < DAYS_IN_FORECAST + FIRST_DAY_IN_FORECAST;
			i++
		) {
			forecastData.push({
				time: time[i],
				weathercode: weathercode[i],
				temperature_2m_max: temperature_2m_max[i],
				temperature_2m_min: temperature_2m_min[i],
				precipitation_probability_max: precipitation_probability_max[i],
				windspeed_10m_max: windspeed_10m_max[i],
				winddirection_10m_dominant: winddirection_10m_dominant[i],
				uv_index_max: uv_index_max[i],
			});
		}
	};

	createForecastData();

	return (
		<div id="forecast_container">
			{forecastData.map((entry) => (
				<ForecastEntry {...entry} key={entry.time} />
			))}
		</div>
	);
};
export default Forecast;
