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
        px: { xs: 1, sm: 3 },
        top: 0,
        zIndex: 1100,
      }}
      elevation={0}
    >
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            py: 1.5,
            px: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              fontSize: '1.5rem',
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
              my: 0.5,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              fontSize: '0.75rem',
            }}
          >
            Where teams connect, grow, and flow
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
            pb: 1.5,
            gap: 1,
          }}
        >
          {/* search box */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              maxWidth: '200px',
              px: 1,
              py: 0.25,
              backgroundColor: alpha(muiTheme.palette.background.paper, 0.8),
              border: `1px solid ${muiTheme.palette.divider}`,
              borderRadius: 3,
            }}
          >
            <Search size={16} style={{ marginRight: 4, color: muiTheme.palette.text.secondary }} />
            <InputBase
              placeholder="Search..."
              fullWidth
              sx={{ 
                color: muiTheme.palette.text.primary, 
                fontSize: '0.8rem',
                '& input': {
                  padding: '2px 0',
                }
              }}
            />
          </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* theme toggle */}
            <IconButton
              size="small"
              aria-label="toggle theme"
              onClick={toggleTheme}
              sx={{ color: muiTheme.palette.text.primary }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            {/* notifications */}
            <IconButton
              size="small"
              aria-label="notifications"
              onClick={handleNotifClick}
              sx={{ color: muiTheme.palette.text.primary }}
            >
              <Badge badgeContent={notificationCount > 9 ? '9+' : notificationCount} color="primary">
                <Bell size={18} />
              </Badge>
            </IconButton>

            {/* chat */}
            <IconButton
              size="small"
              aria-label="Team chat"
              onClick={handleChatClick}
              sx={{ color: muiTheme.palette.text.primary }}
            >
              <Badge badgeContent={chatCount > 9 ? '9+' : chatCount} color="primary">
                <MessageSquare size={18} />
              </Badge>
            </IconButton>

            {/* user */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                ml: 0.5,
              }}
              onClick={handleProfileClick}
            >
              <Avatar
                alt="Anita Hooper"
                src="https://i.pravatar.cc/60?img=26"
                sx={{ width: 26, height: 26 }}
              />
              <ChevronDown size={14} style={{ color: muiTheme.palette.text.primary }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* large screen*/}
      <Toolbar
        sx={{
          display: { xs: 'none', md: 'flex' },
          minHeight: 96,
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              fontSize: '2rem',
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
              fontSize: '0.875rem',
            }}
          >
            Where teams connect, grow, and flow
          </Typography>
        </Box>

        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { md: 300, lg: 350 },
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* theme toggle */}
          <IconButton
            aria-label="toggle theme"
            onClick={toggleTheme}
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          {/* notifications */}
          <IconButton
            aria-label="notifications"
            onClick={handleNotifClick}
            sx={{ color: muiTheme.palette.text.primary }}
          >
            <Badge badgeContent={notificationCount > 9 ? '9+' : notificationCount} color="primary">
              <Bell size={20} />
            </Badge>
          </IconButton>

          {/* chat */}
          <IconButton
            aria-label="Team chat"
            onClick={handleChatClick}
            sx={{ color: muiTheme.palette.text.primary }}
          >
            <Badge badgeContent={chatCount > 9 ? '9+' : chatCount} color="primary">
              <MessageSquare size={20} />
            </Badge>
          </IconButton>

          {/* user */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 2,
              cursor: 'pointer',
            }}
            onClick={handleProfileClick}
          >
            <Avatar
              alt="Anita Hooper"
              src="https://i.pravatar.cc/60?img=26"
              sx={{ width: 32, height: 32 }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: muiTheme.palette.text.primary,
                fontSize: '0.875rem',
              }}
            >
              Anita Hooper
            </Typography>
            <ChevronDown size={18} style={{ color: muiTheme.palette.text.primary }} />
          </Box>
        </Box>
      </Toolbar>

      {/* notifications */}
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

      {/* user */}
            <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        disableScrollLock={true}
        PaperProps={{
          sx: { 
            borderRadius: 4, 
            bgcolor: 'background.paper',
            minWidth: 220,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        }}
      >
        {/* user info*/}
        <Box
          sx={{
            px: 2,
            py: 2,
            borderBottom: `1px solid ${muiTheme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: muiTheme.palette.text.primary,
                fontSize: '0.95rem',
                lineHeight: 1.4,
              }}
            >
              Anita
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: muiTheme.palette.text.secondary,
                fontSize: '0.8rem',
                lineHeight: 1.2,
              }}
            >
              Software Engineer
            </Typography>
          </Box>
        </Box>

        <MenuItem 
          onClick={handleProfileClose}
          sx={{ 
            color: muiTheme.palette.text.primary, 
            fontSize: '0.9rem',
            py: 1,
            '&:hover': {
              bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
            }
          }}
        >
          View Profile
        </MenuItem>
        <MenuItem 
          onClick={handleProfileClose}
          sx={{ 
            color: muiTheme.palette.text.primary, 
            fontSize: '0.9rem',
            py: 1,
            '&:hover': {
              bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
            }
          }}
        >
          Account Settings
        </MenuItem>
        <MenuItem 
          onClick={handleProfileClose}
          sx={{ 
            color: muiTheme.palette.text.primary, 
            fontSize: '0.9rem',
            py: 1,
            '&:hover': {
              bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
            }
          }}
        >
          Log Out
        </MenuItem>
      </Menu>

    </AppBar>
  );
}