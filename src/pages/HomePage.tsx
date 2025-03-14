import React from 'react';
import { Box, Typography, Grid, Container, useTheme, useMediaQuery } from '@mui/material';
import { GameCard } from '../components/GameCard';
import { GameInfo } from '../types/game';

const games: GameInfo[] = [
    {
        id: 'crossword',
        title: 'Crossword',
        description: 'Challenge yourself with our daily crossword puzzle. Test your vocabulary and wit.',
        completed: false,
        path: '/games/crossword'
    },
    {
        id: 'sudoku',
        title: 'Sudoku',
        description: 'Exercise your brain with our daily number puzzle. Logic and strategy combined.',
        completed: false,
        path: '/games/sudoku'
    },
    {
        id: 'birdle',
        title: 'Birdle',
        description: 'Guess the hidden bird species in six tries. A new feathered friend each day.',
        completed: false,
        path: '/games/birdle'
    }
];

export const HomePage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <Container maxWidth="lg">
                <Box 
                    sx={{ 
                        py: { xs: 2, sm: 3, md: 6 },
                        textAlign: 'center'
                    }}
                >
                    <Typography 
                        variant={isMobile ? "h4" : "h3"} 
                        component="h1" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: { xs: 1, sm: 2 },
                            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Daily Games
                    </Typography>
                    <Typography 
                        variant="subtitle1"
                        component="h2" 
                        sx={{ 
                            mb: { xs: 3, sm: 4 },
                            color: 'text.secondary',
                            maxWidth: 500,
                            mx: 'auto',
                            px: 2,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                    >
                        A new puzzle every day to challenge your mind
                    </Typography>

                    <Grid 
                        container 
                        spacing={{ xs: 2, sm: 3 }}
                        sx={{ 
                            mt: { xs: 1, sm: 2 }
                        }}
                    >
                        {games.map((game) => (
                            <Grid item xs={12} sm={6} md={4} key={game.id}>
                                <GameCard game={game} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}; 