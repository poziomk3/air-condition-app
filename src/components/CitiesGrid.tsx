import { useContext } from "react";
import { CityDataContext } from "../CityContext";
import CityTile from "./CityTile";

const CitiesGrid = () => {
  const data = useContext(CityDataContext);
  return (
    <div className="grid grid-cols-6 gap-[0.2rem]">
      {data?.map((city,index) => index<5&&(
        <CityTile city={city} key={city.country} />
      ))}
    </div>
  );
};

export default CitiesGrid;
