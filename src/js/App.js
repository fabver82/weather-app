import React, { useState, useEffect } from "react";
import Input from "../js/Input";
import getWeather from "../js/apicall";

export function App() {
  const [city, setCity] = useState("Namur");

  useEffect(() => {
    getWeather(city).then((data) => {
      console.log(data);
    });
  }, [city]);
  return (
    <div className="App">
      <Input setCity={setCity} />
    </div>
  );
}
