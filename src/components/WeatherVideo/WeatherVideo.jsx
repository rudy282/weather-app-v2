import "./WeatherVideo.css";
import { WEATHER_VIDEOS_WITH_WMO_CODES } from "../../constants";

const WeatherVideo = ({ data }) => {
	if (data === null) return;

	const { weathercode } = data.current_weather;

	return (
		<video id="background_video" autoPlay loop muted>
			<source
				src={WEATHER_VIDEOS_WITH_WMO_CODES[weathercode]}
				type="video/mp4"
			/>
		</video>
	);
};
export default WeatherVideo;
