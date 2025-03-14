import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Grid, useMediaQuery } from '@mui/material';
import { CrosswordCell, CrosswordClue, GameState, Direction } from './types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Extension } from '@mui/icons-material';
import { ActiveClue } from './components/ActiveClue';
import { GameStartScreen } from '../../components/GameStartScreen';
import { gameColors } from '../../App';

// Placeholder puzzle data
const INITIAL_BOARD: CrosswordCell[][] = [
    [
        { letter: null, isBlack: false, number: 1 },
        { letter: null, isBlack: false, number: 2 },
        { letter: null, isBlack: false, number: 3 },
        { letter: null, isBlack: false, number: 4 },
        { letter: null, isBlack: false, number: 5 }
    ],
    [
        { letter: null, isBlack: false, number: 6 },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false }
    ],
    [
        { letter: null, isBlack: false, number: 7 },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false }
    ],
    [
        { letter: null, isBlack: false, number: 8 },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false }
    ],
    [
        { letter: null, isBlack: false, number: 9 },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false },
        { letter: null, isBlack: false }
    ]
];

const SOLUTION_BOARD: CrosswordCell[][] = [
    [
        { letter: 'B', isBlack: false, number: 1 },
        { letter: 'E', isBlack: false, number: 2 },
        { letter: 'A', isBlack: false, number: 3 },
        { letter: 'S', isBlack: false, number: 4 },
        { letter: 'T', isBlack: false, number: 5 }
    ],
    [
        { letter: 'L', isBlack: false, number: 6 },
        { letter: 'A', isBlack: false },
        { letter: 'T', isBlack: false },
        { letter: 'T', isBlack: false },
        { letter: 'E', isBlack: false }
    ],
    [
        { letter: 'A', isBlack: false, number: 7 },
        { letter: 'R', isBlack: false },
        { letter: 'B', isBlack: false },
        { letter: 'O', isBlack: false },
        { letter: 'R', isBlack: false }
    ],
    [
        { letter: 'S', isBlack: false, number: 8 },
        { letter: 'T', isBlack: false },
        { letter: 'A', isBlack: false },
        { letter: 'R', isBlack: false },
        { letter: 'S', isBlack: false }
    ],
    [
        { letter: 'T', isBlack: false, number: 9 },
        { letter: 'H', isBlack: false },
        { letter: 'Y', isBlack: false },
        { letter: 'M', isBlack: false },
        { letter: 'E', isBlack: false }
    ]
];

const INITIAL_CLUES: CrosswordClue[] = [
    // Across clues
    { number: 1, direction: 'across', clue: 'Beauty and the _____', answer: 'BEAST' },
    { number: 6, direction: 'across', clue: 'Coffee shop favorite with steamed milk', answer: 'LATTE' },
    { number: 7, direction: 'across', clue: 'Garden shelter or retreat', answer: 'ARBOR' },
    { number: 8, direction: 'across', clue: 'Celestial lights in the night sky', answer: 'STARS' },
    { number: 9, direction: 'across', clue: 'Aromatic herb used in cooking', answer: 'THYME' },
    // Down clues
    { number: 1, direction: 'down', clue: 'Explosive success or sudden realization', answer: 'BLAST' },
    { number: 2, direction: 'down', clue: 'Our planet', answer: 'EARTH' },
    { number: 3, direction: 'down', clue: 'Hold something threatening at a distance (2 words)', answer: 'ATBAY' },
    { number: 4, direction: 'down', clue: 'Powerful weather system', answer: 'STORM' },
    { number: 5, direction: 'down', clue: 'Brief and to the point', answer: 'TERSE' }
];

