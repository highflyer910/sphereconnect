import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  useTheme,
  Divider,
} from '@mui/material';
import { Megaphone } from 'lucide-react';

const announcements = [
  {
    date: 'July 18, 2025',
    title: 'Summer Hackathon Kickoff',
    description:
      'Join us this Friday for the opening of our 48-hour internal hackathon! Food, fun, and fantastic prizes await!',
    tag: 'Event',
    tagColor: 'primary',
  },
  {
    date: 'July 14, 2025',
    title: 'Mid-Year Performance Reviews',
    description:
      'Managers will begin performance reviews starting July 10. Make sure to update your self-assessment forms by the 9th.',
    tag: 'HR',
    tagColor: 'warning',
  },
];

const AnnouncementsWidget = () => {
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
      aria-labelledby="announcements-heading"
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
          id="announcements-heading"
          variant="h6"
          component="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
          }}
        >
          <Megaphone size={22} color={theme.palette.primary.main} />
          Announcements
        </Typography>
        <Button size="small" variant="outlined" aria-label="View all announcements">
          View All
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto' }}>
        {announcements.map((item, index) => (
          <Box
            component="article"
            key={index}
            aria-labelledby={`announcement-title-${index}`}
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
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
            >
              {item.date}
            </Typography>
            <Typography
              id={`announcement-title-${index}`}
              variant="subtitle1"
              component="h4"
              sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1.5, color: 'text.secondary' }}
            >
              {item.description}
            </Typography>
            <Chip label={item.tag} color={item.tagColor} size="small" />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default React.memo(AnnouncementsWidget);