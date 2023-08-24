// https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&hourly=temperature_2m,precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto&timeformat=unixtime

export const FIRST_DAY_IN_DAILY = 0;

export const WMO_WEATHER_INTERPRETATION_CODE = {
	0: "Clear sky",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog and depositing rime fog",
	48: "Fog and depositing rime fog",
	51: "Drizzle: Light intensity",
	53: "Drizzle: Moderate intensity",
	55: "Drizzle: Dense intensity",
	56: "Freezing Drizzle: Light intensity",
	57: "Freezing Drizzle: Dense intensity",
	61: "Rain: Slight intensity",
	63: "Rain: Moderate intensity",
	65: "Rain: Heavy intensity",
	66: "Freezing Rain: Light intensity",
	67: "Freezing Rain: Heavy intensity",
	71: "Snowfall: Slight intensity",
	73: "Snowfall: Moderate intensity",
	75: "Snowfall: Heavy intensity",
	77: "Snow grains",
	80: "Rain showers: Slight intensity",
	81: "Rain showers: Moderate intensity",
	82: "Rain showers: Violent intensity",
	85: "Snow showers: Slight intensity",
	86: "Snow showers: Heavy intensity",
	95: "Thunderstorm: Slight or moderate",
	96: "Thunderstorm with slight hail",
	99: "Thunderstorm with heavy hail",
};

import clear_sky from "./assets/weather_icons/clear_sky.svg";
import drizzle from "./assets/weather_icons/drizzle.svg";
import fog from "./assets/weather_icons/fog.svg";
import hail from "./assets/weather_icons/hail.svg";
import overcast from "./assets/weather_icons/overcast.svg";
import partly_cloudy from "./assets/weather_icons/partly_cloudy.svg";
import rain from "./assets/weather_icons/rain.svg";
import snow from "./assets/weather_icons/snow.svg";
import thunderstorm from "./assets/weather_icons/thunderstorm.svg";
export const WEATHER_ICONS_WITH_WMO_CODES = {
	0: clear_sky,
	1: clear_sky,
	2: partly_cloudy,
	3: overcast,
	45: fog,
	48: fog,
	51: drizzle,
	53: drizzle,
	55: drizzle,
	56: drizzle,
	57: drizzle,
	61: rain,
	63: rain,
	65: rain,
	66: rain,
	67: rain,
	71: snow,
	73: snow,
	75: snow,
	77: snow,
	80: rain,
	81: rain,
	82: rain,
	85: snow,
	86: snow,
	95: thunderstorm,
	96: thunderstorm,
	99: thunderstorm,
};

import VID_clouds from "./assets/weather_videos/clouds.mp4";
import VID_rain from "./assets/weather_videos/rain.mp4";
import VID_snow from "./assets/weather_videos/snow.mp4";
import VID_sun from "./assets/weather_videos/sun.mp4";
export const WEATHER_VIDEOS_WITH_WMO_CODES = {
	0: VID_sun,
	1: VID_sun,
	2: VID_clouds,
	3: VID_clouds,
	45: VID_clouds,
	48: VID_clouds,
	51: VID_rain,
	53: VID_rain,
	55: VID_rain,
	56: VID_rain,
	57: VID_rain,
	61: VID_rain,
	63: VID_rain,
	65: VID_rain,
	66: VID_rain,
	67: VID_rain,
	71: VID_snow,
	73: VID_snow,
	75: VID_snow,
	77: VID_snow,
	80: VID_rain,
	81: VID_rain,
	82: VID_rain,
	85: VID_snow,
	86: VID_snow,
	95: VID_rain,
	96: VID_rain,
	99: VID_rain,
  };

export const GEOCODING_MAX_LETTER_COUNT = 20;

export const CHART_MAX_TIME_COUNT = 24;

export const CHART_TIME_OFFSET = 1;

export const SECONDS_IN_HOUR = 3600;

export const FIRST_DAY_IN_FORECAST = 1;

export const DAYS_IN_FORECAST = 6;

export const DAY_OF_WEEK = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export const LOCAL_STORAGE_IS_FIRST_VISIT = "isFirstVisit";
export const LOCAL_STORAGE_DEFAULT_LOCATION = "defaultLocation";
export const LOCAL_STORAGE_IS_GEOLOCATION_DEFAULT = "isGeolocationDefault";
export const LOCAL_STORAGE_DEFAULT_PLACE = "defaultPlace";
export const LOCAL_STORAGE_PLACES = "places";

export const ERROR_GEOLOCATION_NOT_SUPPORTED =
	"Geolocation is not supported by this browser, or the permission was not given.";

export const ERROR_NO_INTERNET_CONNECTION = "Check your internet connection.";

export const ERROR_CANNOT_FIND_PLACE = "Sorry, we could not find this place.";

export const ERROR_PLACE_ALREADY_EXISTS = "You already added this place.";