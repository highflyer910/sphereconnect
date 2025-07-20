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
  { name: 'Ewan M.', role: 'UX Researcher', avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Dougal D.', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Elena G.', role: 'HR Specialist', avatar: 'https://i.pravatar.cc/150?img=21' },
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
                '& .avatar': {
                  transform: 'scale(1.05)',
                  filter: 'brightness(1.1)',
                },
                '& .name': {
                  color: theme.palette.primary.main,
                },
                '& .chat-icon': {
                  transform: 'scale(1.1) rotate(5deg)',
                  bgcolor: `${theme.palette.primary.main}10`,
                },
              },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              src={person.avatar}
              alt={`Portrait of ${person.name}`}
              className="avatar"
              sx={{ 
                width: 40, 
                height: 40,
                transition: 'all 0.3s ease',
                zIndex: 2,
                position: 'relative',
              }}
            />
            <Box sx={{ flex: 1, zIndex: 2, position: 'relative' }}>
              <Typography 
                variant="subtitle1" 
                className="name"
                sx={{ 
                  fontWeight: 600,
                  transition: 'color 0.3s ease',
                }}
              >
                {person.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  transition: 'color 0.3s ease',
                }}
              >
                {person.role}
              </Typography>
            </Box>
            <IconButton
              size="small"
              className="chat-icon"
              sx={{
                color: theme.palette.primary.main,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 2,
                position: 'relative',
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}15`,
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