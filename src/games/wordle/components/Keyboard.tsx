import React from 'react';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { KeyboardReturn as EnterIcon, Backspace as BackspaceIcon } from '@mui/icons-material';
import { LetterState } from '../types';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    letterStates: Record<string, LetterState>;
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

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStates }) => {
    const theme = useTheme();

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 0.25,
            width: '100%',
            maxWidth: {
                xs: '320px',
                sm: '440px',
                md: '480px',
            },
            mx: 'auto',
        }}>
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <Grid 
                    container 
                    key={rowIndex} 
                    spacing={0.25}
                    justifyContent="center"
                    wrap="nowrap"
                >
                    {row.map((key, keyIndex) => {
                        const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE';
                        return (
                            <Grid 
                                item 
                                key={keyIndex}
                                xs="auto"
                                sx={{
                                    flexGrow: isSpecialKey ? {
                                        xs: 1.1,
                                        sm: 1.5,
                                    } : 1,
                                    minWidth: 0,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => onKeyPress(key)}
                                    fullWidth
                                    sx={{
                                        height: {
                                            xs: '32px',
                                            sm: '48px',
                                        },
                                        minWidth: {
                                            xs: '24px', // Ensure very narrow width is possible
                                            sm: '36px',
                                        },
                                        maxWidth: '100%',
                                        backgroundColor: getKeyColor(letterStates[key]),
                                        color: letterStates[key] ? 'white' : 'text.primary',
                                        '&:hover': {
                                            backgroundColor: getKeyColor(letterStates[key]),
                                        },
                                        fontSize: {
                                            xs: '0.7rem',
                                            sm: '0.9rem',
                                        },
                                        padding: {
                                            xs: '0 1px', // Minimal horizontal padding on mobile
                                            sm: '0 6px', // Normal padding on desktop
                                        },
                                        borderRadius: {
                                            xs: 0.25,
                                            sm: 1,
                                        },
                                        fontWeight: 600,
                                        lineHeight: 1,
                                    }}
                                >
                                    {key === 'BACKSPACE' ? (
                                        <BackspaceIcon sx={{ 
                                            fontSize: {
                                                xs: '0.85em',
                                                sm: '1.25em',
                                            }
                                        }} />
                                    ) : key === 'ENTER' ? (
                                        <EnterIcon sx={{ 
                                            fontSize: {
                                                xs: '0.85em',
                                                sm: '1.25em',
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