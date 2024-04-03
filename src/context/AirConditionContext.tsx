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

export const AirConditionDataContext = createContext<
  null | Promise<AirConditionDTO|null>[]
>(null);

const AirConditionContext: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<null | Promise<AirConditionDTO|null>[]>(null);
  const context = useContext(CityDataContext);
  useEffect(() => {
    if (context)
      setData(
        context.map((item) =>
          getGeolocation(item)
            .then((geoLoc) =>
              getAirCondition(geoLoc).then((data) => data.list[0])
            )
            .catch((error) => null)
        )
      );
  }, [context]);
  useEffect(() => console.log(data));
  return (
    <AirConditionDataContext.Provider value={data}>
      {children}
    </AirConditionDataContext.Provider>
  );
};

export default AirConditionContext;
