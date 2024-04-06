import { AirConditionDTO } from "../types/AirCondition";
import { CityDTO } from "../types/City";



export function predCountry(dto: CityDTO, country: string): boolean {
  if (country) {
    return dto.country.toLowerCase().includes(country.toLowerCase());
  }
  return true;
}

export function predCity(dto: CityDTO, city: string): boolean {
  if (city) {
    return dto.city.toLowerCase().includes(city.toLowerCase());
  }
  return true;
}

export function predAqi(dto: AirConditionDTO, aqi: number): boolean {
  if (aqi) {
    return dto.main.aqi === aqi;
  }
  return true;
}
