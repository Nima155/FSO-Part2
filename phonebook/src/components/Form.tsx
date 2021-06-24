import { IFormType } from "../interfaces";
export const Form = ({
	formSubmit,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
}: IFormType) => {
	return (
		<form onSubmit={formSubmit}>
			<div>
				name: {/* a controlled component */}
				<input value={newName} onChange={setNewName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={setNewNumber} />{" "}
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};
