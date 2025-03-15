import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { useState } from 'react';
export default function SearchBox({updateInfo}){
  let [city,setCity]=useState("");
  const API_URL="http://api.openweathermap.org/geo/1.0/direct";
  const API2="https://api.openweathermap.org/data/2.5/weather"
  const API_KEY="c54aed0121b2726e6d64520f7f97a745";
  let getWeatherInfo = async () => {
    try {
      // First API call (city to coordinates)
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      const responseJson = await response.json();
      
      if (!response.ok) {
        throw new Error(responseJson.message);  // Handle API errors
      }
  
      
  
      // Extract latitude and longitude
      const { lat, lon } = responseJson[0];  
  
      // Second API call (fetch weather using lat & lon)
      const response2 = await fetch(`${API2}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const response2Json = await response2.json();
  
      console.log(response2Json);
      let result={
        temp:response2Json.main.temp,
        tempMin:response2Json.main.temp_min,
        tempMax:response2Json.main.temp_max,
        feelsLike:response2Json.main.feels_like,
        humidity:response2Json.main.humidity,
        name:response2Json.name,
        country:response2Json.sys.country,
        weather:response2Json.weather[0].description,
        icon:response2Json.weather[0].icon
        

      }
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  
  
  
  let handleChange=(event)=>{
    setCity(event.target.value);

  }
  let handleSubmit=async (event)=>{
    event.preventDefault();
    console.log(city);
    setCity("");
    let newInfo=await getWeatherInfo();
    updateInfo(newInfo);


  }
  return(
    <div className="searchBox" style={{textAlign:"center"}}>
    
    <form onSubmit={handleSubmit}>
    <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
    <br /><br /><Button variant="contained" endIcon={<SendIcon />} type="submit">search</Button>


    </form>
    </div>

  )
}