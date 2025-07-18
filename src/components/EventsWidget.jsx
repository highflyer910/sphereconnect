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
              transition: 'border-color 0.3s ease',
              '&:hover': {
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
                    color: 'text.secondary',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Clock size={12} aria-hidden="true" />
                  <time dateTime={`${event.date}T${event.time}`}>{event.date} • {event.time}</time>
                </Typography>
                <Typography
                  id={`event-title-${index}`}
                  variant="subtitle1"
                  component="h4"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: 'text.primary',
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
                aria-label={`Event type: ${event.type}`}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
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