import React from "react";

export default function WeatherCard({ weathers, city }) {
  // console.log(weathers);
  return (
    <table>
      {weathers.map((weather) => {
        return (
          <tr>
            <td>{weather.date.toDateString()}</td>
            <td>{weather.description}</td>
            <td>{weather.minTemp.toString()}</td>
            <td>{weather.maxTemp.toString()}</td>
          </tr>
        );
      })}
    </table>
  );
}
