import React, { useEffect, useState, useCallback } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Fade,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { MessageSquare, Send, Circle, Bot } from 'lucide-react';

export default function ChatWidget({ setIsChatOpen }) {
  const theme = useTheme();
  const [mode, setMode] = useState('team');
  const [teamMessages, setTeamMessages] = useState(() => {
    const saved = localStorage.getItem('teamChatMessages');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
    return [
      { id: 1, sender: 'Francesca M.', text: 'Good morning team! Ready for today\'s sprint?', timestamp: new Date(Date.now() - 300000) },
      { id: 2, sender: 'Matteo C.', text: 'Morning! Yes, looking forward to the new features', timestamp: new Date(Date.now() - 240000) },
      { id: 3, sender: 'Isla R.', text: 'The design mockups are ready for review', timestamp: new Date(Date.now() - 180000) },
    ];
  });
  const [assistantMessages, setAssistantMessages] = useState(() => {
    const saved = localStorage.getItem('assistantChatMessages');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
    return [
      { id: 0, sender: 'AI Assistant', text: 'Hi, I\'m your Assistant! Ask me about passwords, holidays, or IT support.', timestamp: new Date() },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [onlineUsers] = useState(['You', 'Sarah M.', 'Alex C.', 'Maria R.']);
  const [unseenMessages, setUnseenMessages] = useState(0);

  // data for assistant
  const faqResponses = [
    { keywords: ['reset password', 'password'], response: 'To reset your password, visit the IT Support section and follow the "Reset Password" guide.' },
    { keywords: ['holiday', 'vacation'], response: 'Check the HR Portal for the company holiday schedule.' },
    { keywords: ['leave request', 'time off'], response: 'Submit a leave request via the HR Portal under "Request Leave".' },
    { keywords: ['onboarding', 'new hire'], response: 'New hires can find onboarding guides in the Knowledge Base.' },
    { keywords: ['it support', 'tech issue'], response: 'Submit an IT ticket in the IT Support section or chat with the IT team.' },
    { keywords: ['training', 'course'], response: 'Explore training materials in the Resources section.' },
    { default: true, response: 'Sorry, I didn\'t catch that! Try asking about passwords, holidays, or IT support.' },
  ];

  const simulateTeamResponse = useCallback(() => {
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
    setTeamMessages((prev) => [...prev, message]);
    
    if (setIsChatOpen === false) {
      setUnseenMessages((prev) => prev + 1);
    }
  }, [onlineUsers, setIsChatOpen]);

  useEffect(() => {
    localStorage.setItem('teamChatMessages', JSON.stringify(teamMessages));
  }, [teamMessages]);

  useEffect(() => {
    localStorage.setItem('assistantChatMessages', JSON.stringify(assistantMessages));
  }, [assistantMessages]);

  useEffect(() => {
    if (setIsChatOpen !== false) {
      setUnseenMessages(0);
    }
  }, [setIsChatOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1 && mode === 'team') {
        simulateTeamResponse();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [mode, simulateTeamResponse]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    if (mode === 'team') {
      setTeamMessages((prev) => [...prev, newMessage]);
      setTimeout(simulateTeamResponse, 1000 + Math.random() * 3000);
    } else {
      const inputLower = inputValue.toLowerCase().trim();
      const faq = faqResponses.find((item) => 
        item.default || item.keywords.some((keyword) => inputLower.includes(keyword))
      );
      const botMessage = {
        id: Date.now() + 1,
        sender: 'AI Assistant',
        text: faq.response,
        timestamp: new Date(),
      };
      setAssistantMessages((prev) => [...prev, newMessage, botMessage]);
    }

    setInputValue('');
    setUnseenMessages(0);
  };

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

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
      if (newMode === 'assistant' && assistantMessages.length === 0) {
        setAssistantMessages([
          {
            id: 0,
            sender: 'AI Assistant',
            text: 'Hi, I\'m your Assistant! Ask me about passwords, holidays, or IT support.',
            timestamp: new Date(),
          },
        ]);
      }
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 0,
        borderRadius: 4,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      aria-labelledby="chat-widget-heading"
    >
      <Box 
        sx={{ 
          p: { xs: 1.5, sm: 2.5 }, 
          bgcolor: 'background.paper',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          flexShrink: 0, 
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
              fontSize: { xs: '1rem', sm: '1.1rem' }, 
            }}
          >
            {mode === 'team' ? (
              <>
                <MessageSquare size={22} color={theme.palette.primary.main} />
                Team Chat
              </>
            ) : (
              <>
                <Bot size={22} color={theme.palette.primary.main} />
                AI Assistant
              </>
            )}
          </Typography>
          {mode === 'team' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Circle 
                size={10} 
                color={theme.palette.primary.main} 
                fill={theme.palette.primary.main} 
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                {onlineUsers.length} online
                {unseenMessages > 0 && (
                  <span style={{ 
                    marginLeft: 8, 
                    background: theme.palette.error.main, 
                    color: 'white', 
                    borderRadius: '50%', 
                    padding: '2px 6px', 
                    fontSize: '0.7rem' 
                  }}>
                    {unseenMessages}
                  </span>
                )}
              </Typography>
            </Box>
          )}
        </Box>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          fullWidth
          sx={{ 
            mt: 1,
            '& .MuiToggleButton-root': {
              py: { xs: 0.25, sm: 0.5 },
              px: 1,
              fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
              textTransform: 'none',
              border: '1px solid',
              borderColor: 'divider',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }
            }
          }}
        >
          <ToggleButton value="team" sx={{ textTransform: 'none', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
            Team Chat
          </ToggleButton>
          <ToggleButton value="assistant" sx={{ textTransform: 'none', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
            AI Assistant
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          flex: '1 1 0',
          minHeight: 0, 
          overflowY: 'auto',
          p: { xs: 1, sm: 2 }, 
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.5, sm: 2 }, 
          bgcolor: 'background.default',
          '&::-webkit-scrollbar': {
            width: '8px',
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
        {(mode === 'team' ? teamMessages : assistantMessages).map((msg) => (
          <Fade in key={msg.id} timeout={300}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: { xs: 1, sm: 1.5 },
                flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 32, sm: 36 }, 
                  height: { xs: 32, sm: 36 },
                  bgcolor: msg.sender === 'You' || msg.sender === 'AI Assistant' 
                    ? theme.palette.primary.main 
                    : getAvatarColor(msg.sender),
                  fontSize: { xs: '0.7rem', sm: '0.8rem' }, 
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {msg.sender === 'AI Assistant' ? <Bot size={16} /> : getInitials(msg.sender)}
              </Avatar>
              <Box
                sx={{
                  bgcolor: msg.sender === 'You' || msg.sender === 'AI Assistant' 
                    ? theme.palette.primary.main 
                    : 'background.paper',
                  color: msg.sender === 'You' || msg.sender === 'AI Assistant' 
                    ? '#fff'
                    : 'text.primary',
                  borderRadius: { xs: 3, sm: 4 },
                  p: { xs: 1, sm: 1.5 }, 
                  maxWidth: '85%',
                  position: 'relative',
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                  '&::before': msg.sender === 'You' || msg.sender === 'AI Assistant' ? {
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
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                    color: msg.sender === 'You' || msg.sender === 'AI Assistant' ? '#fff' : 'text.primary',
                  }}
                >
                  {msg.sender}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1,
                    lineHeight: 1.5,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                    color: msg.sender === 'You' || msg.sender === 'AI Assistant' ? '#fff' : 'text.primary',
                  }}
                >
                  {msg.text}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    textAlign: 'right',
                    color: msg.sender === 'You' || msg.sender === 'AI Assistant' ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          </Fade>
        ))}
      </Box>

      <Box 
        sx={{ 
          p: { xs: 1.5, sm: 2.5 },
          bgcolor: 'background.paper',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          flexShrink: 0,
          minHeight: { xs: 70, sm: 80 }, 
        }}
      >
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 } }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder={mode === 'team' ? 'Type a message...' : 'Ask Your Assistant...'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 3,
                bgcolor: 'background.default',
                fontSize: { xs: '0.8rem', sm: '0.9rem' }, 
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.1)',
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
                py: { xs: 0.75, sm: 1 }, 
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
            }}
            aria-label={mode === 'team' ? 'Chat message input' : 'Your Assistant query input'}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={!inputValue.trim()}
            sx={{ 
              borderRadius: 3, 
              minWidth: { xs: 60, sm: 80 }, 
              px: { xs: 1.5, sm: 2.5 }, 
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
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
            startIcon={<Send size={14} />}
            aria-label="Send message"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}