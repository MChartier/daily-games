import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Guess } from '../types';
import { GameTile } from './GameTile';

interface GameBoardProps {
    guesses: Guess[];
    currentGuess: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ guesses, currentGuess }) => {
    const theme = useTheme();
    const rows = 6;
    const cols = 5;

    return (
        <Box sx={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2%',
            maxHeight: '420px', // Prevent too large tiles on big screens
        }}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <Grid 
                    container 
                    key={rowIndex} 
                    spacing={1}
                    justifyContent="center"
                    sx={{ flex: 1 }}
                >
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const guess = guesses[rowIndex];
                        const letter = guess?.letters[colIndex] || { value: '', state: 'empty' };
                        return (
                            <Grid 
                                item 
                                key={colIndex}
                                sx={{
                                    width: '16%', // Slightly less than 1/5 to account for gaps
                                    aspectRatio: '1/1',
                                    display: 'flex',
                                }}
                            >
                                <GameTile
                                    letter={letter}
                                    isActive={rowIndex === currentGuess}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            ))}
        </Box>
    );
}; 