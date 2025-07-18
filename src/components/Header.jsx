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

export default function Header({ onChatClick }) {
  const muiTheme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [notificationCount, setNotificationCount] = useState(3);
  const [chatCount, setChatCount] = useState(2);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setNotificationCount((prev) => Math.min(prev + 1, 9));
    }, 30000);
    return () => clearInterval(notificationInterval);
  }, []);

  useEffect(() => {
    const chatInterval = setInterval(() => {
      setChatCount((prev) => Math.min(prev + 1, 9));
    }, 45000);
    return () => clearInterval(chatInterval);
  }, []);

  // Handle Profile Menu
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
    setNotificationCount(0);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleChatClick = () => {
    setChatCount(0);
    if (onChatClick) {
      onChatClick();
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        px: { xs: 2, sm: 3 },
        top: 0,
        zIndex: 1100,
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 80, sm: 96 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              fontSize: { xs: '1.8rem', sm: '2rem' },
            }}
          >
            ◉◉ SphereConnect
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '2px',
              background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
              borderRadius: '1px',
              mb: 0.5,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            Where teams connect, grow, and flow
          </Typography>
        </Box>

        <Paper
          component="form"
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            width: { xs: '40%', sm: 250, md: 350 },
            px: 2,
            py: 0.5,
            backgroundColor: alpha(muiTheme.palette.background.paper, 0.8),
            border: `1px solid ${muiTheme.palette.divider}`,
            borderRadius: 4,
          }}
        >
          <Search size={18} style={{ marginRight: 8, color: muiTheme.palette.text.secondary }} />
          <InputBase
            placeholder="Search people, documents, resources..."
            fullWidth
            sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}
          />
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
          {/* Theme Toggle */}
          <IconButton
            aria-label="toggle theme"
            onClick={toggleTheme}
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            aria-label="notifications"
            onClick={handleNotifClick}
            sx={{ color: muiTheme.palette.text.primary }}
          >
            <Badge badgeContent={notificationCount > 9 ? '9+' : notificationCount} color="primary">
              <Bell size={20} />
            </Badge>
          </IconButton>

          {/* Notification Menu */}
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifClose}
            disableScrollLock={true}
            PaperProps={{
              sx: { borderRadius: 4, bgcolor: 'background.paper' },
            }}
          >
            <MenuItem
              onClick={handleNotifClose}
              sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}
            >
              Sarah replied to your design comment.
            </MenuItem>
            <MenuItem
              onClick={handleNotifClose}
              sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}
            >
              Team Standup starts in 15 minutes.
            </MenuItem>
            <MenuItem
              onClick={handleNotifClose}
              sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}
            >
              ⚙️ System Maintenance at 8 PM.
            </MenuItem>
          </Menu>

          {/* Chat */}
          <IconButton
            aria-label="Team chat"
            aria-controls="chat-widget-heading"
            onClick={handleChatClick}
            sx={{ color: muiTheme.palette.text.primary }}
          >
            <Badge badgeContent={chatCount > 9 ? '9+' : chatCount} color="primary">
              <MessageSquare size={20} />
            </Badge>
          </IconButton>

          {/* Profile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              ml: { xs: 1, sm: 2 },
              cursor: 'pointer',
            }}
            onClick={handleProfileClick}
          >
            <Avatar
              alt="Anita Hooper"
              src="https://i.pravatar.cc/60?img=26"
              sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: muiTheme.palette.text.primary,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Anita Hooper
            </Typography>
            <ChevronDown
              size={18}
              style={{ color: muiTheme.palette.text.primary }}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            />
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            disableScrollLock={true}
            PaperProps={{
              sx: { borderRadius: 4, bgcolor: 'background.paper' },
            }}
          >
            <MenuItem sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}>
              View Profile
            </MenuItem>
            <MenuItem sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}>
              Account Settings
            </MenuItem>
            <MenuItem sx={{ color: muiTheme.palette.text.primary, fontSize: '0.9rem' }}>
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}