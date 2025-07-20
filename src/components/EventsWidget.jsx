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
  Divider,
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
];

const EventsWidget = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: 'background.paper',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="region"
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
          component="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
          }}
        >
          <Calendar size={22} color={theme.palette.primary.main} />
          Upcoming Events
        </Typography>
        <Button size="small" variant="outlined" aria-label="View all upcoming events">
          View All
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto' }}>
        {events.map((event, index) => (
          <Box
            component="article"
            key={index}
            aria-labelledby={`event-title-${index}`}
            aria-describedby={`event-details-${index}`}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${theme.palette.primary.main}08, 
                  transparent
                )`,
                transition: 'left 0.6s ease',
                zIndex: 1,
              },
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: `${theme.palette.primary.main}02`,
                '&::before': {
                  left: '100%',
                },
                '& .event-title': {
                  color: theme.palette.primary.main,
                },
                '& .event-chip': {
                  transform: 'scale(1.05)',
                  filter: 'brightness(1.1)',
                },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1,
                zIndex: 2,
                position: 'relative',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    transition: 'color 0.3s ease',
                  }}
                >
                  <Clock size={12} aria-hidden="true" />
                  <time dateTime={`${event.date}T${event.time}`}>{event.date} • {event.time}</time>
                </Typography>
                <Typography
                  id={`event-title-${index}`}
                  variant="subtitle1"
                  component="h4"
                  className="event-title"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: 'text.primary',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 1,
                    transition: 'color 0.3s ease',
                  }}
                >
                  <MapPin size={12} aria-hidden="true" />
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
                aria-label={`${event.attendees} attendees`}
              >
                {event.attendees}
              </Avatar>
            </Box>

            <Typography
              id={`event-details-${index}`}
              variant="body2"
              sx={{
                mb: 1.5,
                color: 'text.secondary',
                lineHeight: 1.4,
                transition: 'color 0.3s ease',
                zIndex: 2,
                position: 'relative',
              }}
            >
              {event.description}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2,
                position: 'relative',
              }}
            >
              <Chip
                label={event.type}
                color={event.typeColor}
                size="small"
                className="event-chip"
                aria-label={`Event type: ${event.type}`}
                sx={{
                  transition: 'all 0.3s ease',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}
                aria-label={`${event.attendees} people attending`}
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

export default React.memo(EventsWidget);