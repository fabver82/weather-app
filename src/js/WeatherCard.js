import React from "react";

export default function WeatherCard({ weathers, city }) {
  // console.log(weathers);
  return (
    <table>
      <tr>
        <td colSpan="4">{city}</td>
      </tr>
      {weathers.map((weather) => {
        return (
          <tr>
            <td>{weather.date.toDateString()}</td>
            <td>{weather.description}</td>
            <td>{weather.humidity}</td>
            <td>{weather.minTemp.toString()}</td>
            <td>{weather.maxTemp.toString()}</td>
          </tr>
        );
      })}
    </table>
  );
}
