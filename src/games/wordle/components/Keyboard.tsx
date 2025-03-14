import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { KeyboardReturn as EnterIcon, Backspace as BackspaceIcon } from '@mui/icons-material';
import { LetterState } from '../types';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    letterStates: Record<string, LetterState>;
    variant?: 'crossword' | 'wordle';
}

const KEYBOARD_LAYOUT = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const getKeyColor = (state: LetterState | undefined) => {
    if (!state) return 'background.paper';
    
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

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStates, variant = 'wordle' }) => {
    const isWordle = variant === 'wordle';

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: {
                xs: 0.5,
                sm: 1
            },
            width: '100%',
            maxWidth: {
                xs: '100%',
                sm: '800px',  // Match Crossword's wider layout
            },
            mx: 'auto',
        }}>
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <Grid 
                    container 
                    key={rowIndex} 
                    spacing={1}
                    justifyContent="center"
                    wrap="nowrap"
                >
                    {row.map((key, keyIndex) => {
                        const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE';
                        const keyColor = isWordle ? getKeyColor(letterStates[key]) : 'background.paper';
                        const isColored = isWordle && letterStates[key];

                        return (
                            <Grid 
                                item 
                                key={keyIndex}
                                xs="auto"
                                sx={{
                                    flexGrow: isSpecialKey ? {
                                        xs: 1.25,
                                        sm: 1.5,
                                    } : 1,
                                    minWidth: 0,
                                    flex: 1,  // Add flex: 1 to make keys grow evenly
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => onKeyPress(key)}
                                    fullWidth
                                    sx={{
                                        height: {
                                            xs: '36px',
                                            sm: '56px',
                                        },
                                        minWidth: {
                                            xs: '24px',
                                            sm: '42px',
                                        },
                                        maxWidth: '100%',
                                        backgroundColor: keyColor,
                                        color: isColored ? 'white' : 'text.primary',
                                        '&:hover': {
                                            backgroundColor: isColored 
                                                ? keyColor 
                                                : 'action.hover',
                                            // For wordle variant, maintain color but adjust opacity
                                            opacity: isColored ? 0.9 : 1,
                                        },
                                        fontSize: {
                                            xs: '0.9rem',
                                            sm: '1.1rem',
                                        },
                                        padding: {
                                            xs: '0 1px',
                                            sm: '0 8px',
                                        },
                                        borderRadius: 1.5,
                                        fontWeight: 600,
                                        lineHeight: 1,
                                        border: 1,
                                        borderColor: isColored ? keyColor : 'divider',
                                        textTransform: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {key === 'BACKSPACE' ? (
                                        <BackspaceIcon sx={{ 
                                            fontSize: {
                                                xs: '1.1rem',
                                                sm: '1.3rem',
                                            }
                                        }} />
                                    ) : key === 'ENTER' ? (
                                        <EnterIcon sx={{ 
                                            fontSize: {
                                                xs: '1.1rem',
                                                sm: '1.3rem',
                                            }
                                        }} />
                                    ) : key}
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>
            ))}
        </Box>
    );
}; 