import { HelpOutline, PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import React from 'react';
import { useHelp } from '../contexts/HelpContext';
import { CrosswordHowToPlay } from '../games/crossword/components/CrosswordHowToPlay';
import { SudokuHowToPlay } from '../games/sudoku/components/SudokuHowToPlay';
import { WordleHowToPlay } from '../games/wordle/components/WordleHowToPlay';

interface GameStartScreenProps {
    onStart: () => void;
    title: string;
    icon: React.ReactNode;
    color: string;
    gameType: 'birdle' | 'crossword' | 'sudoku';
}

export const GameStartScreen: React.FC<GameStartScreenProps> = ({
    onStart,
    title,
    icon,
    color,
    gameType,
}) => {
    const { showHelp, setShowHelp } = useHelp();

    const HelpModal = {
        birdle: WordleHowToPlay,
        crossword: CrosswordHowToPlay,
        sudoku: SudokuHowToPlay
    }[gameType];

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                p: 2,
                background: `linear-gradient(180deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.12)} 100%)`,
            }}
        >
            <HelpModal
                open={showHelp}
                onClose={() => setShowHelp(false)}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: 2,
                        '& .MuiSvgIcon-root': {
                            fontSize: 48,
                        },
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                <Button
                    variant="contained"
                    size="large"
                    onClick={onStart}
                    startIcon={<PlayArrow />}
                    sx={{
                        backgroundColor: color,
                        boxShadow: 2,
                        '&:hover': {
                            backgroundColor: color,
                            opacity: 0.9,
                        },
                    }}
                >
                    Start Game
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setShowHelp(true)}
                    startIcon={<HelpOutline />}
                    sx={{
                        borderColor: color,
                        color: color,
                        backgroundColor: 'white',
                        '&:hover': {
                            borderColor: color,
                            backgroundColor: `${color}10`,
                        },
                    }}
                >
                    How to Play
                </Button>
            </Box>
        </Box>
    );
}; 