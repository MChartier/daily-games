import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { HowToPlayModal } from '../../../components/HowToPlayModal';

interface SudokuHowToPlayProps {
    open: boolean;
    onClose: () => void;
}

const ExampleGrid: React.FC = () => {
    return (
        <Grid container spacing={0.5} sx={{ width: 'fit-content', border: 2, borderColor: 'primary.main', p: 1 }}>
            {[1, 2, 3].map((row) => (
                <Grid container item key={row} spacing={0.5} >
                    {[1, 2, 3].map((col) => (
                        <Grid item key={col}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: 1,
                                    borderColor: 'grey.400',
                                    backgroundColor: row === 2 && col === 2 ? 'primary.light' : 'background.paper',
                                }}
                            >
                                <Typography variant="body1">
                                    {row === 2 && col === 2 ? '5' : ''}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export const SudokuHowToPlay: React.FC<SudokuHowToPlayProps> = ({ open, onClose }) => {
    return (
        <HowToPlayModal
            open={open}
            onClose={onClose}
            title="How to Play Sudoku"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography>
                    Fill in the 9×9 grid with numbers so that each row, column, and 3×3 box contains all of the digits from 1 to 9.
                </Typography>

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Rules:
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                        <ListItem sx={{ display: 'list-item' }}>
                            <ListItemText primary="Each row must contain the numbers 1-9 without repetition" />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            <ListItemText primary="Each column must contain the numbers 1-9 without repetition" />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            <ListItemText primary="Each 3×3 box must contain the numbers 1-9 without repetition" />
                        </ListItem>
                    </List>
                </Box>

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        How to Play:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', mb: 2 }}>
                        <ExampleGrid />
                        <Typography>
                            Tap any empty cell to select it, then use the number pad to enter a value.
                        </Typography>
                    </Box>
                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                        <ListItem sx={{ display: 'list-item' }}>
                            <ListItemText primary="Pre-filled numbers cannot be changed" />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            <ListItemText primary="Invalid entries will be highlighted in red" />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            <ListItemText primary="Use the pencil mode to make notes in cells" />
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