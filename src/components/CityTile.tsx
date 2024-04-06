import { FC, useEffect, useState } from "react";
import { CityDTO } from "../types/City";
import { AirConditionDTO } from "../types/AirCondition";
import { Blocks } from "react-loader-spinner";

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
    <div className="flex flex-col p-[0.5rem]  items-center gap-[0.2rem] aspect-square bg-blue-300/80 overflow-x-hidden overflow-y-hidden ">
      {/* <div className="w-[5rem]"> {JSON.stringify(condition)}</div> */}
      <h1 className="font-extrabold">{city.city}</h1>
      <div className="flex flex-col items-center ">
        <img
          className="w-[4rem] "
          alt={city.abbreviation}
          src={`https://flagsapi.com/${city.abbreviation}/flat/64.png`}
        />
        <h2 className="italic">{city.country}</h2>
      </div>
      <div className="  w-full h-full flex justify-center items-center bg-black/20 rounded-sm">
        {!condition ? (
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        ) : (
          <div className=" w-full    flex gap-[0.2rem] justify-center items-center overflow-y-auto relative">
            <div className="flex-1  p-[0.2rem] h-full ">
              {Object.entries(condition?.components).map(
                ([key, value], index) => (
                  <div className="flex w-full " key={index}>
                    <h1 className="flex-1">{key}:</h1>
                    <h1 className=" italic">{value}</h1>
                  </div>
                )
              )}
            </div>
            <div className="text-center  text-[3rem] flex-1 ">
              <div className="">{condition?.main.aqi}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CityTile;
