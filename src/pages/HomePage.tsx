import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onLocationSelect={setLocation} />
      {location && <WeatherCard location={location} />}
    </div>
  );
};

export default HomePage;
