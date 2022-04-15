import axios from "axios";
import { key } from "../js/config";
async function getWeather(city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
export default getWeather;
