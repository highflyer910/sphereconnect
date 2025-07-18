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

  return (
    <Paper
      elevation={3}
      sx={{
        width: '95%',
        maxWidth: 1400,
        mx: 'auto',
        mt: { xs: 2, sm: 3, md: 3 },
        p: { xs: 2, sm: 3, md: 3.5, lg: 4 },
        borderRadius: { xs: 3, sm: 4 },
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
          : `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        // Overlay for better text contrast
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(255, 255, 255, 0.15)',
          zIndex: 1,
        },
        '& > *': {
          position: 'relative',
          zIndex: 2,
        },
        boxShadow: theme.shadows[4],
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} alignItems="center">
        <Grid item xs={12} md={8} lg={7}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: { xs: 400, sm: 300 },
              mb: { xs: 0.5, sm: 1 },
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
              textShadow: theme.palette.mode === 'dark' 
                ? '0 2px 4px rgba(0,0,0,0.3)' 
                : '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Happy {weekday}, Anita!
          </Typography>
          <Typography 
            variant="body1" 
            aria-live="polite" 
            sx={{ 
              opacity: 0.95,
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme.palette.mode === 'dark' ? '#E8F5E8' : '#F5F5F5',
              textShadow: theme.palette.mode === 'dark' 
                ? '0 1px 2px rgba(0,0,0,0.3)' 
                : '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            {currentTime}
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1, sm: 1.5 }}
            sx={{
              alignItems: { xs: 'stretch', sm: 'center' },
            }}
          >
            <Stat icon={<Mail size={18} />} label="5 new messages" />
            <Stat icon={<Calendar size={18} />} label="3 meetings today" />
            <Stat icon={<ListTodo size={18} />} label="7 pending tasks" />
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
            mt: { xs: 2, md: 0 },
          }}
        >
          <WeatherBox transparent={true} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const Stat = ({ icon, label }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.75, sm: 1 },
        px: { xs: 2, sm: 2.5 },
        py: { xs: 0.75, sm: 1 },
        borderRadius: 99,
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.2)' 
          : 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(10px)',
        border: theme.palette.mode === 'dark' 
          ? '1px solid rgba(255,255,255,0.1)' 
          : '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-2px)',
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.25)' 
            : 'rgba(255,255,255,0.5)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 4px 12px rgba(0,0,0,0.2)',
        },
      }}
    >
      {React.cloneElement(icon, { 
        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
        size: 18 
      })}
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          fontSize: { xs: '0.8rem', sm: '0.875rem' },
          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
          textShadow: theme.palette.mode === 'dark' 
            ? '0 1px 2px rgba(0,0,0,0.3)' 
            : '0 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default WelcomeSection;