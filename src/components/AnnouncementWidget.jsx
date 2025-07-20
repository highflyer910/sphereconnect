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
                '& .announcement-title': {
                  color: theme.palette.primary.main,
                },
                '& .announcement-chip': {
                  transform: 'scale(1.05)',
                  filter: 'brightness(1.1)',
                },
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mb: 0.5,
                display: 'block',
                transition: 'color 0.3s ease',
                zIndex: 2,
                position: 'relative',
              }}
            >
              {item.date}
            </Typography>
            <Typography
              id={`announcement-title-${index}`}
              variant="subtitle1"
              component="h4"
              className="announcement-title"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: 'text.primary',
                transition: 'color 0.3s ease',
                zIndex: 2,
                position: 'relative',
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 1.5,
                color: 'text.secondary',
                transition: 'color 0.3s ease',
                zIndex: 2,
                position: 'relative',
              }}
            >
              {item.description}
            </Typography>
            <Chip
              label={item.tag}
              color={item.tagColor}
              size="small"
              className="announcement-chip"
              sx={{
                transition: 'all 0.3s ease',
                zIndex: 2,
                position: 'relative',
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default React.memo(AnnouncementsWidget);