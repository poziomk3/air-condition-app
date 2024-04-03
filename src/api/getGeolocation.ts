import { CityDTO } from "../types/City";
import { GeoLocDTO } from "../types/GeoLoc";

export async function getGeolocation(city: CityDTO): Promise<GeoLocDTO> {
  return fetch(
    process.env.REACT_APP_API_URL +
      "/geo/1.0/direct?q=" +
      city.city +
      "&appid=" +
      process.env.REACT_APP_API_KEY
  )
    .then((response) => response.json())
    .then((responseData) => ({
      lat: responseData[0].lat,
      lon: responseData[0].lon,
    }));
}
