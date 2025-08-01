import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { inject } from "@vercel/analytics"
import App from './App.jsx';
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';

inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <CssBaseline />
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
