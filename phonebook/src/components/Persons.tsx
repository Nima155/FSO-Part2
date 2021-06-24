import { IPersonsType } from "../interfaces";
const Person = ({
	ele,
	callback,
}: {
	ele: any;
	callback: (id: number, name: string) => void;
}) => {
	return (
		<>
			<p>
				{ele.name} {ele.number}{" "}
				<button onClick={() => callback(ele.id, ele.name)}>delete</button>
			</p>
		</>
	);
};

const Persons = ({ persons, searchPara, callBack }: IPersonsType) => {
	return (
		<>
			{persons
				.filter((ele) => ele.name.indexOf(searchPara) !== -1)
				.map((ele) => (
					<Person ele={ele} key={ele.name} callback={callBack} />
				))}
		</>
	);
};
export default Persons;
