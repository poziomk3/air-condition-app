import { useEffect, useState } from "react";
import {
  alphabeticalCity,
  alphabeticalCountry,
  ascedingAqi,
} from "../utils/sorters";
import { AirConditionDTO } from "../types/AirCondition";
import { CityDTO } from "../types/City";

interface useSortProps {
  setFilters: (value: React.SetStateAction<CityDTO[] | null>) => void;
  filters: CityDTO[] | null;
  condition: AirConditionDTO[] | null;
  data: CityDTO[] | null;
}
export function useSort({
  filters,
  condition,
  data,
  setFilters,
}: useSortProps) {
  const [sortOption, setSortOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const sortOptions = [
    { label: "Alphabetical city order", value: "1" },
    { label: "Reversed alphabetical city order", value: "2" },
    { label: "Alphabetical country order", value: "3" },
    { label: "Reversed aphabetical country order", value: "4" },
    { label: "Ascending AQI", value: "5" },
    { label: "Descending AQI", value: "6" },
  ];

  useEffect(() => {
    if (filters && sortOption) {
      let sortedFilters = [...filters]; // Create a copy of filters array to avoid mutating state directly
      if (sortOption.value === "1") {
        sortedFilters.sort((item1, item2) => alphabeticalCity(item1, item2));
      } else if (sortOption.value === "2") {
        sortedFilters.sort(
          (item1, item2) => -1 * alphabeticalCity(item1, item2)
        );
      } else if (sortOption.value === "3") {
        sortedFilters.sort((item1, item2) => alphabeticalCountry(item1, item2));
      } else if (sortOption.value === "4") {
        sortedFilters.sort(
          (item1, item2) => -1 * alphabeticalCountry(item1, item2)
        );
      } else if (sortOption.value === "5") {
        sortedFilters.sort((item1, item2) =>
          ascedingAqi(
            condition?.[data?.indexOf(item1) ?? 0] ?? null,
            condition?.[data?.indexOf(item2) ?? 0] ?? null
          )
        );
      } else if (sortOption.value === "6") {
        sortedFilters.sort(
          (item1, item2) =>
            -1 *
            ascedingAqi(
              condition?.[data?.indexOf(item1) ?? 0] ?? null,
              condition?.[data?.indexOf(item2) ?? 0] ?? null
            )
        );
      }
      setFilters(sortedFilters); // Update state with the sorted array
    }
  }, [condition, data, filters, setFilters, sortOption]);
  return {
    sortOptions,
    setSortOption,
  };
}
