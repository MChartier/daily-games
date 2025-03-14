import React from 'react';
import { Box, Grid } from '@mui/material';
import { Guess } from '../types';
import { GameTile } from './GameTile';

interface GameBoardProps {
    guesses: Guess[];
    currentGuess: number;
    isWinningGuess?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ guesses, currentGuess, isWinningGuess = false }) => {
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
                        const shouldAnimate = isWinningGuess && rowIndex === currentGuess - 1;
                        return (
                            <Grid 
                                item 
                                key={colIndex}
                                sx={{
                                    width: '18%', // Increased from 16% to use more horizontal space
                                    aspectRatio: '1/1',
                                    display: 'flex',
                                }}
                            >
                                <GameTile
                                    letter={letter}
                                    isActive={rowIndex === currentGuess}
                                    shouldAnimate={shouldAnimate}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            ))}
        </Box>
    );
}; 