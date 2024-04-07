import { useContext, useEffect, useState } from "react";
import { CityDataContext } from "../context/CityContext";
import CityTile from "./CityTile";
import { AirConditionDataContext } from "../context/AirConditionContext";
import { CityDTO } from "../types/City";
import { predAqi, predCity, predCountry } from "../utils/filters";
import "react-dropdown/style.css";
import Select, { MultiValue } from "react-select";
import {
  alphabeticalCity,
  alphabeticalCountry,
  ascedingAqi,
} from "../utils/sorters";

const CitiesGrid = () => {
  const data = useContext(CityDataContext);
  const condition = useContext(AirConditionDataContext);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [filters, setFilters] = useState<CityDTO[] | null>([]);
  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e: any) => {
    setCountry(e.target.value);
  };
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  console.log(selectedOptions, options);
  useEffect(() => {
    if (data && condition)
      setFilters(
        data?.filter(
          (item, index) =>
            predCity(item, city) &&
            predCountry(item, country) &&
            predAqi(condition[data.indexOf(item)], [...(selectedOptions ?? [])])
        )
      );
  }, [city, country, data, condition, selectedOptions]);
  const [sortOption, setSortOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const sortOptions = [
    { label: "Alphabetical city order", value: "1" },
    { label: "Reversed alphabetical city order", value: "2" },
    { label: "Alphabetical country order", value: "3" },
    { label: "Reversed aphabetical country order", value: "4" },
    { label: "Ascending AQI", value: "5" },
    { label: "Descending AQI", value: "6" },
  ];

  useEffect(() => {
    console.log("essa", sortOption);
    if (filters && sortOption) {
      let sortedFilters = [...filters]; // Create a copy of filters array to avoid mutating state directly
      if (sortOption.value === "1") {
        sortedFilters.sort((item1, item2) => alphabeticalCity(item1, item2));
      } else if (sortOption.value === "2") {
        sortedFilters.sort(
          (item1, item2) => -1 * alphabeticalCity(item1, item2)
        );
      } else if (sortOption.value === "3") {
        sortedFilters.sort((item1, item2) => alphabeticalCountry(item1, item2));
      } else if (sortOption.value === "4") {
        sortedFilters.sort(
          (item1, item2) => -1 * alphabeticalCountry(item1, item2)
        );
      } else if (sortOption.value === "5") {
        sortedFilters.sort((item1, item2) =>
          ascedingAqi(
            condition?.[data?.indexOf(item1) ?? 0] ?? null,
            condition?.[data?.indexOf(item2) ?? 0] ?? null
          )
        );
      } else if (sortOption.value === "6") {
        sortedFilters.sort(
          (item1, item2) =>
            -1 *
            ascedingAqi(
              condition?.[data?.indexOf(item1) ?? 0] ?? null,
              condition?.[data?.indexOf(item2) ?? 0] ?? null
            )
        );
      }
      setFilters(sortedFilters); // Update state with the sorted array
    }
  }, [condition, data, filters, sortOption]);
  return (
    <>
      <div className="bg-red-200">
        <input type="text" value={city} onChange={handleCityChange} />
        <input
          type="text"
          placeholder="country"
          value={country}
          onChange={handleCountryChange}
        />
        <Select
          defaultValue={selectedOptions}
          onChange={setSelectedOptions}
          options={options}
          isMulti
        />
      </div>
      <div>
        sorts:
        <Select options={sortOptions} onChange={setSortOption} />
      </div>
      <div className="grid grid-cols-5 gap-[0.2rem]">
        {filters?.map((city, index) => (
          <CityTile
            airCondition={condition?.[data?.indexOf(city) ?? 0] ?? null}
            city={city}
            key={city.country}
          />
        ))}
      </div>
    </>
  );
};

export default CitiesGrid;
