import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form as PersonForm } from "./components/Form";
import Persons from "./components/Persons";
import SearchFilter from "./components/SearchFilter";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";
const App = () => {
	// dummy data for debugging purposes
	const [persons, setPersons]: any = useState([]);
	// initial fetching from a "server" after the first render.
	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((res) => {
			setPersons(res.data);
		});
	}, []);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchPara, setSearchPara] = useState("");
	const [notificationMessage, setNotificationMessage] = useState("");
	const [notificationColor, setNotificationColor] = useState("");
	const messageSetter = (message: string, color: string) => {
		setNotificationColor(color);
		setNotificationMessage(message);
		setTimeout(() => setNotificationMessage(""), 5000);
	};

	const formSubmit = (e: any) => {
		// stop page from refreshing
		e.preventDefault();
		// dont add if already present
		const possibleIndex = persons.findIndex(
			(ele: { name: string }) => ele.name === newName
		);
		if (possibleIndex !== -1) {
			if (
				window.confirm(
					`${newName} is already in the phonebook, replace the old number with a new one?`
				)
			) {
				personService
					.update(
						{ ...persons[possibleIndex], number: newNumber },
						persons[possibleIndex].id
					)
					.then((res) => {
						setPersons(
							persons.map((ele: any) =>
								ele.id === persons[possibleIndex].id ? res : ele
							)
						);
						messageSetter(
							`Changed ${persons[possibleIndex].name}s number`,
							"green"
						);
					})
					.catch(() => {
						messageSetter(
							`Information of ${newName} has already been removed from server`,
							"red"
						);
						setPersons(
							persons.filter((ele: any) => ele.id !== persons[possibleIndex].id)
						);
					});
			}

			return;
		}
		const newPerson = {
			name: newName,
			number: newNumber,
		};

		personService
			.create(newPerson)
			.then((res) => {
				messageSetter(`Added ${newPerson.name}`, "green");
				setPersons(persons.concat(res));
				setNewName("");
				setNewNumber("");
			})
			.catch(() => {
				messageSetter(`Failed to add ${newPerson.name}`, "red");
			});
	};
	const deleteUser = (id: number, name: string) => {
		personService
			.deleteData(id, name)
			.then(() => {
				messageSetter(`Deleted ${name} from the database`, "green");
			})
			.catch(() => {
				messageSetter(
					`Failed to delete ${name}, the user might already be deleted`,
					"red"
				);
			});
		setPersons(persons.filter((ele: any) => ele.id !== id));
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notificationMessage} theme={notificationColor} />
			<SearchFilter
				onSearchParaChange={(e) => setSearchPara(e.target.value)}
				searchPara={searchPara}
			/>
			<h2>add a new</h2>
			<PersonForm
				formSubmit={formSubmit}
				newNumber={newNumber}
				newName={newName}
				setNewNumber={(e) => setNewNumber(e.target.value)}
				setNewName={(e) => setNewName(e.target.value)}
			/>
			<h2>Numbers</h2>
			<Persons
				searchPara={searchPara}
				persons={persons}
				callBack={deleteUser}
			/>
		</div>
	);
};

export default App;
