import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { AppRoutes } from './AppRoutes';
import { Header } from './components/Header';
import { HelpProvider } from './contexts/HelpContext';
import { RotateDeviceMessage } from './components/RotateDeviceMessage';
import { useLocation } from 'react-router-dom';

// Extend ScreenOrientation interface
declare global {
  interface ScreenOrientation {
    lock(orientation: 'portrait' | 'landscape' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'): Promise<void>;
    unlock(): void;
  }
}

// Game-specific brand colors
export const gameColors = {
  crossword: '#2196f3',
  sudoku: '#4caf50',
  birdle: '#ff9800'
} as const;

const AppContent: React.FC = () => {
  const location = useLocation();
  const isGameRoute = ['crossword', 'sudoku', 'birdle'].some(game => 
    location.pathname.includes(game)
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        ...(isGameRoute && {
          position: 'fixed',
          width: '100%',
          overflow: 'hidden',
        }),
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
          overflow: isGameRoute ? 'hidden' : 'auto'
        }}
      >
        <AppRoutes />
      </Box>
      <RotateDeviceMessage />
    </Box>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename="/daily-games">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelpProvider>
          <AppContent />
        </HelpProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
