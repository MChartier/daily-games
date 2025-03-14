import React from 'react';
import { Box, Typography, useTheme, keyframes } from '@mui/material';
import { Letter } from '../types';

interface GameTileProps {
    letter: Letter;
    isActive: boolean;
}

const bounce = keyframes`
    0%, 20% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    50% {
        transform: translateY(5px);
    }
    60% {
        transform: translateY(-15px);
    }
    80% {
        transform: translateY(2px);
    }
    100% {
        transform: translateY(0);
    }
`;

const sparkle = keyframes`
    0% {
        background-position: 50% 50%;
        opacity: 0;
    }
    60% {
        opacity: 1;
    }
    100% {
        background-position: 150% 150%;
        opacity: 0;
    }
`;

const getTileColor = (state: Letter['state'], isActive: boolean) => {
    if (isActive) return 'background.paper';
    
    switch (state) {
        case 'correct':
            return '#50B83C'; // Green
        case 'present':
            return '#FFB020'; // Yellow
        case 'absent':
            return '#6B7280'; // Gray
        default:
            return 'background.paper';
    }
};

const getBorderColor = (state: Letter['state'], isActive: boolean) => {
    if (isActive) return 'primary.main';
    if (state === 'empty') return 'divider';
    return 'transparent';
};

export const GameTile: React.FC<GameTileProps> = ({ letter, isActive }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: getTileColor(letter.state, isActive),
                border: 2,
                borderColor: getBorderColor(letter.state, isActive),
                borderRadius: 1,
                transition: 'all 0.2s ease-in-out',
                animation: letter.state === 'correct' ? 
                    `${bounce} 1s ease-in-out` : undefined,
                '&:hover': isActive ? {
                    borderColor: 'primary.dark',
                } : undefined,
                '&::after': letter.state === 'correct' ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 60%)',
                    backgroundSize: '200% 200%',
                    animation: `${sparkle} 1s ease-in-out`,
                    pointerEvents: 'none',
                } : undefined,
            }}
        >
            <Typography
                variant="inherit"
                component="span"
                sx={{
                    fontWeight: 700,
                    color: letter.state === 'empty' ? 'text.primary' : 'white',
                    textTransform: 'uppercase',
                    fontSize: 'clamp(1rem, 4vw, 1.75rem)',
                }}
            >
                {letter.value}
            </Typography>
        </Box>
    );
}; 