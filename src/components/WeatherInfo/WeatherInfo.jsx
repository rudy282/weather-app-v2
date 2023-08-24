import { useContext, useState, useEffect } from "react";
import { weatherDataContext } from "../../App";
import "./WeatherInfo.css";
import SearchBar from "./SearchBar";
import Divider from "./Divider";
import SavedPlaces from "./SavedPlaces";
import WeatherChart from "./WeatherChart";
import AdditionalInfo from "./AdditionalInfo";
import Forecast from "./Forecast/Forecast";
import WeatherMap from "./WeatherMap";
import Footer from "./Footer";
import {
	ERROR_PLACE_ALREADY_EXISTS,
	LOCAL_STORAGE_PLACES,
} from "../../constants";

const WeatherInfo = () => {
	// const { weatherData, setCoordinates, setLocation, setIsGeolocation } =
	// 	useContext(weatherDataContext);

	const { weatherData, setIsError, setErrorMsg } =
		useContext(weatherDataContext);

	if (weatherData === null) return;

	const [savedPlaces, setSavedPlaces] = useState([]);

	useEffect(() => {
		if (localStorage.getItem(LOCAL_STORAGE_PLACES) != null) {
			setSavedPlaces(
				JSON.parse(localStorage.getItem(LOCAL_STORAGE_PLACES))
			);
		}
	}, []);

	const addCityToSavedSpaces = (result) => {
		if (savedPlaces.some((place) => place.id === result.id)) {
			console.error("this place already exists");
			setErrorMsg(ERROR_PLACE_ALREADY_EXISTS);
			setIsError(true);
			return;
		}

		setSavedPlaces([...savedPlaces, result]);
	};

	useEffect(() => {
		if (savedPlaces.length > 0) {
			localStorage.setItem(
				LOCAL_STORAGE_PLACES,
				JSON.stringify(savedPlaces)
			);
		}
	}, [savedPlaces]);

	return (
		<div id="weather_info_container">
			<SearchBar addCityToSavedSpaces={addCityToSavedSpaces} />
			<Divider />
			<SavedPlaces
				savedPlaces={savedPlaces}
				setSavedPlaces={setSavedPlaces}
			/>
			<Divider />
			<WeatherChart />
			<Divider />
			<AdditionalInfo />
			<Divider />
			<Forecast />
			<Divider />
			<WeatherMap />
			<Divider />
			<Footer />
		</div>
	);
};
export default WeatherInfo;
