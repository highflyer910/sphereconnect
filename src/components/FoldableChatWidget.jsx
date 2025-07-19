import React, { useState, forwardRef } from 'react';
import {
  Box,
  Fab,
  Fade,
  Slide,
  useTheme,
  IconButton,
} from '@mui/material';
import { MessageSquare, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const FoldableChatWidget = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleChat = () => setIsOpen(!isOpen);

  const getButtonColors = () => ({
    bgcolor: theme.palette.primary.main,
    color: theme.palette.mode === 'light' ? '#FFFFFF' : theme.palette.text.primary,
    '&:hover': {
      bgcolor: theme.palette.primary.dark,
    },
  });

  return (
    <Box
      ref={ref}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1200,
      }}
    >
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90vw', sm: 350 },
            height: { xs: '70vh', sm: 450 },
            boxShadow: theme.shadows[10],
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? 'rgba(177, 151, 119, 0.2)'
                : 'rgba(102, 187, 106, 0.2)'
            }`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <IconButton
            onClick={toggleChat}
            aria-label="Close chat"
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              zIndex: 1300,
              width: 20,
              height: 20,
              bgcolor: 'transparent',
              color: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.6)'
                : 'rgba(255, 255, 255, 0.7)',
              border: theme.palette.mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.2)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              padding: 0,
              '&:hover': {
                transform: 'scale(1.1)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <X size={12} strokeWidth={1.5} />
          </IconButton>

          <ChatWidget />
        </Box>
      </Slide>

      <Fade in={!isOpen} timeout={300}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          <Fab
            color="primary"
            aria-label="Open chat"
            onClick={toggleChat}
            sx={{
              ...getButtonColors(),
              boxShadow: theme.palette.mode === 'light'
                ? '0 4px 12px rgba(177, 151, 119, 0.3)'
                : '0 4px 12px rgba(102, 187, 106, 0.3)',
              border: `2px solid ${
                theme.palette.mode === 'light'
                  ? 'rgba(177, 151, 119, 0.1)'
                  : 'rgba(102, 187, 106, 0.1)'
              }`,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            <MessageSquare
              size={24}
              style={{
                color: theme.palette.mode === 'light'
                  ? '#FFFFFF'
                  : theme.palette.text.primary,
              }}
            />
          </Fab>
        </Box>
      </Fade>
    </Box>
  );
});

export default FoldableChatWidget;
