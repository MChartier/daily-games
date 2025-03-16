import { FlutterDash, HelpOutline } from '@mui/icons-material';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameColors } from '../../App';
import { GameStartScreen } from '../../components/GameStartScreen';
import { useHelp } from '../../contexts/HelpContext';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { BirdleHowToPlay } from './components/BirdleHowToPlay';
import { GameState, Guess, Letter, LetterState } from './types';

// Hardcoded list of 5-letter bird terms
const BIRD_WORDS = [
    "EAGLE",
    "RAVEN",
    "ROBIN",
    "HERON",
    "FINCH",
    "OWLET",
    "PERCH",
    "AVIAN",
    "SWIFT",
    "EGRET",
    "STORK",
    "CHICK",
    "PREEN",
    "ROOST",
    "QUAIL",
    "DRAKE",
    "CREST",
    "PLUME",
    "TALON",
    "DOWNY",
    "FLIGHT",
    "BROOD",
    "CRANE",
    "GREBE",
    "GOOSE",
    "TAWNY",
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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [gameStarted, setGameStarted] = useState(false);
    const { showHelp, setShowHelp } = useHelp();
    const [gameState, setGameState] = useState<GameState>(createEmptyGame());
    const [letterStates, setLetterStates] = useState<Record<string, Letter['state']>>({});
    const [isLosingReveal, setIsLosingReveal] = useState(false);

    const handleKeyPress = useCallback((key: string) => {
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
                    hasWon: true
                }));

                // Wait longer to show the animation before navigating
                setTimeout(() => {
                    setGameState(prev => ({
                        ...prev,
                        currentGuess: prev.currentGuess + 1
                    }));
                    
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
                }, 2000); // Increased delay to allow animation to complete
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
            newLetters.forEach((letter) => {
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

                // Show the losing animation first
                setIsLosingReveal(true);

                // Wait for the animation to complete, then navigate to results
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
    }, [gameState.answer, gameState.currentGuess, gameState.guesses, gameState.isComplete, gameState.startTime, navigate]);

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
                guess.letters.forEach((letter) => {
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

    if (!gameStarted) {
        return (
            <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <GameStartScreen
                    title="Birdle"
                    icon={<FlutterDash sx={{ transform: 'scaleX(-1)' }} />}
                    color={gameColors.birdle}
                    onStart={() => setGameStarted(true)}
                    gameType="birdle"
                />
            </Box>
        );
    }

    return (
        <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'visible',
            position: 'relative',
            alignItems: 'center',
            gap: 2,
            p: 2
        }}>
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
                        zIndex: 10,
                        '&:hover': {
                            bgcolor: 'background.paper',
                            opacity: 0.9
                        }
                    }}
                >
                    <HelpOutline />
                </IconButton>
            )}

            <Box sx={{ 
                flex: 1,
                width: '100%',
                maxWidth: isMobile ? '100%' : '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <GameBoard 
                    guesses={gameState.guesses} 
                    currentGuess={gameState.currentGuess}
                    isWinningGuess={gameState.hasWon}
                    isLosingReveal={isLosingReveal}
                />
            </Box>

            <Box sx={{ width: '100%', maxWidth: isMobile ? '100%' : '500px' }}>
                <Keyboard 
                    onKeyPress={handleKeyPress}
                    letterStates={letterStates}
                />
            </Box>

            <BirdleHowToPlay 
                open={showHelp} 
                onClose={() => setShowHelp(false)} 
            />
        </Box>
    );
}; 