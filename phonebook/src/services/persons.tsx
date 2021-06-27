import axios from "axios";
const BASE_URL = "http://localhost:3001/persons";
const create = (newPerson: any) => {
	// HTTP POST request to add
	return axios.post(BASE_URL, newPerson).then((res) => res.data);
};
const getAll = () => {
	return axios.get(BASE_URL).then((res) => res.data);
};
const deleteData = (id: number, name: string) => {
	// HTTP delete request
	return axios.delete(`${BASE_URL}/${id}`).then((res) => res.data);
};

const update = (newData: any, id: number) => {
	// HTTP PUT request to update
	return axios.put(`${BASE_URL}/${id}`, newData).then((res) => res.data);
};

// just to silence a warning
const md = { create, deleteData, update, getAll };
export default md;
