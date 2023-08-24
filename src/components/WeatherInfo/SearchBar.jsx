import { useState, useRef, useContext } from "react";
import { weatherDataContext } from "../../App";
import {
	ERROR_CANNOT_FIND_PLACE,
	GEOCODING_MAX_LETTER_COUNT,
} from "../../constants";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const SearchBar = ({ addCityToSavedSpaces }) => {
	const { changeCity, setIsError, setErrorMsg } =
		useContext(weatherDataContext);
	if (changeCity === null) return;

	const [data, setData] = useState(null);

	const inputRef = useRef(null);

	const inputChanged = (e) => {
		let query = e.target.value;
		const URL_FETCH_GEOCODING = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;

		const fetchData = async (url) => {
			try {
				const response = await fetch(url);
				const json = await response.json();

				setData(json);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData(URL_FETCH_GEOCODING);
	};

	const checkForUndefinedData = () => {
		if (data.results === undefined) {
			setIsError(true);
			setErrorMsg(ERROR_CANNOT_FIND_PLACE);
			return true;
		}
		return false;
	};

	const setToFirstCity = () => {
		if (checkForUndefinedData()) return;
		changeCity(data.results[0]);
		clearInput();
	};

	const addFirstCity = () => {
		if (checkForUndefinedData()) return;
		addCityToSavedSpaces(data.results[0]);
		clearInput();
	};

	const clearInput = () => {
		inputRef.current.value = "";
		setData(null);
	};

	return (
		<div id="search_bar">
			<form id="search_form" onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					name="search"
					id="search"
					placeholder="Search for location..."
					ref={inputRef}
					onChange={(e) => {
						e.preventDefault();
						inputChanged(e);
					}}
				/>
				<button
					type="submit"
					id="search_button"
					onClick={() => setToFirstCity()}>
					<FaSearch />
				</button>

				<button onClick={() => addFirstCity()} id="add_button">
					<FaCirclePlus />
				</button>
			</form>

			{data?.results ? (
				<div id="search_queries">
					{data.results.map((result) => {
						return (
							<div
								className="search_query_result"
								key={result.id}>
								<div
									onClick={() => {
										clearInput();
										changeCity(result);
									}}>
									<img
										src={`https://flagcdn.com/w20/${result.country_code.toLowerCase()}.png`}
										alt={`${result.country_code} flag`}
										className="search_query_result_img"
									/>
									{result.name.length <
									GEOCODING_MAX_LETTER_COUNT
										? result.name
										: result.name.substring(
												0,
												GEOCODING_MAX_LETTER_COUNT
										  ) + "..."}
								</div>
								<button
									onClick={() => {
										clearInput();
										addCityToSavedSpaces(result);
									}}>
									<FaCirclePlus />
								</button>
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};
export default SearchBar;
