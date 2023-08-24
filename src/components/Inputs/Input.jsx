import { useContext, useState } from "react";
import { weatherDataContext } from "../../App";
import {
	LOCAL_STORAGE_DEFAULT_PLACE,
	LOCAL_STORAGE_DEFAULT_LOCATION,
} from "../../constants";

const Input = () => {
	const { isGeolocationDefault, setDefaultLocation, defaultLocation } =
		useContext(weatherDataContext);

	if (isGeolocationDefault === null) return;

	const [data, setData] = useState();

	const fetchData = async (url) => {
		try {
			const response = await fetch(url);
			const json = await response.json();

			setData(json);
		} catch (error) {
			console.error(error);
		}
	};

	const onChange = (event) => {
		const value = event.target.value;
		setDefaultLocation(value);
		localStorage.setItem(LOCAL_STORAGE_DEFAULT_LOCATION, value);
		const URL_FETCH_GEOCODING = `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=1&language=en&format=json`;
		fetchData(URL_FETCH_GEOCODING);

		if (data?.hasOwnProperty("results")) {
			const { results } = data;
			const result = results[0];

			localStorage.setItem(
				LOCAL_STORAGE_DEFAULT_PLACE,
				JSON.stringify(result)
			);
		}
	};

	return (
		<input
			type="text"
			name="location"
			id="settings_location_input"
			disabled={isGeolocationDefault ? true : false}
			onChange={(event) => onChange(event)}
			value={defaultLocation}
		/>
	);
};
export default Input;
