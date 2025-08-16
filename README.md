### Step 1: Set Up Your React and TypeScript Project

1. **Install Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Create a New React App**: Use Create React App with TypeScript template to set up your project.

   ```bash
   npx create-react-app weather-app --template typescript
   cd weather-app
   ```

3. **Install Axios**: Axios is a promise-based HTTP client that will help you make API requests.

   ```bash
   npm install axios
   ```

### Step 2: Choose a Weather API

For this example, we will use the OpenWeatherMap API. You will need to sign up and get an API key.

1. Go to [OpenWeatherMap](https://openweathermap.org/api) and create an account.
2. After logging in, navigate to the API section and generate your API key.

### Step 3: Create the Weather Component

1. **Create a new folder for components**:

   ```bash
   mkdir src/components
   ```

2. **Create a Weather component**:

   Create a file named `Weather.tsx` in the `src/components` folder.

   ```tsx
   // src/components/Weather.tsx
   import React, { useState } from 'react';
   import axios from 'axios';

   const Weather: React.FC = () => {
       const [location, setLocation] = useState<string>('');
       const [weatherData, setWeatherData] = useState<any>(null);
       const [error, setError] = useState<string>('');

       const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

       const fetchWeather = async () => {
           if (!location) return;

           try {
               const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
               setWeatherData(response.data);
               setError('');
           } catch (err) {
               setError('Could not fetch weather data. Please try again.');
               setWeatherData(null);
           }
       };

       const handleSubmit = (e: React.FormEvent) => {
           e.preventDefault();
           fetchWeather();
       };

       return (
           <div>
               <h1>Weather App</h1>
               <form onSubmit={handleSubmit}>
                   <input
                       type="text"
                       value={location}
                       onChange={(e) => setLocation(e.target.value)}
                       placeholder="Enter location"
                   />
                   <button type="submit">Get Weather</button>
               </form>
               {error && <p>{error}</p>}
               {weatherData && (
                   <div>
                       <h2>{weatherData.name}</h2>
                       <p>Temperature: {weatherData.main.temp} °C</p>
                       <p>Weather: {weatherData.weather[0].description}</p>
                   </div>
               )}
           </div>
       );
   };

   export default Weather;
   ```

### Step 4: Use the Weather Component in Your App

1. Open `src/App.tsx` and import the `Weather` component.

   ```tsx
   // src/App.tsx
   import React from 'react';
   import Weather from './components/Weather';

   const App: React.FC = () => {
       return (
           <div className="App">
               <Weather />
           </div>
       );
   };

   export default App;
   ```

### Step 5: Style Your Application

You can add some basic styles in `src/App.css` or create a new CSS file for your `Weather` component.

```css
/* src/App.css */
.App {
    text-align: center;
    margin: 20px;
}

form {
    margin-bottom: 20px;
}

input {
    padding: 10px;
    margin-right: 10px;
}

button {
    padding: 10px;
}
```

### Step 6: Run Your Application

Now that everything is set up, you can run your application.

```bash
npm start
```

### Step 7: Test Your Application

Open your browser and navigate to `http://localhost:3000`. You should see your weather application. Enter a location (e.g., "London") and click "Get Weather" to see the current weather data.

### Additional Features to Consider

- **Error Handling**: Improve error handling for different scenarios (e.g., invalid location).
- **Loading State**: Add a loading spinner while fetching data.
- **Unit Conversion**: Allow users to switch between Celsius and Fahrenheit.
- **Forecast Data**: Extend the application to show a 5-day weather forecast.
- **Styling**: Use a CSS framework like Bootstrap or Material-UI for better styling.

### Conclusion

You now have a basic weather application built with React and TypeScript. You can expand upon this foundation by adding more features and improving the user interface. Happy coding!