import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSeachParams] = useSearchParams();
  const selectedSortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSeachParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={selectedSortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
