import { useEffect, useState } from "react";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function InfoBox({ info }) {
  const [imageUrl, setImageUrl] = useState("");

  // Default URLs for weather conditions
  const INIT_URL = "https://img.freepik.com/free-photo/anime-style-clouds_23-2151071731.jpg?t=st=1742026269~exp=1742029869~hmac=b112769b9af30ce6eef6cbbb2a7a00c54c8b625387fa5583f00c4a41357876de&w=1380";
  const RAIN_URL = "https://images.unsplash.com/photo-1576514864427-f0809d2b66eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fHJhaW58ZW58MHx8MHx8fDA%3D";
  const HOT_URL = "https://images.unsplash.com/photo-1524594081293-190a2fe0baae?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COLD_URL = "https://images.unsplash.com/photo-1518528751534-7bed4f1dfb31?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    // Function to determine the image based on temperature
    const getImageForTemperature = (temp) => {
      if (!temp && temp !== 0) return INIT_URL;
      if (temp <= 10) return COLD_URL;
      if (temp >= 30) return HOT_URL;
      return RAIN_URL; // Default to rain or mixed weather
    };

    if (info?.temp !== undefined) {
      setImageUrl(getImageForTemperature(info.temp));
    }
  }, [info?.temp]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div>
      <div className="cardContainer" style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <Card 
  sx={{ 
    maxWidth: { xs: 300, sm: 300, md: 400 }, // Reduce width on phones
    minWidth: { xs: 150, sm: 250, md: 350 } 
  }}
>
  <CardMedia
    sx={{ height: 230 }}
    image={imageUrl}
    title="Weather"
  />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.name}{info.temp>=30?<WbSunnyIcon></WbSunnyIcon>:info.temp<=10?<AcUnitIcon></AcUnitIcon>:<ThunderstormIcon></ThunderstormIcon>}
              
            </Typography>

            <Typography variant="body1" sx={{ color: "text.primary", marginBottom: 1 }}>
              {`📅 ${today} — Here's your weather update:`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              🌍 <b>Country:</b> {info.country}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              💧 <b>Humidity:</b> {info.humidity}%
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              🔥 <b>High Today:</b> {info.tempMax}°C
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ❄️ <b>Low Today:</b> {info.tempMin}°C
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              🌡️ <b>Current Temperature:</b> {info.temp}°C
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <b>Feels Like:</b> {info.feelsLike}°C
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
