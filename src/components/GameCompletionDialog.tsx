import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  IconButton,
} from '@mui/material';
import { Share as ShareIcon, Close as CloseIcon } from '@mui/icons-material';
import { ReactNode } from 'react';

interface GameCompletionDialogProps {
  open: boolean;
  onClose: () => void;
  onShare?: () => void;
  onPlayAgain: () => void;
  title: string;
  subtitle?: string;
  stats?: ReactNode;
  children?: ReactNode;
}

export const GameCompletionDialog = ({
  open,
  onClose,
  onShare,
  onPlayAgain,
  title,
  subtitle,
  stats,
  children,
}: GameCompletionDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle1"
              sx={{ color: theme.palette.grey[600], mt: 0.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
        {stats && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: children ? 3 : 0,
              p: 2,
              bgcolor: theme.palette.grey[100],
              borderRadius: 2,
            }}
          >
            {stats}
          </Box>
        )}
        {children}
      </DialogContent>

      <DialogActions sx={{ p: { xs: 1, sm: 2 }, gap: 1 }}>
        {onShare && (
          <Button
            startIcon={<ShareIcon />}
            onClick={onShare}
            variant="outlined"
            color="primary"
          >
            Share
          </Button>
        )}
        <Button
          onClick={onPlayAgain}
          variant="contained"
          color="primary"
          sx={{ minWidth: 120 }}
        >
          Play Again
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 