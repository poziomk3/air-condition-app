import { useContext, useState } from "react";
import { CityDataContext } from "../context/CityContext";
import CityTile from "./CityTile";
import { AirConditionDataContext } from "../context/AirConditionContext";
import { CityDTO } from "../types/City";
import Select from "react-select";
import { useSort } from "../hooks/useSort";
import { useFilter } from "../hooks/useFilter";

const CitiesGrid = () => {
  const citiesData = useContext(CityDataContext);
  const conditionData = useContext(AirConditionDataContext);
  const [filteredData, setFilteredData] = useState<CityDTO[] | null>([]);

  const {
    country,
    city,
    handleCityChange,
    handleCountryChange,
    selectedOptions,
    setSelectedOptions,
    options,
  } = useFilter({
    setFilters: setFilteredData,
    condition: conditionData,
    data: citiesData,
  });
  const { sortOptions, setSortOption } = useSort({
    filters: filteredData,
    condition: conditionData,
    data: citiesData,
    setFilters: setFilteredData,
  });
  return (
    <>
      <div className="z-[100] relative flex  w-full gap-[0.2rem] p-[0.5rem] flex-col md:flex-row">
        <div className="z-[100] bg-black/70 backdrop-blur-md  flex flex-col  gap-[0.2rem] flex-1 p-[2rem]">
          <h1 className="text-[1.5rem] pb-[0.3rem] text-white">Type your filters:</h1>
          <div className="flex w-full gap-[0.2rem]">
            <input
              className="flex-1 py-[0.4rem] px-[0.5rem]"
              type="text"
              placeholder="City"
              value={city}
              onChange={handleCityChange}
            />
            <input
              className="flex-1 py-[0.4rem] px-[0.5rem]"
              type="text"
              placeholder="Country"
              value={country}
              onChange={handleCountryChange}
            />
          </div>
          <Select
            placeholder="Air condition "
            defaultValue={selectedOptions}
            onChange={setSelectedOptions}
            options={options}
            isMulti
          />
        </div>
        <div className=" w-full h-[0.2rem] bg-black/20 md:hidden" />
        <div className="z-[10] bg-black/20 backdrop-blur-md flex flex-col  gap-[0.2rem] flex-1 p-[2rem]">
          <h1 className="text-[1.5rem] pb-[0.3rem]">Type your filters:</h1>
          <Select
            className="mt-auto"
            options={sortOptions}
            onChange={setSortOption}
          />
        </div>
      </div>
      <div className="  grid sm:grid-cols-2 gap-[1.2rem] px-[0.2rem] lg:grid-cols-3 mx-auto max-w-[1200px]">
        {filteredData?.map((city, index) => (
          <CityTile
            airCondition={
              conditionData?.[citiesData?.indexOf(city) ?? 0] ?? null
            }
            city={city}
            key={city.country}
          />
        ))}
      </div>
    </>
  );
};

export default CitiesGrid;
