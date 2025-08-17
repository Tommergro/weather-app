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
import { LightMode, DarkMode } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
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
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleUnits} color="inherit">
              {units === 'metric' ? '°C' : '°F'}
            </IconButton>
            <IconButton onClick={handleToggleTheme} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        style={{ marginTop: '2rem', textAlign: 'center' }}
      >
        {location && <WeatherCard location={location} units={units} />}
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
