import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { API_URL, options } from "./api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    console.log("Hello");
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${API_URL}?minPopulation=1000000&namePrefix=${inputValue}&limit=10`,
        options
      );
      const result = await response.json();
      console.log(result);
      return {
        options: result.data?.map((city) => {
          return {
            lat: city.latitude,
            lon: city.longitude,
            label: `${city.name}, ${city.country}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
      return {
        options: [],
      };
    }
  };
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
