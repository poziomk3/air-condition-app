import { useContext } from "react";
import { CityDataContext } from "../CityContext";
import CityTile from "./CityTile";

const CitiesGrid = () => {
  const data = useContext(CityDataContext);
  return (
    <div>
      {data?.map((city) => (
        <CityTile city={city} key={city.country} />
      ))}
    </div>
  );
};

export default CitiesGrid;
