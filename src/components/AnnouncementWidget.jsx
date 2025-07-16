import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Button,
  useTheme,
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
  {
    date: 'July 12, 2025',
    title: 'New Wellness Perks',
    description:
      'Our employee wellness program just got better! Yoga classes, mental health days, and fresh fruit deliveries start next week.',
    tag: 'Wellness',
    tagColor: 'success',
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
        bgcolor: theme.palette.background.paper,
        width: '100%',
        maxWidth: { xs: '100%', md: 350 },
        mx: { xs: 'auto', md: 0 },
        mt: 4,
        ml: { md: 4 },
      }}
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
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary,
          }}
        >
          <Megaphone size={20} /> Announcements
        </Typography>
        <Button size="small" variant="outlined">
          View All
        </Button>
      </Box>

      <Stack spacing={2}>
        {announcements.map((item, index) => (
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
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
            >
              {item.date}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.text.primary }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, color: theme.palette.text.secondary }}
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

export default AnnouncementsWidget;