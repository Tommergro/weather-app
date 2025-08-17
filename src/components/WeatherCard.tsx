import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherCard.css';

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

const WeatherCard: React.FC<{ location: string }> = ({ location }) => {
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
        const response = await axios.get(`${API_URL}/weather`, {
          params: {
            q: location,
            appid: API_KEY,
            units: 'metric',
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
  }, [location]);

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
            <h3>{weatherData.temp}°C</h3>
            <p>{weatherData.condition}</p>
          </div>
        </div>
        <div className="weather-details">
          <p>Humidity: {weatherData.humidity}%</p>
          <p>
            Wind: {weatherData.windSpeed} m/s {weatherData.windDirection}
          </p>
          <p>Pressure: {weatherData.pressure} hPa</p>
          <p>Visibility: {weatherData.visibility} km</p>
        </div>
      </div>
    )
  );
};

export default WeatherCard;
