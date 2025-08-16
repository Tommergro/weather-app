// Removed invalid terminal commands and added a placeholder API service
const fetchWeatherData = async (location: string) => {
  // Placeholder for API call to fetch weather data
  return { temp: 25, condition: 'Sunny', location };
};

export default fetchWeatherData;
