import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AppRoutes } from './AppRoutes';
import { Header } from './components/Header';
import { HelpProvider } from './contexts/HelpContext';

// Game-specific brand colors
export const gameColors = {
  crossword: '#2196f3',
  sudoku: '#4caf50',
  birdle: '#ff9800'
} as const;

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelpProvider>
          <Header />
          <AppRoutes />
        </HelpProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
