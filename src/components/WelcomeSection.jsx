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
        mt: { xs: 7, md: 3 },
        p: { xs: 2, sm: 3, lg: 3.5 },
        borderRadius: 4,
        background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        color: theme.palette.text.primary, // Ensure text color is from theme
        boxShadow: theme.shadows[4],
      }}
    >
      <Grid container spacing={1.5} alignItems="center">
        <Grid item xs={12} md={8} lg={7}>
          <Typography variant="h4" sx={{ fontWeight: 300, mb: 1, color: theme.palette.text.primary }}>
            Happy {weekday}, Anita!
          </Typography>
          <Typography variant="body1" aria-live="polite" sx={{ opacity: 0.9, mb: 2, color: theme.palette.text.secondary }}>
            {currentTime}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Stat icon={<Mail size={18} color={theme.palette.text.primary} />} label="5 new messages" />
            <Stat icon={<Calendar size={18} color={theme.palette.text.primary} />} label="3 meetings today" />
            <Stat icon={<ListTodo size={18} color={theme.palette.text.primary} />} label="7 pending tasks" />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={5}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            ml: { md: 'auto' },
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
        gap: 1,
        px: 2.5,
        py: 1,
        borderRadius: 99,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)', // Adjust background for dark mode
        backdropFilter: 'blur(8px)',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.05)' },
      }}
    >
      {icon}
      <Typography variant="body2" sx={{ fontWeight: 400, opacity: 0.95, color: theme.palette.text.primary }}>
        {label}
      </Typography>
    </Box>
  );
};

export default WelcomeSection;