export const Crossword: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [gameStarted, setGameStarted] = useState(false);
    const [gameState, setGameState] = useState<GameState>({
        board: INITIAL_BOARD,
        clues: INITIAL_CLUES,
        selectedCell: { row: 0, col: 0 },
        activeClue: { number: 1, direction: 'across' },
        isComplete: false,
        startTime: Date.now(),
    });

    const findClueStart = useCallback((number: number, direction: Direction): [number, number] => {
        for (let i = 0; i < gameState.board.length; i++) {
            for (let j = 0; j < gameState.board[i].length; j++) {
                if (gameState.board[i][j].number === number) {
                    return [i, j];
                }
            }
        }
        return [0, 0];
    }, [gameState.board]);

    const findClueFromCell = useCallback((row: number, col: number, direction: Direction): number | null => {
        // For across clues, look for the leftmost number in the same row
        if (direction === 'across') {
            for (let j = 0; j <= col; j++) {
                if (gameState.board[row][j].number) {
                    return gameState.board[row][j].number!;
                }
            }
        }
        // For down clues, look for the topmost number in the same column
        else {
            for (let i = 0; i <= row; i++) {
                if (gameState.board[i][col].number) {
                    return gameState.board[i][col].number!;
                }
            }
        }
        return null;
    }, [gameState.board]);

    const handleClueClick = useCallback((number: number, direction: Direction, specificCell?: { row: number, col: number }) => {
        if (specificCell) {
            setGameState(prev => ({
                ...prev,
                selectedCell: specificCell,
                activeClue: { number, direction },
            }));
        } else {
            const [row, col] = findClueStart(number, direction);
            setGameState(prev => ({
                ...prev,
                selectedCell: { row, col },
                activeClue: { number, direction },
            }));
        }
    }, [findClueStart]);

    const getNextCell = useCallback((row: number, col: number, direction: Direction): [number, number] | null => {
        if (direction === 'across') {
            return col < 4 ? [row, col + 1] : null;
        } else {
            return row < 4 ? [row + 1, col] : null;
        }
    }, []);

    const getNextClue = useCallback((currentNumber: number, direction: Direction): { number: number; direction: Direction } | null => {
        const clues = gameState.clues.filter(c => c.direction === direction);
        const currentIndex = clues.findIndex(c => c.number === currentNumber);
        
        if (currentIndex < clues.length - 1) {
            // Next clue in same direction
            return { number: clues[currentIndex + 1].number, direction };
        } else if (direction === 'across') {
            // Switch to down clues if we're at the end of across
            const downClues = gameState.clues.filter(c => c.direction === 'down');
            return downClues.length > 0 ? { number: downClues[0].number, direction: 'down' } : null;
        }
        return null;
    }, [gameState.clues]);

    const toggleDirection = useCallback((row: number, col: number) => {
        const currentDirection = gameState.activeClue?.direction || 'across';
        const newDirection = currentDirection === 'across' ? 'down' : 'across';
        const clueNumber = findClueFromCell(row, col, newDirection);
        
        if (clueNumber) {
            setGameState(prev => ({
                ...prev,
                activeClue: { number: clueNumber, direction: newDirection },
            }));
        }
    }, [gameState.activeClue?.direction, findClueFromCell]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (!gameState.selectedCell) return;

        const { row, col } = gameState.selectedCell;
        const direction = gameState.activeClue?.direction || 'across';

        if (event.key === ' ') {
            event.preventDefault();
            toggleDirection(row, col);
            return;
        }

        if (event.key === 'Backspace' || event.key === 'Delete') {
            setGameState(prev => ({
                ...prev,
                board: prev.board.map((r, i) =>
                    i === row
                        ? r.map((c, j) =>
                            j === col ? { ...c, letter: null } : c
                        )
                        : r
                ),
            }));
        } else if (/^[a-zA-Z]$/.test(event.key)) {
            const newLetter = event.key.toUpperCase();
            setGameState(prev => {
                const newBoard = prev.board.map((r, i) =>
                    i === row
                        ? r.map((c, j) =>
                            j === col ? { ...c, letter: newLetter } : c
                        )
                        : r
                );

                // Move to next cell if available
                const nextCell = getNextCell(row, col, direction);
                const isComplete = newBoard.every((row, i) =>
                    row.every((cell, j) => 
                        cell.letter === SOLUTION_BOARD[i][j].letter
                    )
                );

                // If no next cell in current direction, try moving to next clue
                if (!nextCell && prev.activeClue) {
                    const nextClue = getNextClue(prev.activeClue.number, prev.activeClue.direction);
                    if (nextClue) {
                        const [newRow, newCol] = findClueStart(nextClue.number, nextClue.direction);
                        return {
                            ...prev,
                            board: newBoard,
                            selectedCell: { row: newRow, col: newCol },
                            activeClue: nextClue,
                            isComplete,
                        };
                    }
                }

                return {
                    ...prev,
                    board: newBoard,
                    selectedCell: nextCell ? { row: nextCell[0], col: nextCell[1] } : prev.selectedCell,
                    isComplete,
                };
            });
        } else if (event.key.startsWith('Arrow')) {
            event.preventDefault();
            let newRow = row;
            let newCol = col;
            let newDirection = direction;

            switch (event.key) {
                case 'ArrowUp':
                    newRow = Math.max(0, row - 1);
                    newDirection = 'down';
                    break;
                case 'ArrowDown':
                    newRow = Math.min(4, row + 1);
                    newDirection = 'down';
                    break;
                case 'ArrowLeft':
                    newCol = Math.max(0, col - 1);
                    newDirection = 'across';
                    break;
                case 'ArrowRight':
                    newCol = Math.min(4, col + 1);
                    newDirection = 'across';
                    break;
            }

            const clueNumber = findClueFromCell(newRow, newCol, newDirection);
            if (clueNumber) {
                setGameState(prev => ({
                    ...prev,
                    selectedCell: { row: newRow, col: newCol },
                    activeClue: { number: clueNumber, direction: newDirection },
                }));
            }
        }
    }, [gameState.selectedCell, gameState.activeClue, findClueFromCell, getNextCell, getNextClue, toggleDirection]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        // Check if puzzle is complete and update stats
        if (gameState.isComplete && !gameState.endTime) {
            const endTime = Date.now();
            setGameState(prev => ({ ...prev, endTime }));
            
            navigate('/results/crossword', {
                state: {
                    timeSpent: Math.floor((endTime - gameState.startTime) / 1000),
                    isComplete: true,
                    date: new Date().toISOString(),
                }
            });
        }
    }, [gameState.isComplete, gameState.endTime, gameState.startTime, navigate]);

    const getCellStyle = (row: number, col: number) => {
        const cell = gameState.board[row][col];
        const isSelected = gameState.selectedCell?.row === row && gameState.selectedCell?.col === col;
        
        // Check if cell is part of active clue
        const isActiveClue = gameState.activeClue && (() => {
            const clueNumber = findClueFromCell(row, col, gameState.activeClue!.direction);
            return clueNumber === gameState.activeClue!.number;
        })();

        return {
            aspectRatio: '1/1',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: isSelected 
                ? '#fff7d1'  // Light pastel yellow for selected
                : isActiveClue
                    ? '#fff9e6'  // Very light yellow for active clue
                    : '#ffffff',
            transition: 'all 0.2s ease',
            borderRadius: 0,
            '&:hover': {
                backgroundColor: isSelected
                    ? '#fff7d1'
                    : '#fffbe6',
            },
        };
    };

    const getClueStyle = (number: number, direction: Direction) => {
        const isActive = gameState.activeClue?.number === number && 
                        gameState.activeClue?.direction === direction;
        
        return {
            mb: 1.5,
            color: 'text.primary',
            backgroundColor: isActive ? '#fff9e6' : 'transparent',
            padding: 1,
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#fffbe6',
            },
        };
    };

    const handlePreviousClue = useCallback(() => {
        if (!gameState.activeClue) return;
        
        const clues = gameState.clues.filter(c => c.direction === gameState.activeClue!.direction);
        const currentIndex = clues.findIndex(c => c.number === gameState.activeClue!.number);
        
        if (currentIndex > 0) {
            const prevClue = clues[currentIndex - 1];
            handleClueClick(prevClue.number, prevClue.direction);
        } else if (gameState.activeClue.direction === 'down') {
            // Switch to last across clue
            const acrossClues = gameState.clues.filter(c => c.direction === 'across');
            if (acrossClues.length > 0) {
                const lastAcross = acrossClues[acrossClues.length - 1];
                handleClueClick(lastAcross.number, 'across');
            }
        }
    }, [gameState.activeClue, gameState.clues, handleClueClick]);

    const handleNextClue = useCallback(() => {
        if (!gameState.activeClue) return;
        const nextClue = getNextClue(gameState.activeClue.number, gameState.activeClue.direction);
        if (nextClue) {
            handleClueClick(nextClue.number, nextClue.direction);
        }
    }, [gameState.activeClue, getNextClue, handleClueClick]);

    const activeClue = gameState.activeClue 
        ? gameState.clues.find(c => 
            c.number === gameState.activeClue!.number && 
            c.direction === gameState.activeClue!.direction
        )
        : null;

    if (!gameStarted) {
        return (
            <GameStartScreen
                title="Crossword"
                description="Challenge your vocabulary with our daily crossword puzzle. Each clue leads to a word that fits perfectly in the grid."
                icon={<Extension />}
                color={gameColors.crossword}
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
            <Box sx={{
                flex: 1,
                width: '100%',
                maxWidth: { xs: 'sm', sm: '100%' },
                display: 'grid',
                gridTemplateRows: { xs: '1fr auto', sm: '1fr' },
                gap: 2,
                overflow: 'hidden',
                mx: 'auto',
            }}>
                {/* Game Content */}
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    overflow: 'hidden',
                }}>
                    {/* Game Board Container */}
                    <Box sx={{
                        width: { xs: '100%', sm: '800px' },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* Game Board */}
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: { xs: '100%', sm: '800px' },
                                aspectRatio: '1/1',
                                backgroundColor: alpha(theme.palette.text.primary, 0.23),
                                border: `2px solid ${theme.palette.text.primary}`,
                                borderRadius: 1,
                                padding: 0,
                                margin: '0 auto',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(5, 1fr)',
                                    gap: '1px',
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                }}
                            >
                                {gameState.board.map((row, i) =>
                                    row.map((cell, j) => (
                                        <Box
                                            key={`${i}-${j}`}
                                            onClick={() => {
                                                const cell = gameState.board[i][j];
                                                const currentDirection = gameState.activeClue?.direction || 'across';
                                                
                                                // If clicking the same cell, toggle direction
                                                if (gameState.selectedCell?.row === i && gameState.selectedCell?.col === j) {
                                                    const newDirection = currentDirection === 'across' ? 'down' : 'across';
                                                    const clueNumber = findClueFromCell(i, j, newDirection);
                                                    if (clueNumber) {
                                                        handleClueClick(clueNumber, newDirection, { row: i, col: j });
                                                    }
                                                } else {
                                                    // Try to keep the same direction when moving to a new cell
                                                    let clueNumber = findClueFromCell(i, j, currentDirection);
                                                    let direction = currentDirection;
                                                    
                                                    // If no clue found in current direction, try the other direction
                                                    if (!clueNumber) {
                                                        direction = currentDirection === 'across' ? 'down' : 'across';
                                                        clueNumber = findClueFromCell(i, j, direction);
                                                    }
                                                    
                                                    if (clueNumber) {
                                                        handleClueClick(clueNumber, direction, { row: i, col: j });
                                                    }
                                                }
                                            }}
                                            sx={{
                                                ...getCellStyle(i, j),
                                                borderRadius: 0,
                                            }}
                                        >
                                            {cell.number && (
                                                <Typography
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '2px',
                                                        left: '2px',
                                                        fontSize: { xs: '0.7rem', sm: '1rem' },
                                                        lineHeight: 1,
                                                        fontWeight: 600,
                                                        color: 'text.secondary',
                                                        userSelect: 'none',
                                                        padding: '1px',
                                                    }}
                                                >
                                                    {cell.number}
                                                </Typography>
                                            )}
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'text.primary',
                                                    userSelect: 'none',
                                                    fontSize: { xs: '1.25rem', sm: '2rem' },
                                                }}
                                            >
                                                {cell.letter || ''}
                                            </Typography>
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </Box>
                    </Box>

                    {/* Clues Section - Desktop */}
                    {!isMobile && (
                        <Box sx={{ 
                            flex: 1,
                            minWidth: { sm: '300px' },
                            maxWidth: { sm: '400px' },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            overflow: 'auto',
                            px: 2,
                        }}>
                            {/* Across Clues */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Across
                                </Typography>
                                {gameState.clues
                                    .filter(clue => clue.direction === 'across')
                                    .map(clue => (
                                        <Box
                                            key={`across-${clue.number}`}
                                            onClick={() => handleClueClick(clue.number, 'across')}
                                            sx={{
                                                p: 1,
                                                cursor: 'pointer',
                                                borderRadius: 1,
                                                backgroundColor: 
                                                    gameState.activeClue?.number === clue.number && 
                                                    gameState.activeClue?.direction === 'across'
                                                        ? 'action.selected'
                                                        : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <Typography>
                                                <strong>{clue.number}.</strong> {clue.clue}
                                            </Typography>
                                        </Box>
                                    ))}
                            </Box>

                            {/* Down Clues */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Down
                                </Typography>
                                {gameState.clues
                                    .filter(clue => clue.direction === 'down')
                                    .map(clue => (
                                        <Box
                                            key={`down-${clue.number}`}
                                            onClick={() => handleClueClick(clue.number, 'down')}
                                            sx={{
                                                p: 1,
                                                cursor: 'pointer',
                                                borderRadius: 1,
                                                backgroundColor: 
                                                    gameState.activeClue?.number === clue.number && 
                                                    gameState.activeClue?.direction === 'down'
                                                        ? 'action.selected'
                                                        : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <Typography>
                                                <strong>{clue.number}.</strong> {clue.clue}
                                            </Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Active Clue Section - Mobile */}
                {isMobile && activeClue && (
                    <Box sx={{
                        position: 'sticky',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        backdropFilter: 'blur(8px)',
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        boxShadow: 1,
                        px: { xs: 0.5, sm: 1 },
                        py: { xs: 1, sm: 1.5 },
                    }}>
                        <ActiveClue
                            clue={activeClue}
                            onDirectionToggle={() => {
                                if (gameState.selectedCell) {
                                    toggleDirection(gameState.selectedCell.row, gameState.selectedCell.col);
                                }
                            }}
                            onPreviousClue={handlePreviousClue}
                            onNextClue={handleNextClue}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}; 