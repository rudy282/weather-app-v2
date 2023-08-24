import { createContext, useEffect, useState } from "react";
import WeatherSummary from "./components/WeatherSummary/WeatherSummary";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import SettingsPanel from "./components/Settings/SettingsPanel";
import FirstVisitPanel from "./components/FirstVisit/FirstVisitPanel";
import ResetPage from "./components/ResetPage/ResetPage";

import {
	LOCAL_STORAGE_IS_FIRST_VISIT,
	LOCAL_STORAGE_DEFAULT_LOCATION,
	LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT,
	LOCAL_STORAGE_DEFAULT_PLACE,
	ERROR_GEOLOCATION_NOT_SUPPORTED,
	ERROR_NO_INTERNET_CONNECTION,
} from "./constants";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";
import WeatherVideo from "./components/WeatherVideo/WeatherVideo";

export const weatherDataContext = createContext();

function App() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isGeolocation, setIsGeolocation] = useState(false);
	const [coordinates, setCoordinates] = useState(null);
	const [location, setLocation] = useState("");
	const [isSettings, setIsSettings] = useState(false);

	const [isGeolocationDefault, setIsGeolocationDefault] = useState(false);

	const [isFirstVisit, setIsFirstVisit] = useState(
		localStorage.getItem(LOCAL_STORAGE_IS_FIRST_VISIT) === null
			? true
			: false
	);

	const [defaultLocation, setDefaultLocation] = useState(
		localStorage.getItem(LOCAL_STORAGE_DEFAULT_LOCATION) === null
			? ""
			: localStorage.getItem(LOCAL_STORAGE_DEFAULT_LOCATION)
	);

	const [isResetPage, setIsResetPage] = useState(false);

	const [errorMsg, setErrorMsg] = useState("");

	const fetchData = async () => {
		if (coordinates === null) return;
		try {
			const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto&timeformat=unixtime`;

			setIsLoading(true);

			const response = await fetch(url);
			const json = await response.json();

			setData(json);
		} catch (error) {
			console.error(error);
			setIsError(true);
			setErrorMsg(ERROR_NO_INTERNET_CONNECTION);
			setIsLoading(false);
		}
		setIsLoading(false);
	};

	const setLocationGPS = () => {
		setIsResetPage(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					setCoordinates({ latitude, longitude });
					setIsResetPage(false);
				},
				(error) => {
					console.error(error);
					setIsResetPage(false);
					// I don't know if the message is needed nor it will be invoked
					setIsError(true);
					setErrorMsg(ERROR_GEOLOCATION_NOT_SUPPORTED);
					setIsGeolocationDefault(false);
					localStorage.setItem(
						LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT,
						false
					);
					window.location.reload();
				}
			);
		} else {
			setIsResetPage(false);
			setIsError(true);
			setErrorMsg(ERROR_GEOLOCATION_NOT_SUPPORTED);
		}
		setIsGeolocation(true);
	};

	const changeCity = (result) => {
		const { latitude, longitude } = result;
		setCoordinates({ latitude, longitude });

		setLocation(result.name);
		setIsGeolocation(false);
	};

	useEffect(() => {
		const savedIsGeolocationDefault = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT)
		);

		if (savedIsGeolocationDefault) {
			setLocationGPS();
		} else if (!savedIsGeolocationDefault) {
			const place = JSON.parse(
				localStorage.getItem(LOCAL_STORAGE_DEFAULT_PLACE)
			);
			if (place === null) {
				setIsResetPage(true);
				return;
			}
			changeCity(place);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [coordinates]);

	return (
		<weatherDataContext.Provider
			value={{
				data,
				isLoading,
				setIsLoading,
				isError,
				setIsError,
				isGeolocation,
				setIsGeolocation,
				fetchData,
				coordinates,
				setCoordinates,
				location,
				setLocation,
				isSettings,
				setIsSettings,
				setLocationGPS,
				isGeolocationDefault,
				setIsGeolocationDefault,
				isFirstVisit,
				setIsFirstVisit,
				defaultLocation,
				setDefaultLocation,
				changeCity,
				errorMsg,
				setErrorMsg,
			}}>
			{isFirstVisit ? (
				<FirstVisitPanel />
			) : isLoading ? (
				<Loader />
			) : isResetPage ? (
				<ResetPage message="Please allow geolocation permission." />
			) : (
				<div id="container">
					<WeatherVideo data={data} />

					<WeatherSummary isGeolocation={isGeolocation} />
					<WeatherInfo />

					{isSettings ? <SettingsPanel /> : null}
					{isError ? <Error /> : null}
				</div>
			)}
		</weatherDataContext.Provider>
	);
}

export default App;
