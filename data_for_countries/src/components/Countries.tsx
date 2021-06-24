import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ weather }: { weather: any }) => {
	return (
		<>
			{weather && (
				<>
					<p>
						<strong>Temperature:</strong> {weather.current.temperature} celsius
					</p>
					<img
						src={weather.current.weather_icons[0]}
						alt={`icon showing ${weather.current.weather_descriptions[0]}`}
					/>
					<p>
						<strong>wind:</strong> {weather.current.wind_speed} kmh direction{" "}
						{weather.current.wind_dir}
					</p>
				</>
			)}
		</>
	);
};

const Country = ({
	country,
	show = false,
}: {
	country: any;
	show?: boolean;
}) => {
	// const;
	const apiKey = process.env.REACT_APP_API_KEY;
	const [showView, setShowView] = useState(show);
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		if (showView) {
			// get request through axios..
			axios
				.get("http://api.weatherstack.com/current", {
					params: {
						access_key: apiKey,
						query: country.capital,
					},
				})
				.then((res) => {
					setWeather(res.data);
				});
		}
	}, [showView, country.capital, apiKey]);

	return (
		<>
			{showView ? (
				<>
					<div>
						<h2>{country.name}</h2>
					</div>
					<p>capital: {country.capital}</p>
					<p>population: {country.population.toLocaleString()}</p>
					<h3>languages</h3>
					<ul style={{ listStylePosition: "inside" }}>
						{country.languages.map((ele: any) => (
							<li key={ele.name} style={{ marginLeft: "20px" }}>
								{ele.name}
							</li>
						))}
					</ul>
					<img
						src={country.flag}
						alt={`${country.name}s flag`}
						style={{ maxWidth: "200px" }}
					/>
					<h3>Weather in {country.capital}</h3>
					<Weather weather={weather} />
				</>
			) : (
				<div>
					<p>
						{country.name}{" "}
						<button onClick={() => setShowView(!showView)}>Show</button>
					</p>
				</div>
			)}
		</>
	);
};

const Countries = ({
	countriesData,
	searchParam,
}: {
	countriesData: any;
	searchParam: string;
}) => {
	const countries = countriesData.filter(
		(ele: any) =>
			ele.name.toLowerCase().indexOf(searchParam.toLowerCase()) !== -1
	);
	return (
		<>
			{countries.length > 10 ? (
				<p>Too many countries</p>
			) : countries.length > 1 ? (
				countries.map((ele: any) => <Country key={ele.name} country={ele} />)
			) : countries.length === 1 ? (
				<Country country={countries[0]} show={true} />
			) : (
				<p>No countries with the specified name</p>
			)}
		</>
	);
};
export default Countries;
