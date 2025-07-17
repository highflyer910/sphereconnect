import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Box,
  useTheme,
  alpha,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
} from 'lucide-react';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const Header = () => {
  const muiTheme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();

  const [unreadMessages, setUnreadMessages] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnreadMessages((prev) => Math.min(prev + 1, 9));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${muiTheme.palette.divider}`, px: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: muiTheme.palette.text.primary }}>
            ◉◉ SphereConnect
          </Typography>
          <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary, fontStyle: 'italic' }}>
            Where teams connect, grow, and flow
          </Typography>
        </Box>

        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: 200, sm: 300, md: 400 },
            px: 2,
            py: 0.5,
            backgroundColor: alpha(muiTheme.palette.background.paper, 0.8),
            border: `1px solid ${muiTheme.palette.divider}`,
          }}
        >
          <Search size={18} style={{ marginRight: 8, color: muiTheme.palette.text.secondary }} />
          <InputBase placeholder="Search people, documents, resources..." fullWidth sx={{ color: muiTheme.palette.text.primary }} />
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton aria-label="toggle theme" onClick={toggleTheme} sx={{ color: muiTheme.palette.text.primary }}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          <IconButton aria-label="notifications" onClick={handleNotifClick} sx={{ color: muiTheme.palette.text.primary }}>
            <Badge badgeContent={3} color="primary">
              <Bell size={20} />
            </Badge>
          </IconButton>

          <Menu anchorEl={notifAnchorEl} open={Boolean(notifAnchorEl)} onClose={handleNotifClose}>
            <MenuItem sx={{ color: muiTheme.palette.text.primary }}>Sarah replied to your design comment.</MenuItem>
            <MenuItem sx={{ color: muiTheme.palette.text.primary }}>Team Standup starts in 15 minutes.</MenuItem>
            <MenuItem sx={{ color: muiTheme.palette.text.primary }}>⚙️ System Maintenance at 8 PM.</MenuItem>
          </Menu>

          <IconButton aria-label="Team chat" sx={{ color: muiTheme.palette.text.primary }}>
            <Badge badgeContent={unreadMessages > 9 ? '9+' : unreadMessages} color="primary">
              <MessageSquare size={20} />
            </Badge>
          </IconButton>

          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, cursor: 'pointer' }}
            onClick={handleProfileClick}
          >
            <Avatar alt="Anita Hooper" src="https://i.pravatar.cc/60?img=26" sx={{ width: 32, height: 32 }} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: muiTheme.palette.text.primary }}>
              Anita Hooper
            </Typography>
            <ChevronDown size={18} sx={{ color: muiTheme.palette.text.primary }} />
          </Box>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
            <MenuItem sx={{ color: muiTheme.palette.text.primary }}>View Profile</MenuItem>
            <MenuItem sx={{ color: muiTheme.palette.text.primary }}>Account Settings</MenuItem>
            <MenuItem sx={{ color: muiTheme.palette.text.primary }}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


