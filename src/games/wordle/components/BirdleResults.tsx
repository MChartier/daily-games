import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Guess } from '../types';

interface BirdleResultsProps {
    board: Guess[];
    timeSpent: number;
    attempts: number;
}

export const BirdleResults: React.FC<BirdleResultsProps> = ({ board, timeSpent, attempts }) => {
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Time: {formatTime(timeSpent)}
                </Typography>
                <Typography variant="h6">
                    Solved in {attempts} {attempts === 1 ? 'try' : 'tries'}
                </Typography>
            </Box>

            {/* Game Board Visualization */}
            <Box sx={{ 
                width: '100%',
                maxWidth: '300px',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                {board.map((guess, rowIndex) => (
                    <Grid container key={rowIndex} spacing={1} justifyContent="center">
                        {guess.letters.map((letter, colIndex) => (
                            <Grid item key={colIndex} xs={2}>
                                <Box sx={{
                                    aspectRatio: '1/1',
                                    backgroundColor: letter.state === 'correct' ? '#50B83C' :
                                                   letter.state === 'present' ? '#FFB020' :
                                                   letter.state === 'absent' ? '#6B7280' :
                                                   'background.paper',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 1,
                                    border: letter.value ? 'none' : '2px solid',
                                    borderColor: 'divider',
                                }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 700,
                                            color: letter.value ? 'white' : 'text.primary',
                                        }}
                                    >
                                        {letter.value}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Box>
        </Paper>
    );
}; 