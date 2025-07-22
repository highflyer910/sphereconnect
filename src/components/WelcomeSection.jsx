import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, Grid } from '@mui/material';
import { Mail, Calendar, ListTodo } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import WeatherBox from './WeatherBox';

const WelcomeSection = () => {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      setCurrentTime(now.toLocaleDateString('en-US', options));
    };

    update();
    const intervalId = setInterval(update, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });

  const gradientColors = theme.palette.mode === 'dark' 
    ? `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
    : `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const textColor = '#FFFFFF';
  const secondaryTextColor = 'rgba(255, 255, 255, 0.9)';

  return (
    <Paper
      elevation={3}
      sx={{
        width: '95%',
        maxWidth: 1400,
        mx: 'auto',
        mt: { xs: 2, md: 3 },
        p: { xs: 2.5, sm: 3, lg: 4 },
        borderRadius: 4,
        background: theme.palette.primary.main,
        color: textColor,
        boxShadow: theme.shadows[4],
        border: 'none',
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
        <Grid item xs={12} md={8} lg={7}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 300, 
              mb: { xs: 0.5, sm: 1 },
              color: textColor,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            Happy {weekday}, Fiona!
          </Typography>
          <Typography 
            variant="body1" 
            aria-live="polite" 
            sx={{ 
              color: secondaryTextColor,
              mb: { xs: 2, sm: 2.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {currentTime}
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1, sm: 1.5 }}
            sx={{ 
              alignItems: { xs: 'stretch', sm: 'center' }
            }}
          >
            <Stat 
              icon={<Mail size={18} color={textColor} />} 
              label="5 new emails" 
              textColor={textColor}
            />
            <Stat 
              icon={<Calendar size={18} color={textColor} />} 
              label="2 upcoming birthdays" 
              textColor={textColor}
            />
            <Stat 
              icon={<ListTodo size={18} color={textColor} />} 
              label="3 pending tasks" 
              textColor={textColor}
            />
          </Stack>
        </Grid>
        <Grid
        item
        xs={12}
        md={4}
        lg={5}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          ml: { md: 'auto' },
        }}
        >
          <WeatherBox transparent={true} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const Stat = ({ icon, label, textColor }) => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: { xs: 2, sm: 2.5 },
        py: { xs: 1, sm: 1.2 },
        borderRadius: 99,
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-2px)',
          bgcolor: 'rgba(255, 255, 255, 0.25)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {icon}
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500, 
          color: textColor,
          fontSize: { xs: '0.85rem', sm: '0.875rem' },
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default WelcomeSection;