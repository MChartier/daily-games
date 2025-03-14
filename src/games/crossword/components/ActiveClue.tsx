import React, { useCallback, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { CrosswordClue } from '../types';

interface ActiveClueProps {
    clue: CrosswordClue;
    onDirectionToggle: () => void;
    onPreviousClue: () => void;
    onNextClue: () => void;
}

export const ActiveClue: React.FC<ActiveClueProps> = ({
    clue,
    onDirectionToggle,
    onPreviousClue,
    onNextClue,
}) => {
    const lastClickTime = useRef<number>(0);
    const DEBOUNCE_TIME = 100; // milliseconds

    const handleClick = useCallback((action: () => void) => {
        const now = Date.now();
        if (now - lastClickTime.current >= DEBOUNCE_TIME) {
            action();
            lastClickTime.current = now;
        }
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                height: '80px',
                width: '100%',
                backgroundColor: '#fff9e6',
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <IconButton 
                onClick={() => handleClick(onPreviousClue)}
                size="small"
                sx={{ touchAction: 'none' }}
            >
                <ArrowBackIcon />
            </IconButton>
            
            <Box sx={{ 
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="subtitle2" color="text.secondary" noWrap>
                    {clue.number} {clue.direction.charAt(0).toUpperCase() + clue.direction.slice(1)}
                </Typography>
                <Typography 
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.2,
                    }}
                >
                    {clue.clue}
                </Typography>
            </Box>

            <IconButton 
                onClick={() => handleClick(onDirectionToggle)}
                size="small"
                sx={{ touchAction: 'none' }}
            >
                <SwapHorizIcon />
            </IconButton>
            <IconButton 
                onClick={() => handleClick(onNextClue)}
                size="small"
                sx={{ touchAction: 'none' }}
            >
                <ArrowForwardIcon />
            </IconButton>
        </Box>
    );
}; 