import { GeoLocDTO } from "../types/GeoLoc";

export async function getAirCondition(geoLoc: GeoLocDTO) {
  return fetch(
    process.env.REACT_APP_API_URL +
      "/data/2.5/air_pollution?lat=" +
      geoLoc.lat +
      "&lon=" +
      geoLoc.lon +
      "&appid=" +
      process.env.REACT_APP_API_KEY
  )
    .then((response) => response.json())
    
}
