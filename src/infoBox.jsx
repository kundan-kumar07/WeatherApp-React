import { useEffect, useState } from "react";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function InfoBox({ info }) {
  const [imageUrl, setImageUrl] = useState("");
  const [WeatherIcon, setWeatherIcon] = useState(null);

  // Default URLs for weather conditions
  const INIT_URL = "https://img.freepik.com/free-photo/anime-style-clouds_23-2151071731.jpg";
  const RAIN_URL = "https://images.unsplash.com/photo-1576514864427-f0809d2b66eb";
  const HOT_URL = "https://images.unsplash.com/photo-1524594081293-190a2fe0baae";
  const COLD_URL = "https://images.unsplash.com/photo-1518528751534-7bed4f1dfb31";
  const CLOUDY_URL = "https://images.unsplash.com/photo-1602491670326-0b0b9e51c2de";

  useEffect(() => {
    const getImageAndIconForTemperature = (temp) => {
      if (!temp && temp !== 0) {
        setImageUrl(INIT_URL);
        setWeatherIcon(null);
        return;
      }

      if (temp >= 30) {
        setImageUrl(HOT_URL);
        setWeatherIcon(<WbSunnyIcon fontSize="large" />);
      } else if (temp <= 10) {
        setImageUrl(COLD_URL);
        setWeatherIcon(<AcUnitIcon fontSize="large" />);
      } else if (temp >= 27) {
        setImageUrl(HOT_URL);
        setWeatherIcon(<WbSunnyIcon fontSize="large" />);
      } else if (temp >= 15) {
        setImageUrl(RAIN_URL);
        setWeatherIcon(<ThunderstormIcon fontSize="large" />);
      } else if (temp >= 10) {
        setImageUrl(CLOUDY_URL);
        setWeatherIcon(<CloudIcon fontSize="large" />);
      }
    };

    if (info?.temp !== undefined) {
      getImageAndIconForTemperature(info.temp);
    }
  }, [info?.temp]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div>
      <div 
        className="cardContainer" 
        style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}
      >
        <Card 
          sx={{ 
            maxWidth: { xs: 300, sm: 300, md: 400 },
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
              {info.name} {WeatherIcon}
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
