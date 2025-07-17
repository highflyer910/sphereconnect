import React from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Stack,
  Box,
  useTheme,
  IconButton,
  Button
} from '@mui/material';
import { MessageSquare, UserPlus } from 'lucide-react';

const newHires = [
  { name: 'Eric R.', role: 'UX Researcher', avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Kevin D.', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Sofia G.', role: 'HR Specialist', avatar: 'https://i.pravatar.cc/150?img=21' }
];

const WelcomeNewHiresWidget = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: theme.palette.background.paper,
        width: '100%',
        maxWidth: 350,
        mx: { xs: 'auto', md: 0 },
        mt: 4,
      }}
      aria-labelledby="new-hires-heading"
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
          id="new-hires-heading"
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary,
          }}
        >
          <UserPlus size={20} /> New Hires
        </Typography>
        <Button size="small" variant="outlined">
          View All
        </Button>
      </Box>

      <Stack spacing={2}>
        {newHires.map((person, index) => (
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
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar 
              src={person.avatar} 
              alt={person.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {person.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {person.role}
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: theme.palette.primary.dark,
                }
              }}
              aria-label={`Chat with ${person.name}`}
            >
              <MessageSquare size={18} />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default WelcomeNewHiresWidget;