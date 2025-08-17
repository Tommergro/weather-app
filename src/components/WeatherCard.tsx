import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherCard.css';

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
}

interface WeatherCardProps {
  location: string;
  units: 'metric' | 'imperial';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, units }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_WEATHER_API_URL;
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    // Fetch weather data when location changes
    const fetchWeatherData = async () => {
      if (!location) return;

      setIsLoading(true);
      setError('');

      try {
        const response = await axios.get(`${API_URL}/data/2.5/weather`, {
          params: {
            q: location,
            appid: API_KEY,
            units: units,
          },
        });

        const data = response.data;
        setWeatherData({
          temp: data.main.temp,
          condition: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          windDirection: getWindDirection(data.wind.deg),
          pressure: data.main.pressure,
          visibility: data.visibility / 1000, // Convert to kilometers
        });
      } catch (err) {
        setError('Failed to fetch weather data. Please try again: ' + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, units]);

  const getWindDirection = (degree: number): string => {
    // Convert wind degree to cardinal direction
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const getBackgroundColor = (temperature: number): string => {
    // Adjust background color based on temperature
    if (temperature < 10) return 'rgba(0, 0, 255, 0.2)'; // Blue for cold
    if (temperature < 25) return 'rgba(0, 255, 0, 0.2)'; // Green for mild
    return 'rgba(255, 0, 0, 0.2)'; // Red for hot
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    weatherData && (
      <div
        className="weather-card"
        style={{ backgroundColor: getBackgroundColor(weatherData.temp) }}
      >
        <h2>{location}</h2>
        <div className="weather-main">
          <img src={weatherData.icon} alt={weatherData.condition} />
          <div>
            <h3>
              {weatherData.temp}
              {units === 'metric' ? '°C' : '°F'}
            </h3>
            <p>{weatherData.condition}</p>
          </div>
        </div>
        <div className="weather-details">
          <p>Humidity: {weatherData.humidity}%</p>
          <p>
            Wind: {units === 'metric' ? `${weatherData.windSpeed} m/s` : `${(weatherData.windSpeed * 2.237).toFixed(1)} mph`} {weatherData.windDirection}
          </p>
          <p>Pressure: {units === 'metric' ? `${weatherData.pressure} hPa` : `${(weatherData.pressure * 0.02953).toFixed(2)} inHg`}</p>
          <p>Visibility: {units === 'metric' ? `${weatherData.visibility} km` : `${(weatherData.visibility * 0.621371).toFixed(1)} miles`}</p>
        </div>
      </div>
    )
  );
};

export default WeatherCard;
