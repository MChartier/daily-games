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
                newGuesses[gameState.currentGuess] = {
                    ...currentGuess,
                    letters: currentGuess.letters.map(l => ({ ...l, state: 'correct' as LetterState }))
                };
                setGameState(prev => ({
                    ...prev,
                    guesses: newGuesses,
                    isComplete: true,
                    hasWon: true
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

            const newLetters = currentGuess.letters.map((letter, index) => {
                if (letter.value === gameState.answer[index]) {
                    return { ...letter, state: 'correct' as LetterState };
                }
                if (gameState.answer.includes(letter.value)) {
                    return { ...letter, state: 'present' as LetterState };
                }
                return { ...letter, state: 'absent' as LetterState };
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
    }, [gameState]);

    useEffect(() => {
        const newLetterStates: Record<string, Letter['state']> = {};
        gameState.guesses.forEach(guess => {
            if (guess.isComplete) {
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
    }, [gameState.guesses]);

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
                height: 'calc(100vh - 56px)', // 56px is mobile app bar height
                '@media (min-width: 600px)': {
                    height: 'calc(100vh - 64px)', // 64px is desktop app bar height
                },
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden', // Prevent scrolling
            }}
        >
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 'sm',
                width: '100%',
                mx: 'auto',
                px: { xs: 1, sm: 2 },
                overflow: 'hidden', // Prevent scrolling
            }}>
                {/* Game Header */}
                <Box sx={{ py: { xs: 1, sm: 1.5 } }}>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                        Birdle
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Guess the bird species in 6 tries
                    </Typography>
                </Box>

                {/* Game Board - will flex to fill available space */}
                <Box sx={{ 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 0, // Important for flex child
                    overflow: 'hidden', // Prevent scrolling
                }}>
                    <GameBoard
                        guesses={gameState.guesses}
                        currentGuess={gameState.currentGuess}
                    />
                </Box>

                {/* Keyboard - fixed height at bottom */}
                <Box sx={{ mt: 'auto' }}>
                    <Keyboard
                        onKeyPress={handleKeyPress}
                        letterStates={letterStates}
                    />
                </Box>
            </Box>
        </Box>
    );
}; 