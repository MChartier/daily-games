import { Box, Typography } from '@mui/material';
import React from 'react';
import { HowToPlayModal } from '../../../components/HowToPlayModal';

interface WordleHowToPlayProps {
    open: boolean;
    onClose: () => void;
}

const ExampleTile: React.FC<{ letter: string; state: 'correct' | 'present' | 'absent' | 'empty' }> = ({ letter, state }) => {
    const getBgColor = () => {
        switch (state) {
            case 'correct': return '#6aaa64';
            case 'present': return '#c9b458';
            case 'absent': return '#787c7e';
            default: return '#ffffff';
        }
    };

    return (
        <Box
            sx={{
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid',
                borderColor: state === 'empty' ? '#d3d6da' : getBgColor(),
                backgroundColor: getBgColor(),
                borderRadius: 1,
                m: 0.5,
            }}
        >
            <Typography variant="h6" sx={{ color: state === 'empty' ? 'text.primary' : '#ffffff' }}>
                {letter}
            </Typography>
        </Box>
    );
};

export const WordleHowToPlay: React.FC<WordleHowToPlayProps> = ({ open, onClose }) => {
    return (
        <HowToPlayModal
            open={open}
            onClose={onClose}
            title="How to Play Wordle"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography>
                    Guess the word in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word.
                </Typography>

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Examples:
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ExampleTile letter="W" state="correct" />
                            <ExampleTile letter="E" state="empty" />
                            <ExampleTile letter="A" state="empty" />
                            <ExampleTile letter="R" state="empty" />
                            <ExampleTile letter="Y" state="empty" />
                        </Box>
                        <Typography>
                            W is in the word and in the correct spot.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ExampleTile letter="P" state="empty" />
                            <ExampleTile letter="I" state="present" />
                            <ExampleTile letter="L" state="empty" />
                            <ExampleTile letter="O" state="empty" />
                            <ExampleTile letter="T" state="empty" />
                        </Box>
                        <Typography>
                            I is in the word but in the wrong spot.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ExampleTile letter="V" state="empty" />
                            <ExampleTile letter="A" state="empty" />
                            <ExampleTile letter="G" state="absent" />
                            <ExampleTile letter="U" state="empty" />
                            <ExampleTile letter="E" state="empty" />
                        </Box>
                        <Typography>
                            G is not in the word in any spot.
                        </Typography>
                    </Box>
                </Box>

                <Typography>
                    A new word will be available each day!
                </Typography>
            </Box>
        </HowToPlayModal>
    );
}; 