import { useContext } from "react";
import { CityDataContext } from "../context/CityContext";
import CityTile from "./CityTile";
import { AirConditionDataContext } from "../context/AirConditionContext";

const CitiesGrid = () => {
  const data = useContext(CityDataContext);
  const condition = useContext(AirConditionDataContext);

  console.log(condition);
  return (
    <div className="grid grid-cols-6 gap-[0.2rem]">
      {data?.map((city, index) => (
        <CityTile
          airCondition={condition?.[index] ?? null}
          city={city}
          key={city.country}
        />
      ))}
    </div>
  );
};

export default CitiesGrid;
