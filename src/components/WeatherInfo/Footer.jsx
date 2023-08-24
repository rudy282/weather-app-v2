import { useContext } from "react";
import { weatherDataContext } from "../../App";
import { FaGear } from "react-icons/fa6";

const Footer = () => {
	const { isSettings, setIsSettings } = useContext(weatherDataContext);
	if ((isSettings === null) | (setIsSettings === null)) return;

	return (
		<div id="footer_container">
			<div>Rudy282 2023&copy;</div>
			<button onClick={() => setIsSettings(!isSettings)}>
				<FaGear />
			</button>
		</div>
	);
};
export default Footer;
