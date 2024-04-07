import { AirConditionDTO } from "../types/AirCondition";
import { CityDTO } from "../types/City";

export function alphabeticalCity(dto: CityDTO, dto2: CityDTO) {
  return dto.city.toLowerCase() > dto2.city.toLowerCase() ? 1 : -1;
}
export function alphabeticalCountry(dto: CityDTO, dto2: CityDTO) {
  return dto.country.toLowerCase() > dto2.country.toLowerCase() ? 1 : -1;
}

export function ascedingAqi(
  dto: AirConditionDTO | null,
  dto2: AirConditionDTO | null
) {
  if (!dto || !dto2) return 0;

  if (dto.main.aqi === dto2.main.aqi) return 0;
  return dto?.main.aqi > dto2?.main.aqi ? 1 : -1;
}
