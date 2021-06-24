import { ChangeEventHandler } from "react";

const CountryFilter = ({
	value,
	onChangeEvent,
}: {
	value: string;
	onChangeEvent: ChangeEventHandler<HTMLInputElement>;
}) => {
	return (
		<label>
			find countries:
			<input onChange={onChangeEvent} value={value} />
		</label>
	);
};

export default CountryFilter;
