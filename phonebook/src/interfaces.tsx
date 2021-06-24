import { ChangeEventHandler } from "react";

export interface IFormType {
	formSubmit: React.FormEventHandler<HTMLFormElement>;
	newName: string;
	setNewName: ChangeEventHandler<HTMLInputElement>;
	newNumber: string;
	setNewNumber: ChangeEventHandler<HTMLInputElement>;
}
export interface ISearchType {
	onSearchParaChange: ChangeEventHandler<HTMLInputElement>;
	searchPara: string;
}
export interface IPersonsType {
	persons: { name: string; number: string }[];
	searchPara: string;
	callBack: (id: number, name: string) => void;
}
