import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Stack,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';

const team = [
  {
    name: 'Sarah Martinez',
    role: 'Senior UX Designer',
    department: 'Design Team',
    achievement:
      'Led the redesign of our mobile app, resulting in 40% increase in user engagement.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Alex Chen',
    role: 'DevOps Engineer',
    department: 'Infrastructure Team',
    achievement:
      'Reduced deployment time by 60% through CI/CD automation.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Product Manager',
    department: 'Product Team',
    achievement:
      'Launched 3 major features this quarter, exceeding adoption targets.',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
];

const TeamSpotlightWidget = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const theme = useTheme();

  const handleChange = (newIndex) => {
    if (isAnimating || newIndex === index) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);
  };

  const next = () => handleChange((index + 1) % team.length);
  const prev = () => handleChange((index - 1 + team.length) % team.length);

  const member = team[index];

  return (
    <Paper
      sx={{
        p: 2.5,
        maxWidth: 350,
        borderRadius: 3,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h6"
          fontWeight={500}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Users size={18} />
          Team Spotlight
        </Typography>

        <Box>
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.getContrastText(theme.palette.primary.main),
              },
              mr: 1,
            }}
          >
            <ChevronLeft size={16} />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.getContrastText(theme.palette.primary.main),
              },
            }}
          >
            <ChevronRight size={16} />
          </IconButton>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
          minHeight: 120,
        }}
      >
        <Avatar
          src={member.avatar}
          alt={member.name}
          sx={{
            width: 72,
            height: 72,
            border: `3px solid ${theme.palette.primary.main}`,
            transition: 'all 0.3s ease',
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="subtitle1" 
            fontWeight="bold"
            sx={{ mb: 0.5 }}
          >
            {member.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              color: theme.palette.primary.main, 
              mb: 0.5,
              fontWeight: 500,
            }}
          >
            {member.role}
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              color: theme.palette.text.secondary, 
              mb: 1,
              fontSize: '0.875rem',
            }}
          >
            {member.department}
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              color: theme.palette.text.secondary,
              lineHeight: 1.4,
              fontSize: '0.875rem',
              fontStyle: 'italic',
            }}
          >
            "{member.achievement}"
          </Typography>
        </Box>
      </Stack>

      {/* Simple dot indicators */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        {team.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: idx === index 
                ? theme.palette.primary.main 
                : theme.palette.text.disabled,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
            onClick={() => handleChange(idx)}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TeamSpotlightWidget;