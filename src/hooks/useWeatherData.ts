import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';

const useWeatherData = (location: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Placeholder for fetching weather data
    if (location) {
      setWeatherData({ temp: 25, condition: 'Sunny', location });
    }
  }, [location]);

  return weatherData;
};

export default useWeatherData;
