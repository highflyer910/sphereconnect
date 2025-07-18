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
import { Box, Button, Stack, useTheme, IconButton, Tooltip } from '@mui/material';

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
        px: { xs: 2, sm: 3 },
        py: 1,
      }}
    >
      <Stack 
        direction="row" 
        spacing={{ xs: 0.5, sm: 1 }}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '20px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.background.paper})`,
            pointerEvents: 'none',
            zIndex: 1,
            display: { xs: 'block', md: 'none' },
          },
        }}
      >
        {navItems.map((item) => (
          <Tooltip key={item.label} title={item.label} arrow placement="bottom">
            <Button
              href={item.path}
              startIcon={React.cloneElement(item.icon, { 
                color: theme.palette.text.primary 
              })}
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 500,
                borderRadius: '25px',
                textTransform: 'none',
                color: theme.palette.text.primary,
                px: { xs: 1, sm: 2 },
                minWidth: { xs: 'auto', sm: 'auto' },
                flexShrink: 0,
                '& .MuiButton-startIcon': {
                  margin: { xs: 0, sm: '0 8px 0 0' },
                },
                '& .MuiButton-endIcon': {
                  margin: 0,
                },
                fontSize: { xs: 0, sm: '0.875rem' },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                }}
              >
                {item.label}
              </Box>
            </Button>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;