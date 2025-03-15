import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./infoBox";
export default function WeatherApp(){
  let [weatherInfo,setWeatherInfo]=useState({
    country: "IN",
    feelsLike: 34.34,
    humidity: 29,

    name: "Haldia",
    temp: 34.91,
    tempMax: 34.91,
    tempMin: 34.91,
    weather: "clear sky",
  })
  let updateInfo=(newInfo)=>{
    setWeatherInfo(newInfo);
  }
  return(
    <div>
      <h1 style={{textAlign:"center"}}>Weather App by Kundan</h1>
      <SearchBox updateInfo={updateInfo}></SearchBox>
      <br /><br />
      <InfoBox info={weatherInfo}></InfoBox>
    </div>
  )

}