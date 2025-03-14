import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { GameState, Guess, Letter, LetterState } from './types';
import { FlutterDash } from '@mui/icons-material';
import { GameStartScreen } from '../../components/GameStartScreen';
import { gameColors } from '../../App';

// Hardcoded list of 5-letter bird names
const BIRD_WORDS = [
    'EAGLE', 'ROBIN', 'SWIFT', 'CRANE', 'STORK',
    'GOOSE', 'HERON',
    'FINCH', 'STARL', 'RAVEN'
];

const createEmptyGuess = (): Guess => ({
    letters: Array(5).fill({ value: '', state: 'empty' as LetterState }),
    isComplete: false
});

const createEmptyGame = (): GameState => ({
    guesses: Array(6).fill(null).map(() => createEmptyGuess()),
    currentGuess: 0,
    isComplete: false,
    hasWon: false,
    answer: BIRD_WORDS[Math.floor(Math.random() * BIRD_WORDS.length)],
    startTime: Date.now()
});

export const Birdle: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [gameStarted, setGameStarted] = useState(false);
    const [gameState, setGameState] = useState<GameState>(createEmptyGame());
    const [letterStates, setLetterStates] = useState<Record<string, Letter['state']>>({});
    const [showHelp, setShowHelp] = useState(false);

    const handleKeyPress = (key: string) => {
        if (gameState.isComplete) return;

        const currentGuess = gameState.guesses[gameState.currentGuess];
        const newGuesses = [...gameState.guesses];

        if (key === 'BACKSPACE') {
            const newLetters = [...currentGuess.letters];
            // Find the last filled position by searching from the end
            const values = newLetters.map(l => l.value);
            const lastFilledIndex = values.length - 1 - [...values].reverse().findIndex(value => value !== '');
            if (lastFilledIndex >= 0 && values[lastFilledIndex] !== '') {
                newLetters[lastFilledIndex] = { value: '', state: 'empty' as LetterState };
                newGuesses[gameState.currentGuess] = {
                    ...currentGuess,
                    letters: newLetters,
                    isComplete: false
                };
                setGameState(prev => ({
                    ...prev,
                    guesses: newGuesses
                }));
            }
            return;
        } else if (key === 'ENTER') {
            if (!currentGuess.isComplete) return;

            const guess = currentGuess.letters.map(l => l.value).join('');
            if (guess === gameState.answer) {
                const newLetters = currentGuess.letters.map(l => ({ ...l, state: 'correct' as LetterState }));
                newGuesses[gameState.currentGuess] = {
                    ...currentGuess,
                    letters: newLetters,
                    isComplete: true
                };
                
                setGameState(prev => ({
                    ...prev,
                    guesses: newGuesses,
                    isComplete: true,
                    hasWon: true,
                    currentGuess: prev.currentGuess + 1
                }));

                // Wait a moment to show the completed board, then navigate to results
                setTimeout(() => {
                    const timeSpent = Math.floor((Date.now() - gameState.startTime) / 1000);
                    navigate('/results/birdle', {
                        state: {
                            gameType: 'birdle',
                            won: true,
                            answer: gameState.answer,
                            attempts: gameState.currentGuess + 1,
                            timeSpent,
                            board: newGuesses
                        }
                    });
                }, 1500);
                return;
            }

            // First pass: Mark correct letters
            const newLetters = currentGuess.letters.map((letter, index) => {
                if (letter.value === gameState.answer[index]) {
                    return { ...letter, state: 'correct' as LetterState };
                }
                return { ...letter, state: 'empty' as LetterState };
            });

            // Count remaining letters in answer (excluding correct matches)
            const remainingLetters: Record<string, number> = {};
            gameState.answer.split('').forEach((letter, index) => {
                if (letter !== currentGuess.letters[index].value) {
                    remainingLetters[letter] = (remainingLetters[letter] || 0) + 1;
                }
            });

            // Second pass: Mark present letters
            newLetters.forEach((letter, index) => {
                if (letter.state !== 'correct' && remainingLetters[letter.value] > 0) {
                    letter.state = 'present';
                    remainingLetters[letter.value]--;
                } else if (letter.state !== 'correct') {
                    letter.state = 'absent';
                }
            });

            newGuesses[gameState.currentGuess] = {
                ...currentGuess,
                letters: newLetters,
                isComplete: true
            };

            if (gameState.currentGuess === 5) {
                setGameState(prev => ({
                    ...prev,
                    guesses: newGuesses,
                    isComplete: true,
                    hasWon: false
                }));

                // Wait a moment to show the final state, then navigate to results
                setTimeout(() => {
                    const timeSpent = Math.floor((Date.now() - gameState.startTime) / 1000);
                    navigate('/results/birdle', {
                        state: {
                            gameType: 'birdle',
                            won: false,
                            answer: gameState.answer,
                            attempts: 6,
                            timeSpent,
                            board: newGuesses
                        }
                    });
                }, 1500);
                return;
            }

            setGameState(prev => ({
                ...prev,
                guesses: newGuesses,
                currentGuess: prev.currentGuess + 1
            }));
        } else {
            const newLetters = [...currentGuess.letters];
            const emptyIndex = newLetters.findIndex(l => l.value === '');
            if (emptyIndex !== -1) {
                newLetters[emptyIndex] = { value: key, state: 'empty' as LetterState };
                const isComplete = emptyIndex === 4; // Will be complete if we just filled the last position
                newGuesses[gameState.currentGuess] = {
                    ...currentGuess,
                    letters: newLetters,
                    isComplete
                };
                setGameState(prev => ({
                    ...prev,
                    guesses: newGuesses
                }));
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Backspace' || event.key === 'Delete') {
                handleKeyPress('BACKSPACE');
            } else {
                const key = event.key.toUpperCase();
                if (key === 'ENTER' || /^[A-Z]$/.test(key)) {
                    handleKeyPress(key);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyPress]);

    useEffect(() => {
        const newLetterStates: Record<string, Letter['state']> = {};
        gameState.guesses.forEach((guess, rowIndex) => {
            // Only process completed guesses that are not the current row
            if (guess.isComplete && rowIndex < gameState.currentGuess) {
                guess.letters.forEach((letter, index) => {
                    if (letter.value) {
                        const currentState = newLetterStates[letter.value];
                        if (!currentState || 
                            (letter.state === 'correct' && currentState !== 'correct') ||
                            (letter.state === 'present' && currentState === 'absent')) {
                            newLetterStates[letter.value] = letter.state;
                        }
                    }
                });
            }
        });
        setLetterStates(newLetterStates);
    }, [gameState.guesses, gameState.currentGuess]);

    const handleHelp = () => {
        setShowHelp(true);
    };

    if (!gameStarted) {
        return (
            <GameStartScreen
                title="Birdle"
                description="Guess the bird species in 6 tries. Each guess must be a valid 5-letter bird name."
                icon={<FlutterDash sx={{ transform: 'scaleX(-1)' }} />}
                color={gameColors.birdle}
                onStart={() => setGameStarted(true)}
            />
        );
    }

    return (
        <Box 
            sx={{
                height: 'calc(100vh - 57px)',
                display: 'flex',
                flexDirection: 'column',
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 2 },
                overflow: 'hidden',
            }}
        >
            {/* Game Container */}
            <Box sx={{
                width: '100%',
                height: '100%',
                maxWidth: { xs: '100%', sm: 'sm' },
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Game Content */}
                <Box sx={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'auto',
                }}>
                    {/* Game Board */}
                    <Box sx={{
                        width: '100%',
                        maxWidth: { xs: '95vw', sm: '420px' },
                        aspectRatio: '5/6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        <GameBoard 
                            guesses={gameState.guesses}
                            currentGuess={gameState.currentGuess}
                            isWinningGuess={gameState.hasWon}
                        />
                    </Box>
                </Box>

                {/* Controls Section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: (theme) => theme.palette.mode === 'light' 
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(18, 18, 18, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    boxShadow: 1,
                    px: { xs: 0.5, sm: 1 },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    <Box sx={{ width: '100%', maxWidth: '500px' }}>
                        <Keyboard
                            onKeyPress={handleKeyPress}
                            letterStates={letterStates}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}; 