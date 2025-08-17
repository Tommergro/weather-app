# Weather App

## Overview
The Weather App is a responsive React application that allows users to search for weather information by location. It features a theme toggle (light/dark mode) and a unit toggle (metric/imperial) for temperature and other weather metrics. The app uses Redux for state management and integrates with the OpenWeatherMap API to fetch real-time weather data.

## Features
- Search for weather by location.
- Toggle between light and dark themes.
- Switch between metric (°C) and imperial (°F) units.
- Responsive design for desktop, tablet, and mobile devices.

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- An API key from [OpenWeatherMap](https://openweathermap.org/api).
- An API key from [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tommergro/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```env
   REACT_APP_WEATHER_API_URL=https://api.openweathermap.org
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   REACT_APP_GEO_API_URL=https://wft-geo-db.p.rapidapi.com
   REACT_APP_GEO_API_KEY=your_geo_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```


## Technologies Used
- React with TypeScript
- Redux for state management
- Material-UI for UI components
- Axios for API requests
- OpenWeatherMap API for weather data
- GeoDB Cities API for location suggestions