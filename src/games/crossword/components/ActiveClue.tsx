import React from 'react';
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
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                mb: 2,
                height: '80px',
                width: '100%',
                backgroundColor: '#fff9e6',
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <IconButton onClick={onPreviousClue} size="small">
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

            <IconButton onClick={onDirectionToggle} size="small">
                <SwapHorizIcon />
            </IconButton>
            <IconButton onClick={onNextClue} size="small">
                <ArrowForwardIcon />
            </IconButton>
        </Box>
    );
}; 