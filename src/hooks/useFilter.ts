import { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import { CityDTO } from "../types/City";
import { predAqi, predCity, predCountry } from "../utils/filters";
import { AirConditionDTO } from "../types/AirCondition";

interface useSortProps {
  setFilters: React.Dispatch<React.SetStateAction<CityDTO[] | null>>;
  condition: AirConditionDTO[] | null;
  data: CityDTO[] | null;
}
export function useFilter({ data, condition, setFilters }: useSortProps) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e: any) => {
    setCountry(e.target.value);
  };

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  useEffect(() => {
    if (data && condition)
      setFilters(
        data?.filter(
          (item, index) =>
            predCity(item, city) &&
            predCountry(item, country) &&
            predAqi(condition[data.indexOf(item)], [...(selectedOptions ?? [])])
        )
      );
  }, [city, country, data, condition, selectedOptions, setFilters]);

  return {
    country,
    city,
    handleCityChange,
    handleCountryChange,
    selectedOptions,
    setSelectedOptions,
    options,
  };
}
