import { Box, Container, Paper, useTheme, useMediaQuery } from '@mui/material';
import type { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
  maxGameWidth?: Breakpoint | false;
  fullHeight?: boolean;
}

export const GameLayout = ({ 
  children, 
  maxGameWidth = 'md',
  fullHeight = true 
}: GameLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: fullHeight ? '100vh' : 'auto',
        pt: { xs: 2, sm: 3 },
        pb: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: theme.palette.grey[100],
      }}
    >
      <Container
        maxWidth={maxGameWidth}
        disableGutters={isMobile}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            height: '100%',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}; 