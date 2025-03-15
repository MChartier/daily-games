import { Home, Share } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Paper,
    Snackbar,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SudokuResults } from '../games/sudoku/components/SudokuResults';
import { Cell } from '../games/sudoku/types';
import { BirdleResults } from '../games/wordle/components/BirdleResults';
import { Guess } from '../games/wordle/types';
import { GameResult } from '../types/game';

// Type guards
const isSudokuBoard = (board: Cell[][] | Guess[] | undefined): board is Cell[][] => {
    if (!board || board.length === 0) return false;
    return Array.isArray(board[0]) && 'value' in (board[0][0] || {});
};

const isBirdleBoard = (board: Cell[][] | Guess[] | undefined): board is Guess[] => {
    if (!board || board.length === 0) return false;
    return 'letters' in (board[0] || {});
};

export const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [showCopied, setShowCopied] = useState(false);
    const result = location.state as GameResult;

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleShare = () => {
        const shareText = `I completed today's ${gameId} in ${formatTime(result.timeSpent)}!${
            result.score ? ` Score: ${result.score}` : ''
        }${
            gameId === 'sudoku' ? ` Hints: ${result.hintsUsed}` : ''
        }\nPlay at: ${window.location.origin}`;
        
        navigator.clipboard.writeText(shareText);
        setShowCopied(true);
    };

    const renderGameResults = () => {
        if (gameId === 'sudoku' && result.board && isSudokuBoard(result.board)) {
            return (
                <SudokuResults
                    board={result.board}
                    timeSpent={result.timeSpent}
                    hintsUsed={result.hintsUsed ?? 0}
                    errors={result.errors ?? 0}
                />
            );
        }

        if (gameId === 'birdle' && result.board && isBirdleBoard(result.board) && result.attempts !== undefined) {
            return (
                <BirdleResults
                    board={result.board}
                    timeSpent={result.timeSpent}
                    attempts={result.attempts}
                />
            );
        }

        return (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Time: {formatTime(result.timeSpent)}
                    {result.score && (
                        <Box component="span" sx={{ ml: 2 }}>
                            Score: {result.score}
                        </Box>
                    )}
                </Typography>
            </Paper>
        );
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
                {result.won ? "Congratulations!" : "Game Over"}
            </Typography>

            {renderGameResults()}

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    startIcon={<Share />}
                    onClick={handleShare}
                >
                    Share Result
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<Home />}
                    onClick={() => navigate('/')}
                >
                    Back to Games
                </Button>
            </Box>

            <Snackbar
                open={showCopied}
                autoHideDuration={3000}
                onClose={() => setShowCopied(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Result copied to clipboard!
                </Alert>
            </Snackbar>
        </Box>
    );
}; 