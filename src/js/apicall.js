import axios from "axios";
import { API_KEY_WEATHER, API_KEY_UNSPLASH } from "../js/config";

async function getCoordinates(city) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY_WEATHER}`
    );
    return { lat: response.data[0].lat, lon: response.data[0].lon };
    // return response;
  } catch (error) {
    // console.error(error);
    return { lat: false, lon: false };
  }
}
async function getDatas(coordinates) {
  // console.log(coordinates);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY_WEATHER}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
export default async function getWeather(city) {
  let coordinates = await getCoordinates(city);
  if (coordinates.lat != false) {
    return await getDatas(coordinates);
  } else {
    return false;
  }
}
export async function getImage(city) {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${city}&client_id=${API_KEY_UNSPLASH}`
    );

    return response.data.results[0].links.download;
  } catch (error) {
    // console.error(error);
    return false;
  }
}
