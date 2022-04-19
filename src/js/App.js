import React, { useState, useEffect } from "react";
import Input from "../js/Input";
import WeatherCard from "../js/WeatherCard";
import getWeather, { getImage } from "../js/apicall";

export function App() {
  const [city, setCity] = useState("Namur");
  const [weathers, setWeathers] = useState([]);
  const [cityImage, setCityImage] = useState();

  //will check minTemp and maxTemp for the same day, return a list of weather datas for the next days.
  function sortDatas(datas) {
    const list = [];
    for (weatherData of datas) {
      const weatherDay = {
        date: new Date(weatherData.dt_txt),
        minTemp: weatherData.main.temp_min,
        maxTemp: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
      };
      //if first input or next date, add the data in the list
      if (
        list.length == 0 ||
        weatherDay.date.toDateString() !=
          list[list.length - 1].date.toDateString()
      ) {
        list.push(weatherDay);
      } else {
        //check if minTemp and maxTemp are different for the next day
        let previousDay = list[list.length - 1];
        if (previousDay.minTemp > weatherDay.minTemp) {
          list[list.length - 1].minTemp = weatherDay.minTemp;
        }
        if (previousDay.maxTemp < weatherDay.maxTemp) {
          list[list.length - 1].maxTemp = weatherDay.maxTemp;
        }
      }
    }
    return list;
  }
  useEffect(() => {
    getWeather(city).then((datas) => {
      if (datas === false) {
        console.log("we didn't found this city");
      } else {
        const weathersDatas = sortDatas(datas.data.list);
        setWeathers(weathersDatas);
      }
    });
    getImage(city).then((image) => {
      setCityImage(image);
    });
  }, [city]);
  return (
    <div className="App">
      <Input setCity={setCity} />
      <WeatherCard weathers={weathers} city={city} />
      <img src={cityImage} width="300" />
    </div>
  );
}
