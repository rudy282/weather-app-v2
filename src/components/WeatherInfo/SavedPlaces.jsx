import { useContext } from "react";
import { weatherDataContext } from "../../App";
import { FaCircleXmark } from "react-icons/fa6";

const SavedPlaces = ({ savedPlaces, setSavedPlaces }) => {
	const { setLocationGPS, changeCity } = useContext(weatherDataContext);
	if (setLocationGPS === null || changeCity === null) return;

	const deletePlace = (id) => {
		setSavedPlaces(savedPlaces.filter((place) => place.id !== id));
	};

	return (
		<div id="weather_info_saved_places_container">
			<div
				id="weather_info_saved_places_current_location"
				onClick={() => setLocationGPS()}>
				Current Location
			</div>
			{savedPlaces.map((savedPlace) => {
				return (
					<div
						className="weather_info_saved_places_place"
						key={savedPlace.id}>
						<div
							onClick={(e) => {
								e.preventDefault();
								changeCity(savedPlace);
							}}>
							{savedPlace.name}
						</div>
						<button
							onClick={(e) => {
								e.preventDefault();
								deletePlace(savedPlace.id);
							}}>
							<FaCircleXmark />
						</button>
					</div>
				);
			})}
		</div>
	);
};
export default SavedPlaces;
