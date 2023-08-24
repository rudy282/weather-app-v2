import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useContext } from "react";
import { weatherDataContext } from "../../App";

const WeatherMap = () => {
	const { coordinates } = useContext(weatherDataContext);
	if (coordinates === null) return;
	const position = [coordinates.latitude, coordinates.longitude];

	return (
		<div id="weather_map_container">
			<MapContainer
				center={position}
				zoom={5}
				scrollWheelZoom={true}
				zoomControl={false}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={position}></Marker>
			</MapContainer>
		</div>
	);
};
export default WeatherMap;
