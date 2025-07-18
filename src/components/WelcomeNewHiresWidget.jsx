import React from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Stack,
  Box,
  useTheme,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import { MessageSquare, UserPlus } from 'lucide-react';

const newHires = [
  { name: 'Eric R.', role: 'UX Researcher', avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Kevin D.', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Sofia G.', role: 'HR Specialist', avatar: 'https://i.pravatar.cc/150?img=21' },
];

const WelcomeNewHiresWidget = () => {
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
          component="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
          }}
        >
          <UserPlus size={22} color={theme.palette.primary.main} />
          New Hires
        </Typography>
        <Button size="small" variant="outlined" aria-label="View all new hires">
          View All
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto' }}>
        {newHires.map((person, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              transition: 'border-color 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
              },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar 
              src={person.avatar} 
              alt={`Portrait of ${person.name}`}
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

export default React.memo(WelcomeNewHiresWidget);