import React, { useState, useEffect } from "react";
import Input from "../js/Input";
import getWeather from "../js/apicall";

export function App() {
  const [city, setCity] = useState("Namur");
  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(event.target[0].value);
  };
  useEffect(() => {
    getWeather(city).then((data) => {
      console.log(data);
    });
  }, [city]);
  return (
    <div className="App">
      <Input handleSubmit={handleSubmit} />
    </div>
  );
}
