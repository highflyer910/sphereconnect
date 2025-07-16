import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  useTheme,
  Avatar,
} from '@mui/material';
import { Calendar, Clock, MapPin } from 'lucide-react';

const events = [
  {
    date: 'July 19, 2025',
    time: '9:00 AM',
    title: 'Team Building Workshop',
    location: 'Conference Room A',
    description: 'Interactive workshop focused on improving team collaboration and communication skills.',
    type: 'Workshop',
    typeColor: 'primary',
    attendees: 12,
  },
  {
    date: 'July 22, 2025',
    time: '2:00 PM',
    title: 'Product Launch Meeting',
    location: 'Main Auditorium',
    description: 'Quarterly product roadmap presentation and launch strategy discussion.',
    type: 'Meeting',
    typeColor: 'info',
    attendees: 45,
  },
  {
    date: 'July 25, 2025',
    time: '6:00 PM',
    title: 'Company Social Hour',
    location: 'Rooftop Terrace',
    description: 'Monthly social gathering with refreshments and networking opportunities.',
    type: 'Social',
    typeColor: 'success',
    attendees: 28,
  },
];

const EventsWidget = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: theme.palette.background.paper,
        width: '100%',
        maxWidth: { xs: '100%', md: 350 },
        mx: { xs: 'auto', md: 0 },
        mt: 4,
        ml: { md: 4 },
      }}
      aria-labelledby="events-heading"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          id="events-heading"
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary,
          }}
        >
          <Calendar size={20} /> Upcoming Events
        </Typography>
        <Button size="small" variant="outlined">
          View All
        </Button>
      </Box>

      <Stack spacing={2}>
        {events.map((event, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[3],
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Clock size={12} />
                  {event.date} • {event.time}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 0.5, 
                    color: theme.palette.text.primary 
                  }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <MapPin size={12} />
                  {event.location}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {event.attendees}
              </Avatar>
            </Box>
            
            <Typography
              variant="body2"
              sx={{ 
                mb: 1.5, 
                color: theme.palette.text.secondary,
                lineHeight: 1.4,
              }}
            >
              {event.description}
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Chip 
                label={event.type} 
                color={event.typeColor} 
                size="small" 
              />
              <Typography
                variant="caption"
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                }}
              >
                {event.attendees} attending
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default EventsWidget;