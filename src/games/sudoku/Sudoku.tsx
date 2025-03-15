import { Grid3x3, HelpOutline } from '@mui/icons-material';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameColors } from '../../App';
import { GameStartScreen } from '../../components/GameStartScreen';
import { useHelp } from '../../contexts/HelpContext';
import { GameBoard } from './components/GameBoard';
import { NumberPad } from './components/NumberPad';
import { SudokuHowToPlay } from './components/SudokuHowToPlay';
import { GameState } from './types';

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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [gameStarted, setGameStarted] = useState(false);
    const { showHelp, setShowHelp } = useHelp();
    const [gameState, setGameState] = useState<GameState>(createEmptyGame());
    const [isNoteMode, setIsNoteMode] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [errors, setErrors] = useState(0);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [board, setBoard] = useState<number[][]>(SAMPLE_PUZZLE);

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

    const handleArrowKey = (direction: 'up' | 'down' | 'left' | 'right') => {
        if (!gameState.selectedCell) return;
        
        const { row, col } = gameState.selectedCell;
        let newRow = row;
        let newCol = col;

        switch (direction) {
            case 'up':
                newRow = row > 0 ? row - 1 : 8;
                break;
            case 'down':
                newRow = row < 8 ? row + 1 : 0;
                break;
            case 'left':
                newCol = col > 0 ? col - 1 : 8;
                break;
            case 'right':
                newCol = col < 8 ? col + 1 : 0;
                break;
        }

        // Skip initial cells
        while (gameState.board[newRow][newCol].state === 'initial') {
            switch (direction) {
                case 'up':
                    newRow = newRow > 0 ? newRow - 1 : 8;
                    break;
                case 'down':
                    newRow = newRow < 8 ? newRow + 1 : 0;
                    break;
                case 'left':
                    newCol = newCol > 0 ? newCol - 1 : 8;
                    break;
                case 'right':
                    newCol = newCol < 8 ? newCol + 1 : 0;
                    break;
            }
            
            // If we've wrapped around to the original position, break to avoid infinite loop
            if (newRow === row && newCol === col) break;
        }

        // Only update if we found a non-initial cell
        if (gameState.board[newRow][newCol].state !== 'initial') {
            setGameState(prev => ({
                ...prev,
                selectedCell: { row: newRow, col: newCol }
            }));
        }
    };

    if (!gameStarted) {
        return (
            <Box sx={{ height: 'calc(100vh - 57px)' }}>
                <GameStartScreen
                    title="Sudoku"
                    icon={<Grid3x3 />}
                    color={gameColors.sudoku}
                    onStart={() => setGameStarted(true)}
                    gameType="sudoku"
                />
            </Box>
        );
    }

    return (
        <Box 
            sx={{
                height: 'calc(100vh - 57px)',
                display: 'flex',
                flexDirection: 'column',
                px: 2,
                py: { xs: 1, sm: 2 },
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* How to Play Modal */}
            <SudokuHowToPlay
                open={showHelp}
                onClose={() => setShowHelp(false)}
            />

            {/* Desktop Help Button */}
            {!isMobile && (
                <IconButton
                    onClick={() => setShowHelp(true)}
                    size="large"
                    sx={{ 
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: 'text.primary',
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        zIndex: 1,
                        '&:hover': {
                            bgcolor: 'background.paper',
                            opacity: 0.9
                        }
                    }}
                >
                    <HelpOutline />
                </IconButton>
            )}

            {/* Mobile Help Button in Header */}
            {isMobile && (
                <IconButton
                    edge="end"
                    sx={{
                        position: 'fixed',
                        top: 8,
                        right: 16,
                        color: 'white',
                        zIndex: 1100,
                    }}
                    onClick={() => setShowHelp(true)}
                >
                    <HelpOutline />
                </IconButton>
            )}

            {/* Game Container */}
            <Box sx={{
                width: '100%',
                height: '100%',
                maxWidth: 'sm',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Board Section */}
                <Box sx={{
                    flex: '1 1 auto',
                    minHeight: 0,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: {
                            xs: 'min(100%, calc(100vh - 56px - 250px))',
                            sm: 'min(100%, calc(100vh - 64px - 280px))',
                        },
                        aspectRatio: '1/1',
                    }}>
                        <GameBoard
                            board={gameState.board}
                            selectedCell={gameState.selectedCell}
                            onCellClick={handleCellClick}
                            onNumberInput={handleNumberClick}
                            onDelete={handleErase}
                            onArrowKey={handleArrowKey}
                        />
                    </Box>
                </Box>

                {/* Controls Section */}
                <Box sx={{
                    width: '100%',
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 'auto',
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