import React, { useEffect, useState } from "react";
import CountryFilter from "./components/CountryFilter";
import axios from "axios";
import Countries from "./components/Countries";
import "./index.css";
function App() {
	const [searchParameter, setSearchParameter] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then((res) => setCountries(res.data));
	}, []);
	// console.log(countries);
	return (
		<div>
			<CountryFilter
				value={searchParameter}
				onChangeEvent={(e) => setSearchParameter(e.target.value)}
			/>
			<Countries countriesData={countries} searchParam={searchParameter} />
		</div>
	);
}

export default App;
