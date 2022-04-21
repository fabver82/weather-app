import React, { useState, useEffect } from "react";
import Input from "../js/Input";
import WeatherCard from "../js/WeatherCard";
import getWeather, { getImage } from "../js/apicall";
import styled from "styled-components";
const Container = styled.div`
  background-image: url("${(props) => props.image}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 98vh;
  min-height: 400px;
  min-width: 372px;
  max-width: 98vw;
  margin: 0 auto;
  border-radius: 15px;
  margin-top: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;
const Input = styled.input`
  background-color: red;
  border: 10px solid red;
`;
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
    <Container image={cityImage}>
      <Input setCity={setCity} />
      <WeatherCard weathers={weathers} city={city} />
    </Container>
  );
}
