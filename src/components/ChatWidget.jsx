import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Fade,
  Avatar,
  IconButton,
} from '@mui/material';
import { MessageSquare, Send, Circle, Moon, Sun } from 'lucide-react';

export default function ChatWidget() {
  const theme = useTheme();
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
    return [
      { id: 1, sender: 'Sarah M.', text: 'Good morning team! Ready for today\'s sprint?', timestamp: new Date(Date.now() - 300000) },
      { id: 2, sender: 'Alex C.', text: 'Morning! Yes, looking forward to the new features', timestamp: new Date(Date.now() - 240000) },
      { id: 3, sender: 'Maria R.', text: 'The design mockups are ready for review', timestamp: new Date(Date.now() - 180000) },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [onlineUsers] = useState(['You', 'Sarah M.', 'Alex C.', 'Maria R.']);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    setTimeout(simulateTeamResponse, 1000 + Math.random() * 3000);
  };

  const simulateTeamResponse = () => {
    const responses = [
      'Got it!',
      'Will do.',
      'Thanks for the update.',
      'Looking good!',
      'I\'ll check that',
      'Perfect timing!',
      'Sounds great!',
      'Let me review this.',
    ];
    const randomUser = onlineUsers.filter((u) => u !== 'You')[Math.floor(Math.random() * (onlineUsers.length - 1))];
    const message = {
      id: Date.now(),
      sender: randomUser || 'Someone',
      text: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        simulateTeamResponse();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [onlineUsers]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.mode === 'dark' ? '#66bb6a' : '#b19777',
      theme.palette.mode === 'dark' ? '#9ccc65' : '#756652',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 0,
        borderRadius: 4,
        bgcolor: theme.palette.primary.paper,
        width: '100%',
        maxWidth: { xs: '100%', md: 350 },
        mx: { xs: 'auto', md: 0 },
        mt: { xs: 2, md: 2 },
        minHeight: 400,
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      aria-labelledby="chat-widget-heading"
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: 2.5, 
          bgcolor: theme.palette.primary.paper,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            id="chat-widget-heading"
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: 'text.primary',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            <MessageSquare size={22} color={theme.primary} />
            Team Chat
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Circle 
              size={10} 
              color={theme.palette.primary.main} 
              fill={theme.palette.primary.main} 
            />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {onlineUsers.length} online
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'background.default',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f0ebe4',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#66bb6a' : '#b19777',
            borderRadius: '10px',
            border: `2px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#f0ebe4'}`,
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#9ccc65' : '#756652',
            },
          },
        }}
        aria-live="polite"
      >
        {messages.map((msg) => (
          <Fade in key={msg.id} timeout={300}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: msg.sender === 'You' ? theme.palette.primary.main : getAvatarColor(msg.sender),
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {getInitials(msg.sender)}
              </Avatar>
              <Box
                sx={{
                  bgcolor: msg.sender === 'You' 
                    ? theme.palette.primary.main 
                    : 'background.paper',
                  color: msg.sender === 'You' 
                    ? '#fff'
                    : 'text.primary',
                  borderRadius: 4,
                  p: 1.5,
                  maxWidth: '85%',
                  position: 'relative',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                  '&::before': msg.sender === 'You' ? {
                    content: '""',
                    position: 'absolute',
                    top: 12,
                    right: -7,
                    width: 0,
                    height: 0,
                    borderLeft: `7px solid ${theme.palette.primary.main}`,
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                  } : {
                    content: '""',
                    position: 'absolute',
                    top: 12,
                    left: -7,
                    width: 0,
                    height: 0,
                    borderRight: `7px solid ${theme.palette.background.paper}`,
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                  },
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 0.5,
                    color: msg.sender === 'You' ? '#fff' : 'text.primary',
                  }}
                >
                  {msg.sender}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1,
                    lineHeight: 1.5,
                    color: msg.sender === 'You' ? '#fff' : 'text.primary',
                  }}
                >
                  {msg.text}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    textAlign: 'right',
                    color: msg.sender === 'You' ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
                    fontSize: '0.7rem',
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          </Fade>
        ))}
      </Box>

      {/* Input Area */}
      <Box 
        sx={{ 
          p: 2.5, 
          bgcolor: 'theme.palette.primary.paper',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 3,
                bgcolor: 'background.default',
                fontSize: '0.9rem',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: '2px',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
            }}
            aria-label="Chat message input"
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={!inputValue.trim()}
            sx={{ 
              borderRadius: 3, 
              minWidth: 80,
              px: 2.5,
              py: 1,
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.secondary.main,
              },
              '&:disabled': {
                bgcolor: theme.palette.action.disabledBackground,
                color: theme.palette.action.disabled,
              },
              textTransform: 'none',
              fontWeight: 600,
            }}
            startIcon={<Send size={16} />}
            aria-label="Send message"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}