import { ISearchType } from "../interfaces";
const SearchFilter = ({ onSearchParaChange, searchPara }: ISearchType) => (
	<>
		filter shown with
		<input onChange={onSearchParaChange} value={searchPara} />
	</>
);
export default SearchFilter;
