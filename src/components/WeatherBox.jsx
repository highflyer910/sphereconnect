import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from '@mui/material';
import {
  CloudSun,
  Eye,
  Droplet,
  Wind,
  AlertTriangle,
  Snowflake,
  CloudRain,
  MapPin,
} from 'lucide-react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const STORAGE_KEY = 'weather_allowed_locations';

const getIcon = (code) => {
  if (code >= 1180 && code <= 1276) return <CloudRain size={28} />;
  if (code >= 1066 && code <= 1117) return <Snowflake size={28} />;
  if (code === 1087) return <AlertTriangle size={28} />;
  return <CloudSun size={28} />;
};

// Local storage 
const saveAllowedLocation = (location) => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const locationData = {
      name: location.name,
      region: location.region,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      timestamp: Date.now()
    };
    
    const exists = saved.find(loc => 
      loc.lat === locationData.lat && loc.lon === locationData.lon
    );
    
    if (!exists) {
      saved.push(locationData);
      if (saved.length > 10) {
        saved.shift();
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Failed to save location:', error);
  }
};

const getAllowedLocations = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Failed to get allowed locations:', error);
    return [];
  }
};

const isLocationAllowed = () => {
  try {
    return localStorage.getItem('weather_location_permission') === 'granted';
  } catch (error) {
    return false;
  }
};

const setLocationPermission = (granted) => {
  try {
    localStorage.setItem('weather_location_permission', granted ? 'granted' : 'denied');
  } catch (error) {
    console.error('Failed to save location permission:', error);
  }
};

const WeatherBox = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationRequested, setLocationRequested] = useState(false);

  useEffect(() => {
    if (isLocationAllowed()) {
      requestLocation();
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
      );
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const data = await res.json();
      setWeather(data);
      setLoading(false);
      
      saveAllowedLocation(data.location);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Unable to load weather data');
      setLoading(false);
    }
  };

  const requestLocation = () => {
    setLocationRequested(true);
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocationPermission(true);
          fetchWeather(coords.latitude, coords.longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setLocationPermission(false);
          setError('Location access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  };

  const handleUnitChange = (e, newUnit) => {
    if (newUnit) setUnit(newUnit);
  };

  const resetComponent = () => {
    setLocationRequested(false);
    setWeather(null);
    setError(null);
    setLoading(false);
  };

  const temp = weather ? (
    unit === 'C'
      ? `${Math.round(weather.current.temp_c)}°C`
      : `${Math.round(weather.current.temp_f)}°F`
  ) : '--';

  if (!locationRequested) {
    return (
      <Box sx={{ p: 2, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: 1.5,
        }}>
          <Box sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            mb: 1,
          }}>
            <MapPin size={28} color="#fff" />
          </Box>

          <Typography variant="body2" sx={{ color: '#fff', opacity: 0.9 }}>
            Get your local weather
          </Typography>

          <Button
            variant="outlined"
            size="small"
            startIcon={<MapPin size={16} />}
            onClick={requestLocation}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.4)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.6)',
              },
            }}
          >
            Enable Location
          </Button>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 2, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          flex: 1,
          flexDirection: 'column',
          gap: 2,
        }}>
          <CircularProgress size={32} sx={{ color: '#fff' }} />
          <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>
            Getting your weather...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          gap: 1.5,
        }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 0, 0, 0.1)',
          }}>
            <AlertTriangle size={24} color="#fff" />
          </Box>
          <Typography variant="body2" sx={{ color: '#fff', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={resetComponent}
            sx={{ 
              color: '#fff', 
              opacity: 0.8, 
              mt: 0.5,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography
          variant="caption"
          sx={{ 
            opacity: 0.9, 
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 500,
            mr: 1,
          }}
        >
          {weather?.location?.name}, {weather?.location?.region}
        </Typography>
        
        <ToggleButtonGroup
          size="small"
          value={unit}
          exclusive
          onChange={handleUnitChange}
          sx={{
            '& .MuiToggleButton-root': {
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.4)',
              minWidth: 32,
              height: 38,
              padding: '5px',
              fontSize: '0.7rem',
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.25)',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.6)',
              },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
              },
            },
          }}
        >
          <ToggleButton value="C">°C</ToggleButton>
          <ToggleButton value="F">°F</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Box sx={{ color: '#fff' }}>
          {getIcon(weather?.current?.condition?.code)}
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 400, 
              opacity: 0.95, 
              color: '#fff', 
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {temp}
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              opacity: 0.85, 
              color: '#fff',
              fontSize: '0.85rem',
            }}
          >
            {weather?.current?.condition?.text}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={0.8}>
        <Typography
          variant="body2"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ opacity: 0.85, color: '#fff', fontSize: '0.8rem' }}
        >
          <Eye size={14} color="#fff" /> 
          <span>Visibility: {weather?.current?.vis_km} km</span>
        </Typography>
        <Typography
          variant="body2"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ opacity: 0.85, color: '#fff', fontSize: '0.8rem' }}
        >
          <Droplet size={14} color="#fff" /> 
          <span>Humidity: {weather?.current?.humidity}%</span>
        </Typography>
        <Typography
          variant="body2"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ opacity: 0.85, color: '#fff', fontSize: '0.8rem' }}
        >
          <Wind size={14} color="#fff" /> 
          <span>Wind: {weather?.current?.wind_kph} kph</span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default WeatherBox;

