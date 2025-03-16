import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
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
    <BrowserRouter basename="/daily-games">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelpProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100dvh',
              position: 'fixed',
              width: '100%',
              overflow: 'hidden',
              WebkitOverflowScrolling: 'touch',
              bgcolor: 'background.default'
            }}
          >
            <Header />
            <Box
              component="main"
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <AppRoutes />
            </Box>
          </Box>
        </HelpProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
