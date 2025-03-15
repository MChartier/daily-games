import { Box, Button, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GitHub, Extension, GridOn, FlutterDash } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gameColors } from '../App';

export const HomePage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const games = [
        {
            id: 'crossword',
            title: 'Crossword',
            description: 'Challenge yourself with our daily crossword puzzle. Test your vocabulary and wit.',
            icon: <Extension />,
            color: gameColors.crossword,
            path: '/crossword'
        },
        {
            id: 'sudoku',
            title: 'Sudoku',
            description: 'Exercise your brain with our daily number puzzle. Logic and strategy combined.',
            icon: <GridOn />,
            color: gameColors.sudoku,
            path: '/sudoku'
        },
        {
            id: 'birdle',
            title: 'Birdle',
            description: 'Guess the hidden bird species in six tries. A new feathered friend each day.',
            icon: <FlutterDash />,
            color: gameColors.birdle,
            path: '/birdle'
        }
    ];

    return (
        <Box sx={{ minHeight: 'calc(100vh - 57px)' }}>
            {/* Hero Section with Game Buttons */}
            <Box 
                sx={{ 
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    py: { xs: 4, sm: 6 },
                    px: 2,
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography 
                        variant={isMobile ? "h3" : "h2"} 
                        component="h1" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 700,
                            mb: { xs: 2, sm: 3 },
                            fontSize: { xs: '2rem', sm: '3rem' }
                        }}
                    >
                        Daily Games
                    </Typography>
                    <Typography 
                        variant="h6"
                        component="h2" 
                        sx={{ 
                            mb: { xs: 3, sm: 4 },
                            opacity: 0.9,
                            maxWidth: 600,
                            mx: 'auto',
                            fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                    >
                        Challenge yourself with our collection of daily puzzles
                    </Typography>

                    {/* Game Buttons */}
                    <Grid 
                        container 
                        rowSpacing={2}
                        sx={{ 
                            maxWidth: 'md',
                            mx: 'auto',
                            mb: { xs: 2, sm: 3 }
                        }}
                    >
                        {games.map((game) => (
                            <Grid item xs={12} sm={4} key={game.id}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={game.icon}
                                    onClick={() => navigate(game.path)}
                                    sx={{
                                        bgcolor: game.color,
                                        '&:hover': {
                                            bgcolor: theme.palette.mode === 'light' 
                                                ? `${game.color}dd`
                                                : `${game.color}bb`,
                                        },
                                        py: { xs: 1.5, sm: 2 },
                                        borderRadius: 2,
                                    }}
                                >
                                    {game.title}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Project Information Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                            About This Project
                        </Typography>
                        <Typography paragraph>
                            Daily Games is an experimental project showcasing rapid prototyping and development using AI-assisted tools. Built with React, TypeScript, and Material-UI, it demonstrates modern web development practices while providing engaging daily puzzles.
                        </Typography>
                        <Typography paragraph>
                            The entire project was developed using AI pair programming, leveraging tools like Claude AI, GitHub Copilot, and Cursor IDE to accelerate development while maintaining high code quality.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<GitHub />}
                            href="https://github.com/mchartier/daily-games"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 2 }}
                        >
                            View on GitHub
                        </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                            Features
                        </Typography>
                        <Typography component="ul" sx={{ pl: 2 }}>
                            {[
                                'Three engaging puzzle games updated daily',
                                'Clean, modern UI with responsive design',
                                'Dark mode support',
                                'Progress tracking and statistics',
                                'Keyboard support for all games',
                                'Helpful tutorials and guides'
                            ].map((feature, index) => (
                                <Typography component="li" key={index} paragraph>
                                    {feature}
                                </Typography>
                            ))}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}; 