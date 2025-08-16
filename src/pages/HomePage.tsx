import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Typography,
  Box,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { WbSunny, Nightlight } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" style={{ marginBottom: '1rem' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Weather App
          </Typography>
          <Box style={{ flexGrow: 1, marginLeft: '1rem', marginRight: '1rem' }}>
            <SearchBar onLocationSelect={setLocation} />
          </Box>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <WbSunny /> : <Nightlight />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        style={{ marginTop: '2rem', textAlign: 'center' }}
      >
        {location && <WeatherCard location={location} />}
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
