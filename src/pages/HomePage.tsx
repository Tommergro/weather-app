import React from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar />
      <WeatherCard />
    </div>
  );
};

export default HomePage;
