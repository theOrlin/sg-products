import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { orange, blueGrey } from '@mui/material/colors';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: orange[600],
      contrastText: 'white',
    },
    secondary: {
      main: blueGrey[600],
      contrastText: 'white',
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
