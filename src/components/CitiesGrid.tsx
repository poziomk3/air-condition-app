import { useContext, useEffect, useState } from "react";
import { CityDataContext } from "../context/CityContext";
import CityTile from "./CityTile";
import { AirConditionDataContext } from "../context/AirConditionContext";
import { CityDTO } from "../types/City";
import { predCity, predCountry } from "../utils/filters";

const CitiesGrid = () => {
  const data = useContext(CityDataContext);
  const condition = useContext(AirConditionDataContext);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [filters, setFilters] = useState<CityDTO[] | null>([]);
  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e: any) => {
    setCountry(e.target.value);
  };
  
  useEffect(() => {
    if (data)
      setFilters(
        data?.filter(
          (item) => predCity(item, city) && predCountry(item, country)
        )
      );
  }, [city, country, data]);
  return (
    <>
      <input type="text" value={city} onChange={handleCityChange} />
      <input
        type="text"
        placeholder="country"
        value={country}
        onChange={handleCountryChange}
      />
      <div className="grid grid-cols-5 gap-[0.2rem]">
        {filters?.map((city, index) => (
          <CityTile
            airCondition={condition?.[index] ?? null}
            city={city}
            key={city.country}
          />
        ))}
      </div>
    </>
  );
};

export default CitiesGrid;
function filterOutCities(item: CityDTO, city: string) {
  throw new Error("Function not implemented.");
}
