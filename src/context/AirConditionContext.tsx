import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AirConditionDTO } from "../types/AirCondition";
import { CityDataContext } from "./CityContext";
import { getGeolocation } from "../api/getGeolocation";
import { getAirCondition } from "../api/getAirCondition";

export const AirConditionDataContext = createContext<AirConditionDTO[] | null>(
  null
);

const AirConditionContext: FC<PropsWithChildren> = ({ children }) => {
  const cityData = useContext(CityDataContext);
  const [airConditionData, setAirConditionData] = useState<
    AirConditionDTO[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cityData) {
        const promises = cityData.map(async (city) => {
          try {
            const geoLoc = await getGeolocation(city);
            const airCondition = await getAirCondition(geoLoc);
            return airCondition.list[0];
          } catch (error) {
            console.error("Error fetching air condition:", error);
            return null;
          }
        });
        const resolvedData = await Promise.all(promises);
        setAirConditionData(resolvedData);
      }
    };

    fetchData();
  }, [cityData]);

  return (
    <AirConditionDataContext.Provider value={airConditionData}>
      {children}
    </AirConditionDataContext.Provider>
  );
};

export default AirConditionContext;
