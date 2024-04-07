import { useContext, useState } from "react";
import { CityDataContext } from "../context/CityContext";
import CityTile from "./CityTile";
import { AirConditionDataContext } from "../context/AirConditionContext";
import { CityDTO } from "../types/City";
import "react-dropdown/style.css";
import Select from "react-select";
import { useSort } from "../hooks/useSort";
import { useFilter } from "../hooks/useFilter";

const CitiesGrid = () => {
  const data = useContext(CityDataContext);
  const condition = useContext(AirConditionDataContext);
  const [filters, setFilters] = useState<CityDTO[] | null>([]);

  const {
    country,
    city,
    handleCityChange,
    handleCountryChange,
    selectedOptions,
    setSelectedOptions,
    options,
  } = useFilter({ setFilters, condition, data });
  const { sortOptions, setSortOption } = useSort({
    filters,
    condition,
    data,
    setFilters,
  });
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
