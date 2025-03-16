import React from 'react';
import { Box, Typography } from '@mui/material';
import { ScreenRotation } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

export const RotateDeviceMessage: React.FC = () => {
    const location = useLocation();
    const isGameRoute = ['crossword', 'sudoku', 'birdle'].some(game => 
        location.pathname.includes(game)
    );

    if (!isGameRoute) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'background.paper',
                zIndex: 9999,
                display: 'none',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                p: 3,
                '@media (orientation: landscape) and (max-width: 900px)': {
                    display: 'flex'
                }
            }}
        >
            <ScreenRotation sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" align="center">
                Please rotate your device to portrait mode
            </Typography>
            <Typography align="center" color="text.secondary">
                This game is designed to be played in portrait orientation
            </Typography>
        </Box>
    );
}; 