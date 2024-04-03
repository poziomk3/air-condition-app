import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Capitals from "./data/capital.json";
import Abbreviations from "./data/abbrevation.json";
import { CityDTO } from "./types/City";
export const CityDataContext = createContext<null | CityDTO[]>(null);

const CityContext: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<null | CityDTO[]>(null);
  useEffect(() => {
    const temp = Capitals;
    const readyTemp = temp.map((item) => ({
      city: item.city,
      country: item.country,
      abbreviation: Abbreviations.find((abb) => item.country === abb.country)
        ?.abbreviation,
    }));

    setData(readyTemp);
  }, []);

  return (
    <CityDataContext.Provider value={data}>{children}</CityDataContext.Provider>
  );
};

export default CityContext;
