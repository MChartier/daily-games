import { EmojiEvents, Timer, TrendingUp } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ResultsDialogProps {
    open: boolean;
    hasWon: boolean;
    score: number;
    timeSpent: number;
    onPlayAgain: () => void;
}

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
    open,
    hasWon,
    score,
    timeSpent,
    onPlayAgain
}) => {
    const navigate = useNavigate();

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        {hasWon ? 'Congratulations!' : 'Game Over'}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {hasWon
                            ? `You found the bird in ${score} ${score === 1 ? 'try' : 'tries'}!`
                            : 'Better luck next time!'}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <EmojiEvents sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">{score}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tries
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Timer sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">{formatTime(timeSpent)}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Time
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">{hasWon ? 'Win' : 'Loss'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Result
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/daily-games')}
                    sx={{ flex: 1 }}
                >
                    Back to Home
                </Button>
                <Button
                    variant="contained"
                    onClick={onPlayAgain}
                    sx={{ flex: 1 }}
                >
                    Play Again
                </Button>
            </DialogActions>
        </Dialog>
    );
}; 