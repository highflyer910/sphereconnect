import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import {
  CloudSun,
  Eye,
  Droplet,
  Wind,
  AlertTriangle,
  Snowflake,
  CloudRain,
} from 'lucide-react';

const API_KEY = '9db67f1625cd4411a45214901250502';

const getIcon = (code) => {
  const map = {
    1000: <CloudSun size={28} />,
    1003: <CloudSun size={28} />,
    1006: <CloudSun size={28} />,
    1009: <CloudSun size={28} />,
    1030: <CloudSun size={28} />,
    1063: <CloudRain size={28} />,
    1066: <Snowflake size={28} />,
    1069: <CloudRain size={28} />,
    1072: <CloudRain size={28} />,
    1087: <AlertTriangle size={28} />,
    1114: <Snowflake size={28} />,
    1117: <Snowflake size={28} />,
    1135: <CloudRain size={28} />,
    1147: <CloudRain size={28} />,
    1150: <CloudRain size={28} />,
    1153: <CloudRain size={28} />,
    1168: <CloudRain size={28} />,
    1171: <CloudRain size={28} />,
    1180: <CloudRain size={28} />,
    1183: <CloudRain size={28} />,
    1186: <CloudRain size={28} />,
    1189: <CloudRain size={28} />,
    1192: <CloudRain size={28} />,
    1195: <CloudRain size={28} />,
    1198: <CloudRain size={28} />,
    1201: <CloudRain size={28} />,
    1204: <CloudRain size={28} />,
    1207: <CloudRain size={28} />,
    1276: <CloudRain size={28} />,
  };
  return map[code] || <AlertTriangle size={28} />;
};

const WeatherBox = ({ transparent = false }) => {
  const theme = useTheme();
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
      );
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Unable to load weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
        (err) => {
          console.error('Geolocation error:', err);
          setError('Geolocation not available');
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation not supported');
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  const handleUnit = (e, newUnit) => {
    if (newUnit) setUnit(newUnit);
  };

  const temp = weather
    ? unit === 'C'
      ? `${weather.current.temp_c}°C`
      : `${weather.current.temp_f}°F`
    : '--';

  const containerStyles = transparent
    ? {
        px: 2,
        py: 1.5,
        minWidth: { xs: 200, sm: 220 },
        width: '100%',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 4,
        background: 'transparent',
        color: 'white',
        border: 'none',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.03)' },
      }
    : {
        px: 2,
        py: 1.5,
        minWidth: { xs: 200, sm: 220 },
        width: '100%',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.03)' },
      };

  const toggleButtonStyles = transparent
    ? {
        bgcolor: 'rgba(255,255,255,0.2)',
        '& .MuiToggleButton-root': {
          color: 'white',
          borderColor: 'rgba(255,255,255,0.3)',
          '&.Mui-selected': {
            bgcolor: 'rgba(255,255,255,0.3)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
          },
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
        },
      }
    : {
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        '& .MuiToggleButton-root': {
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
          '&.Mui-selected': {
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': { bgcolor: theme.palette.primary.dark },
          },
        },
      };

  const loadingColor = transparent ? 'white' : theme.palette.primary.main;
  const textColor = transparent ? 'white' : theme.palette.text.primary;

  return (
    <Paper
      elevation={transparent ? 0 : 2}
      sx={containerStyles}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <ToggleButtonGroup
          size="small"
          value={unit}
          exclusive
          onChange={handleUnit}
          sx={toggleButtonStyles}
        >
          <ToggleButton value="C">°C</ToggleButton>
          <ToggleButton value="F">°F</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} sx={{ color: loadingColor }} />
        </Box>
      ) : error ? (
        <Typography 
          variant="body2" 
          sx={{ textAlign: 'center', opacity: 0.9, color: textColor }}
        >
          {error}
        </Typography>
      ) : (
        <>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: textColor }}>{React.cloneElement(getIcon(weather?.current?.condition?.code), { color: textColor })}</Box>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ fontWeight: 400, opacity: 0.95, color: textColor }}
              >
                {temp}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ opacity: 0.9, color: textColor }}
              >
                {weather?.current?.condition?.text}
              </Typography>
            </Box>
          </Stack>

          <Typography 
            variant="caption" 
            sx={{ mt: 0.5, opacity: 0.9, color: textColor }}
          >
            {weather?.location?.name}, {weather?.location?.region}
          </Typography>

          <Stack spacing={0.5} mt={1}>
            <Typography
              variant="body2"
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{ opacity: 0.9, color: textColor }}
            >
              {React.cloneElement(<Eye size={14} />, { color: textColor })} Visibility: {weather?.current?.vis_km} km
            </Typography>
            <Typography
              variant="body2"
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{ opacity: 0.9, color: textColor }}
            >
              {React.cloneElement(<Droplet size={14} />, { color: textColor })} Humidity: {weather?.current?.humidity}%
            </Typography>
            <Typography
              variant="body2"
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{ opacity: 0.9, color: textColor }}
            >
              {React.cloneElement(<Wind size={14} />, { color: textColor })} Wind: {weather?.current?.wind_kph} kph
            </Typography>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default WeatherBox;