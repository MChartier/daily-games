import { Box, Typography, IconButton, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { Help as HelpIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { ReactNode } from 'react';

interface GameHeaderProps {
  title: string;
  subtitle?: string;
  onReset?: () => void;
  onHelp?: () => void;
  extraControls?: ReactNode;
}

export const GameHeader = ({
  title,
  subtitle,
  onReset,
  onHelp,
  extraControls,
}: GameHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        mb: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            sx={{
              fontWeight: 600,
              color: theme.palette.grey[900],
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.grey[600],
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {extraControls}
          {onHelp && (
            <Tooltip title="Help">
              <IconButton
                onClick={onHelp}
                size={isMobile ? 'small' : 'medium'}
                sx={{ color: theme.palette.grey[700] }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          )}
          {onReset && (
            <Tooltip title="New Game">
              <IconButton
                onClick={onReset}
                size={isMobile ? 'small' : 'medium'}
                sx={{ color: theme.palette.grey[700] }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
}; 