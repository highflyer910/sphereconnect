import React, { useState, forwardRef } from 'react';
import {
  Box,
  Fab,
  Fade,
  Slide,
  useTheme,
} from '@mui/material';
import { MessageSquare, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const FoldableChatWidget = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

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
      <Fade in={isOpen} timeout={300}>
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              width: { xs: '90vw', sm: 350 },
              height: { xs: '70vh', sm: 450 },
              mb: 2,
              boxShadow: theme.shadows[10],
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <ChatWidget />
          </Box>
        </Slide>
      </Fade>

      <Fab
        color="primary"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={toggleChat}
        sx={{
          bgcolor: isOpen ? theme.palette.secondary.main : theme.palette.primary.main,
          '&:hover': {
            bgcolor: isOpen ? theme.palette.secondary.dark : theme.palette.primary.dark,
          },
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Fab>
    </Box>
  );
});

export default FoldableChatWidget;