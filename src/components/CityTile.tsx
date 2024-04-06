import { FC, useEffect, useState } from "react";
import { CityDTO } from "../types/City";
import { getGeolocation } from "../api/getGeolocation";
import { getAirCondition } from "../api/getAirCondition";
import { AirConditionDTO } from "../types/AirCondition";

interface CityTileProps {
  city: CityDTO;
  airCondition: AirConditionDTO | null;
}

const CityTile: FC<CityTileProps> = ({ city, airCondition }) => {
  const [condition, setCondition] = useState<AirConditionDTO | null>(null);
  useEffect(() => {
    console.log(airCondition);
     setCondition(airCondition);
  }, [airCondition]);
  return city.abbreviation && city.city ? (
    <div className="flex flex-col   items-center gap-[0.2rem] aspect-square bg-blue-300/80 overflow-x-hidden ">
      <div className="w-[5rem]"> {JSON.stringify(condition)}</div>
      <h1 className="font-extrabold">{city.city}</h1>
      <div className="flex flex-col items-center ">
        <img
          className="w-[4rem] "
          alt={city.abbreviation}
          src={`https://flagsapi.com/${city.abbreviation}/flat/64.png`}
        />
        <h2 className="italic">{city.country}</h2>
      </div>
    </div>
  ) : null;
};

export default CityTile;
