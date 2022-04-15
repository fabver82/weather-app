import axios from "axios";
import API_KEY from "../js/config";
async function getCoordinates(city) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    );
    return { lat: response.data[0].lat, lon: response.data[0].lon };
    // return response;
  } catch (error) {
    console.error(error);
  }
}
async function getDatas(coordinates) {
  console.log(coordinates);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
export default async function getWeather(city) {
  let data;
  await getCoordinates(city).then(async (lat, lon) => {
    data = await getDatas(lat, lon);
    console.log(data);
  });
  return data;
}
