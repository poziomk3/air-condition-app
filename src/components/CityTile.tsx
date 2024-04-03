import { FC } from "react";
import { CityDTO } from "../types/City";

interface CityTileProps {
  city: CityDTO;
}

const CityTile: FC<CityTileProps> = ({ city }) => {
  return <div>{city.city}</div>;
};

export default CityTile;
