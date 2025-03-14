import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, useTheme, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { NumberPad } from './components/NumberPad';
import { GameState, Cell, CellState } from './types';
import { Grid4x4 } from '@mui/icons-material';
import { GameStartScreen } from '../../components/GameStartScreen';
import { gameColors } from '../../App';

// Sample puzzle (0 represents empty cells)
const SAMPLE_PUZZLE = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const SAMPLE_SOLUTION = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const createEmptyGame = (): GameState => ({
    board: SAMPLE_PUZZLE.map(row =>
        row.map(value => ({
            value: value || null,
            state: value ? 'initial' : 'user',
            notes: []
        }))
    ),
    solution: SAMPLE_SOLUTION,
    startTime: Date.now(),
    isComplete: false,
    hasWon: false,
    selectedCell: null,
    difficulty: 'easy'
});

export const Sudoku: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [gameStarted, setGameStarted] = useState(false);
    const [gameState, setGameState] = useState<GameState>(createEmptyGame());
    const [isNoteMode, setIsNoteMode] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [errors, setErrors] = useState(0);

    const handleCellClick = (row: number, col: number) => {
        setGameState(prev => ({
            ...prev,
            selectedCell: { row, col }
        }));
    };

    const handleNumberClick = (number: number) => {
        if (!gameState.selectedCell) return;
        const { row, col } = gameState.selectedCell;
        const cell = gameState.board[row][col];
        if (cell.state === 'initial') return;

        const newBoard = [...gameState.board];
        newBoard[row][col] = {
            ...cell,
            value: number,
            notes: []
        };

        const isComplete = newBoard.every((row, i) =>
            row.every((cell, j) => cell.value === gameState.solution[i][j])
        );

        if (isComplete) {
            const endTime = Date.now();
            navigate('/results/sudoku', {
                state: {
                    timeSpent: Math.floor((endTime - gameState.startTime) / 1000),
                    difficulty: gameState.difficulty,
                    hintsUsed,
                    errors
                }
            });
        }

        setGameState(prev => ({
            ...prev,
            board: newBoard,
            isComplete
        }));
    };

    const handleNoteClick = (number: number) => {
        if (!gameState.selectedCell) return;
        const { row, col } = gameState.selectedCell;
        const cell = gameState.board[row][col];
        if (cell.state === 'initial' || cell.value !== null) return;

        const newBoard = [...gameState.board];
        const notes = cell.notes.includes(number)
            ? cell.notes.filter(n => n !== number)
            : [...cell.notes, number].sort();

        newBoard[row][col] = {
            ...cell,
            notes
        };

        setGameState(prev => ({
            ...prev,
            board: newBoard
        }));
    };

    const handleErase = () => {
        if (!gameState.selectedCell) return;
        const { row, col } = gameState.selectedCell;
        const cell = gameState.board[row][col];
        if (cell.state === 'initial') return;

        const newBoard = [...gameState.board];
        newBoard[row][col] = {
            ...cell,
            value: null,
            notes: []
        };

        setGameState(prev => ({
            ...prev,
            board: newBoard
        }));
    };

    const handleHint = () => {
        if (!gameState.selectedCell) return;
        const { row, col } = gameState.selectedCell;
        const solution = gameState.solution[row][col];

        const newBoard = [...gameState.board];
        newBoard[row][col] = {
            value: solution,
            state: 'user',
            notes: []
        };

        setHintsUsed(prev => prev + 1);
        setGameState(prev => ({
            ...prev,
            board: newBoard
        }));
    };

    if (!gameStarted) {
        return (
            <GameStartScreen
                title="Sudoku"
                description="Fill the 9×9 grid with numbers 1-9, ensuring each number appears exactly once in every row, column, and 3×3 box."
                icon={<Grid4x4 />}
                color={gameColors.sudoku}
                onStart={() => setGameStarted(true)}
            />
        );
    }

    return (
        <Box 
            sx={{
                height: {
                    xs: 'calc(100vh - 56px - 16px - 1px)',
                    sm: 'calc(100vh - 64px - 32px - 1px)',
                },
                display: 'flex',
                flexDirection: 'column',
                px: 2,
                py: { xs: 1, sm: 2 },
                overflow: 'hidden',
            }}
        >
            {/* Game Container */}
            <Box sx={{
                width: '100%',
                height: '100%',
                maxWidth: 'sm',
                mx: 'auto',
                display: 'grid',
                gridTemplateRows: { xs: '1fr auto', sm: '1fr' },
                alignItems: 'center',
                gap: 0,
            }}>
                {/* Board Section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    pb: { xs: 1, sm: 2 },
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: {
                            xs: 'min(100%, calc(100vh - 56px - 30vh - 16px))',
                            sm: 'min(100%, calc(100vh - 64px - 30vh - 32px))',
                        },
                        aspectRatio: '1/1',
                    }}>
                        <GameBoard
                            board={gameState.board}
                            selectedCell={gameState.selectedCell}
                            onCellClick={handleCellClick}
                        />
                    </Box>

                    {/* Controls Section - Desktop */}
                    <Box sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: '100%',
                        mt: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <NumberPad
                            onNumberClick={handleNumberClick}
                            onNoteClick={handleNoteClick}
                            onErase={handleErase}
                            onHint={handleHint}
                            isNoteMode={isNoteMode}
                            onToggleNoteMode={() => setIsNoteMode(prev => !prev)}
                        />
                    </Box>
                </Box>

                {/* Controls Section - Mobile */}
                <Box sx={{
                    display: { xs: 'flex', sm: 'none' },
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    bgcolor: (theme) => theme.palette.mode === 'light' 
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(18, 18, 18, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    boxShadow: 1,
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    <NumberPad
                        onNumberClick={handleNumberClick}
                        onNoteClick={handleNoteClick}
                        onErase={handleErase}
                        onHint={handleHint}
                        isNoteMode={isNoteMode}
                        onToggleNoteMode={() => setIsNoteMode(prev => !prev)}
                    />
                </Box>
            </Box>
        </Box>
    );
}; 