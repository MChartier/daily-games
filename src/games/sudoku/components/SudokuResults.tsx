import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { Cell } from '../types';

interface SudokuResultsProps {
    board: Cell[][];
    timeSpent: number;
    hintsUsed: number;
    errors: number;
}

export const SudokuResults: React.FC<SudokuResultsProps> = ({
    board,
    timeSpent,
    hintsUsed,
    errors
}) => {
    const theme = useTheme();

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getCellBgColor = (cell: Cell) => {
        switch (cell.state) {
            case 'initial':
                return theme.palette.grey[300];
            case 'hint':
                return theme.palette.info.light;
            case 'user':
                return theme.palette.success.light;
            default:
                return theme.palette.background.paper;
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
            <Grid container spacing={2}>
                {/* Stats Section */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Time
                            </Typography>
                            <Typography variant="h6">
                                {formatTime(timeSpent)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Hints
                            </Typography>
                            <Typography variant="h6">
                                {hintsUsed}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Errors
                            </Typography>
                            <Typography variant="h6">
                                {errors}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Board Section */}
                <Grid item xs={12}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '1/1',
                            border: `3px solid ${theme.palette.text.primary}`,
                            borderRadius: 1,
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '2px',
                            p: '2px',
                            backgroundColor: theme.palette.text.primary,
                        }}
                    >
                        {[0, 1, 2].map((boxRow) => (
                            [0, 1, 2].map((boxCol) => (
                                <Box
                                    key={`${boxRow}-${boxCol}`}
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '1px',
                                        backgroundColor: theme.palette.text.primary,
                                    }}
                                >
                                    {[0, 1, 2].map((cellRow) => (
                                        [0, 1, 2].map((cellCol) => {
                                            const i = boxRow * 3 + cellRow;
                                            const j = boxCol * 3 + cellCol;
                                            return (
                                                <Box
                                                    key={`${i}-${j}`}
                                                    sx={{
                                                        aspectRatio: '1/1',
                                                        bgcolor: getCellBgColor(board[i][j]),
                                                    }}
                                                />
                                            );
                                        })
                                    ))}
                                </Box>
                            ))
                        ))}
                    </Box>

                    {/* Legend */}
                    <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                        {[
                            { state: 'initial' as const, label: 'Given' },
                            { state: 'user' as const, label: 'Solved' },
                            { state: 'hint' as const, label: 'Hints' }
                        ].map(({ state, label }) => (
                            <Box
                                key={state}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        bgcolor: getCellBgColor({ state, value: null, notes: [] }),
                                        borderRadius: 0.5
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                    {label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}; 