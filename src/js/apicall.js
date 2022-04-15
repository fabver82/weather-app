import axios from "axios";
import API_KEY from "../js/config";
export default async function getWeather(city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
