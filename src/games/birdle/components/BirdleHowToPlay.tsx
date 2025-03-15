import { Box, Typography } from '@mui/material';
import React from 'react';
import { HowToPlayModal } from '../../../components/HowToPlayModal';

interface BirdleHowToPlayProps {
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

export const BirdleHowToPlay: React.FC<BirdleHowToPlayProps> = ({ open, onClose }) => {
    return (
        <HowToPlayModal
            open={open}
            onClose={onClose}
            title="How to Play Birdle"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography>
                    Guess the bird-related word in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word.
                </Typography>

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Examples:
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ExampleTile letter="F" state="correct" />
                            <ExampleTile letter="I" state="empty" />
                            <ExampleTile letter="N" state="empty" />
                            <ExampleTile letter="C" state="empty" />
                            <ExampleTile letter="H" state="empty" />
                        </Box>
                        <Typography>
                            F is in the word and in the correct spot.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ExampleTile letter="P" state="empty" />
                            <ExampleTile letter="E" state="present" />
                            <ExampleTile letter="R" state="empty" />
                            <ExampleTile letter="C" state="empty" />
                            <ExampleTile letter="H" state="empty" />
                        </Box>
                        <Typography>
                            E is in the word but in the wrong spot.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ExampleTile letter="S" state="empty" />
                            <ExampleTile letter="W" state="empty" />
                            <ExampleTile letter="I" state="absent" />
                            <ExampleTile letter="F" state="empty" />
                            <ExampleTile letter="T" state="empty" />
                        </Box>
                        <Typography>
                            I is not in the word in any spot.
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