import { useState, useContext } from "react";
import { weatherDataContext } from "../../App";
import {
	CHART_MAX_TIME_COUNT,
	SECONDS_IN_HOUR,
	CHART_TIME_OFFSET,
} from "../../constants";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaTemperatureHalf, FaCloudShowersHeavy } from "react-icons/fa6";

const WeatherChart = () => {
	const timeLabels = [];
	const temperatureValues = [];
	const precipitationValues = [];

	const { data } = useContext(weatherDataContext);
	if (data === null) return;

	const getDateFromTimestamp = (timestamp) => new Date(timestamp * 1000);

	const createDataSet = () => {
		const currentTime = new Date();
		let currentHour = currentTime.getUTCHours();
		const { utc_offset_seconds: offset, hourly } = data;
		currentHour += offset / SECONDS_IN_HOUR;
		currentHour += CHART_TIME_OFFSET;

		const {
			time,
			temperature_2m: temperature,
			precipitation_probability: precipitation,
		} = hourly;

		const firstTimeIndex = time.findIndex(
			(element) =>
				getDateFromTimestamp(element).getHours() === currentHour
		);

		let index = firstTimeIndex;
		for (let i = 0; i < CHART_MAX_TIME_COUNT; i++) {
			let hour = getDateFromTimestamp(time[index]).getHours();
			hour >= 0 && hour <= 9
				? (hour = `0${hour}:00`)
				: (hour = `${hour}:00`);
			timeLabels.push(hour);

			temperatureValues.push(Math.round(temperature[index]));
			precipitationValues.push(precipitation[index]);

			index++;
		}
	};

	createDataSet();

	const temperatureChart = {
		labels: timeLabels,
		datasets: [
			{
				label: "Temperature",
				data: temperatureValues,
				borderColor: "#ffa000",
				backgroundColor: "#ffa000",
			},
		],
	};

	const precipitationChart = {
		labels: timeLabels,
		datasets: [
			{
				label: "Precipitation",
				data: precipitationValues,
				borderColor: "#00afff",
				backgroundColor: "#00afff",
			},
		],
		scales: {
			y: {
				beginAtZero: true,
				suggestedMin: 0,
			},
		},
	};

	const precipitationSettings = {
		maintainAspectRatio: false,
		color: "#F6F5F5",
		scales: {
			x: {
				grid: {
					color: "#F6F5F5",
					backgroundColor: "#F6F5F5",
				},
				ticks: {
					color: "#F6F5F5",
				},
			},
			y: {
				grid: {
					color: "#F6F5F5",
					backgroundColor: "#F6F5F5",
				},
				ticks: {
					color: "#F6F5F5",
				},
				beginAtZero: true,
				suggestedMin: 0,
			},
		},
		plugins: {
			legend: {
				display: false, // Hide legend labels
			},
		},
	};

	const temperatureSettings = {
		maintainAspectRatio: false,
		color: "#F6F5F5",
		scales: {
			x: {
				grid: {
					color: "#F6F5F5",
					backgroundColor: "#F6F5F5",
				},
				ticks: {
					color: "#F6F5F5",
				},
			},
			y: {
				grid: {
					color: "#F6F5F5",
					backgroundColor: "#F6F5F5",
				},
				ticks: {
					color: "#F6F5F5",
				},
			},
		},
		plugins: {
			legend: {
				display: false, // Hide legend labels
			},
		},
	};

	const [chartData, setChartData] = useState(temperatureChart);

	const [chartOptions, setChartOptions] = useState(temperatureSettings);

	return (
		<div id="weather_chart_container">
			<div id="weather_chart_buttons">
				<button
					className="button-4"
					onClick={() => {
						setChartData(temperatureChart);
						setChartOptions(temperatureSettings);
					}}>
					<FaTemperatureHalf />
				</button>
				<button
					className="button-4"
					onClick={() => {
						setChartData(precipitationChart);
						setChartOptions(precipitationSettings);
					}}>
					<FaCloudShowersHeavy />
				</button>
			</div>

			<div id="chart_container">
				<div id="chart_container_body">
					<Line data={chartData} options={chartOptions} />
				</div>
			</div>
		</div>
	);
};
export default WeatherChart;
