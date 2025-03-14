import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { CheckCircle, Extension, Grid4x4, FlutterDash, GridOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GameInfo, GameType } from '../types/game';
import { gameColors } from '../App';

interface GameCardProps {
    game: GameInfo;
}

const getGameIcon = (gameType: GameType) => {
    switch (gameType) {
        case 'crossword':
            return <GridOn />;
        case 'sudoku':
            return <Grid4x4 />;
        case 'birdle':
            return <FlutterDash sx={{ transform: 'scaleX(-1)' }} />;
        default:
            return null;
    }
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
    const navigate = useNavigate();
    const gameColor = gameColors[game.id];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card 
            sx={{ 
                minWidth: { xs: 'auto', sm: 275 },
                height: '100%',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                    boxShadow: (theme) => theme.shadows[4],
                },
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.08)',
                display: 'flex',
            }}
        >
            <CardActionArea 
                onClick={() => navigate(game.path)}
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    height: '100%'
                }}
            >
                <Box
                    sx={{
                        background: `linear-gradient(45deg, ${gameColor}15, ${gameColor}30)`,
                        pt: { xs: 2, sm: 3 },
                        pb: { xs: 1.5, sm: 2 },
                        px: { xs: 1.5, sm: 2 },
                    }}
                >
                    <Box display="flex" alignItems="center" mb={{ xs: 1, sm: 2 }}>
                        <Avatar
                            sx={{
                                bgcolor: gameColor,
                                width: { xs: 40, sm: 48 },
                                height: { xs: 40, sm: 48 },
                                mr: { xs: 1.5, sm: 2 },
                            }}
                        >
                            {getGameIcon(game.id)}
                        </Avatar>
                        <Typography 
                            variant={isMobile ? "h6" : "h5"} 
                            component="div" 
                            sx={{ 
                                fontWeight: 600,
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                        >
                            {game.title}
                        </Typography>
                        {game.completed && (
                            <CheckCircle 
                                sx={{ 
                                    ml: 'auto',
                                    color: gameColor,
                                    fontSize: { xs: 20, sm: 24 }
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <CardContent 
                    sx={{ 
                        flexGrow: 1, 
                        pt: { xs: 1.5, sm: 2 },
                        pb: { xs: 2, sm: 3 },
                        px: { xs: 1.5, sm: 2 },
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}
                >
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            lineHeight: { xs: 1.4, sm: 1.5 }
                        }}
                    >
                        {game.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}; 