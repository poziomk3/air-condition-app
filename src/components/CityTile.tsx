import { FC, useEffect } from "react";
import { CityDTO } from "../types/City";
import { getGeolocation } from "../api/getGeolocation";
import { getAirCondition } from "../api/getAirCondition";

interface CityTileProps {
  city: CityDTO;
}

const CityTile: FC<CityTileProps> = ({ city }) => {
  useEffect(() => {
    getGeolocation(city).then((geoLoc) =>
      getAirCondition(geoLoc)
        .then((data) => data.list[0])
        .then((data) => console.log(data))
    );
  }, []);
  return city.abbreviation && city.city ? (
    <div className="flex flex-col   items-center gap-[0.2rem] aspect-square bg-blue-300/80 ">
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
