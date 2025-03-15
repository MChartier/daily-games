import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { HowToPlayModal } from '../../../components/HowToPlayModal';

interface CrosswordHowToPlayProps {
    open: boolean;
    onClose: () => void;
}

export const CrosswordHowToPlay: React.FC<CrosswordHowToPlayProps> = ({ open, onClose }) => {
    return (
        <HowToPlayModal
            open={open}
            onClose={onClose}
            title="How to Play Crossword"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography>
                    Fill in the crossword puzzle by solving the clues. The puzzle works just like a regular crossword, but with a modern touch interface.
                </Typography>

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        How to Navigate:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <TouchAppIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Tap any square to start entering letters"
                                secondary="The selected word will be highlighted"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <SwapHorizIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Tap the swap button to switch between across and down"
                                secondary="Changes direction for the current word"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon sx={{ display: 'flex', gap: 1 }}>
                                <ArrowBackIcon />
                                <ArrowForwardIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Use the arrows to navigate between clues"
                                secondary="Moves to the previous or next clue in sequence"
                            />
                        </ListItem>
                    </List>
                </Box>

                <Typography>
                    A new puzzle will be available each day. Good luck!
                </Typography>
            </Box>
        </HowToPlayModal>
    );
}; 