import { createTheme } from '@mui/material/styles';

const commonSettings = {
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          '--scrollbar-track': theme.palette.mode === 'light' ? '#f0ebe4' : '#1e293b',
          '--scrollbar-thumb': theme.palette.mode === 'light' ? '#b19777' : '#66bb6a',
          '--scrollbar-thumb-hover': theme.palette.mode === 'light' ? '#756652' : '#9ccc65',
        },
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.mode === 'light' ? '#f0ebe4' : '#1e293b',
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.mode === 'light' ? '#b19777' : '#66bb6a',
          borderRadius: '10px',
          border: `2px solid ${theme.palette.mode === 'light' ? '#f0ebe4' : '#1e293b'}`,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? '#756652' : '#9ccc65',
          },
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.mode === 'light' ? '#b19777' : '#66bb6a'} ${theme.palette.mode === 'light' ? '#f0ebe4' : '#1e293b'}`,
        },
      }),
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f9f6f2',
      paper: '#f0ebe4',
    },
    primary: {
      main: '#b19777',
    },
    secondary: {
      main: '#756652',
    },
    text: {
      primary: '#2e2e2e',
      secondary: '#4d4d4d',
    },
  },
  ...commonSettings,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    primary: {
      main: '#66bb6a',
    },
    secondary: {
      main: '#9ccc65',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
  ...commonSettings,
});

export { lightTheme, darkTheme };