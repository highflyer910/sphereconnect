import React from 'react';
import {
  Home,
  Users,
  Folder,
  Headphones,
  UserCog,
  BookOpen,
  Settings,
} from 'lucide-react';
import { Box, Button, Stack, useTheme } from '@mui/material';

const navItems = [
  { label: 'Home', icon: <Home size={18} />, path: '#' },
  { label: 'Teams', icon: <Users size={18} />, path: '#' },
  { label: 'Documents', icon: <Folder size={18} />, path: '#' },
  { label: 'IT Support', icon: <Headphones size={18} />, path: '#' },
  { label: 'HR Portal', icon: <UserCog size={18} />, path: '#' },
  { label: 'Knowledge Base', icon: <BookOpen size={18} />, path: '#' },
  { label: 'Settings', icon: <Settings size={18} />, path: '#' },
];

const Navbar = () => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      role="navigation"
      aria-label="Main navigation"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: 3,
        py: 1,
      }}
    >
      <Stack direction="row" spacing={1} overflow="auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            href={item.path}
            startIcon={React.cloneElement(item.icon, { color: theme.palette.text.primary })} // Explicitly set icon color
            sx={{
              whiteSpace: 'nowrap',
              fontWeight: 500,
              borderRadius: '25px',
              textTransform: 'none',
              color: theme.palette.text.primary,
              px: 2,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.primary.main,
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;