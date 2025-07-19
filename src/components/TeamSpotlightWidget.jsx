import React, { useState, useCallback } from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Stack,
  Box,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';

const team = [
  {
    name: 'Sarah Martinez',
    role: 'Senior UX Designer',
    department: 'Design Team',
    achievement: 'Led the comprehensive redesign of our flagship mobile application, focusing on user-centric design principles and iterative feedback loops. This initiative resulted in a remarkable 40% increase in overall user engagement and a significant improvement in app store ratings, demonstrating a profound impact on our product"s market performance and user satisfaction.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Alex Chen',
    role: 'DevOps Engineer',
    department: 'Infrastructure Team',
    achievement: 'Spearheaded the implementation of advanced CI/CD pipelines and automated deployment strategies across all major projects. This critical infrastructure upgrade successfully reduced our average deployment time by an impressive 60%, drastically improving development velocity and operational efficiency, while also minimizing human error in the release process.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Product Manager',
    department: 'Product Team',
    achievement: 'Successfully launched three major product features this quarter, each exceeding its initial adoption targets by a substantial margin. Her strategic vision and meticulous execution were instrumental in driving these initiatives from concept to market, significantly contributing to the company"s growth and competitive edge in the industry.',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
];

const TeamSpotlightWidget = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  const handleChange = useCallback((newIndex) => {
    setIndex(newIndex);
  }, []);

  const next = () => handleChange((index + 1) % team.length);
  const prev = () => handleChange((index - 1 + team.length) % team.length);

  const member = team[index];

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
      aria-labelledby="spotlight-heading"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          id="spotlight-heading"
          variant="h6"
          component="h3"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}
        >
          <Users size={22} color={theme.palette.primary.main} />
          Team Spotlight
        </Typography>
        <Box>
          <IconButton onClick={prev} size="small" aria-label="Previous team member">
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton onClick={next} size="small" aria-label="Next team member">
            <ChevronRight size={18} />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', overflowY: 'auto' }}>
        <Stack
          key={index}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            width: '100%',
            animation: 'fadeIn 0.5s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
          role="tabpanel"
          id={`spotlight-panel-${index}`}
          aria-labelledby={`spotlight-tab-${index}`}
        >
          <Avatar
            src={member.avatar}
            alt={`Portrait of ${member.name}`}
            sx={{
              width: 80,
              height: 80,
              border: `3px solid ${theme.palette.primary.main}`,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              {member.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 500, mb: 1 }}>
              {member.role}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              “{member.achievement}”
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'center' }}
        role="tablist"
        aria-label="Team member selector"
      >
        {team.map((_, idx) => (
          <Box
            key={idx}
            role="tab"
            aria-selected={idx === index}
            aria-controls={`spotlight-panel-${idx}`}
            id={`spotlight-tab-${idx}`}
            tabIndex={0}
            onClick={() => handleChange(idx)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleChange(idx)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: idx === index ? 'primary.main' : 'text.disabled',
              mx: 0.5,
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default React.memo(TeamSpotlightWidget);