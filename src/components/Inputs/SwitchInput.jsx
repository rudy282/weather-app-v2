import { useContext, useEffect } from "react";
import { weatherDataContext } from "../../App";
import { Switch } from "antd";
import { LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT } from "../../constants";

const SwitchInput = () => {
	const { setIsGeolocationDefault, isGeolocationDefault } =
		useContext(weatherDataContext);

	if (setIsGeolocationDefault === null || isGeolocationDefault === null)
		return;

	useEffect(() => {
		const savedLocation = localStorage.getItem(
			LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT
		);
		if (savedLocation) {
			setIsGeolocationDefault(savedLocation === "true");
		}
	}, []);

	return (
		<Switch
			checked={isGeolocationDefault}
			onChange={(checked) => {
				setIsGeolocationDefault(checked);
				localStorage.setItem(
					LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT,
					checked
				);
			}}
		/>
	);
};
export default SwitchInput;
