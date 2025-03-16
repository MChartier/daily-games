import {
    Close as CloseIcon,
    Extension,
    FlutterDash,
    Grid3x3,
    HelpOutline,
    Menu as MenuIcon,
    Psychology
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gameColors } from '../App';
import { useHelp } from '../contexts/HelpContext';

const games = [
    { id: 'crossword', name: 'Crossword', icon: <Extension /> },
    { id: 'sudoku', name: 'Sudoku', icon: <Grid3x3 /> },
    { id: 'birdle', name: 'Birdle', icon: <FlutterDash sx={{ transform: 'scaleX(-1)' }} /> }
];

export const Header: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { setShowHelp } = useHelp();

    const getCurrentGame = () => {
        const path = location.pathname.split('/')[1];
        return games.find(game => game.id === path);
    };

    const currentGame = getCurrentGame();
    const isGamePage = !!currentGame;

    const handleGameClick = (gameId: string) => {
        navigate(`/${gameId}`);
        if (isMobile) {
            setDrawerOpen(false);
        }
    };

    const renderGameButtons = () => (
        games.map(game => (
            <Button
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                startIcon={game.icon}
                sx={{
                    color: currentGame?.id === game.id 
                        ? gameColors[game.id as keyof typeof gameColors]
                        : 'white',
                    fontWeight: currentGame?.id === game.id ? 600 : 400,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                {game.name}
            </Button>
        ))
    );

    const renderDrawerContent = () => (
        <List sx={{ width: 250 }}>
            <ListItem 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    px: 2,
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            '& .MuiTypography-root, & .MuiSvgIcon-root': {
                                color: 'primary.dark'
                            }
                        }
                    }}
                    onClick={() => {
                        navigate('/');
                        setDrawerOpen(false);
                    }}
                >
                    <Psychology sx={{ color: 'primary.main', transition: 'color 0.2s' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            transition: 'color 0.2s'
                        }}
                    >
                        Daily Games
                    </Typography>
                </Box>
                <IconButton 
                    onClick={() => setDrawerOpen(false)}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            </ListItem>
            {games.map(game => (
                <ListItem key={game.id}>
                    <ListItemButton
                        onClick={() => handleGameClick(game.id)}
                        sx={{
                            color: currentGame?.id === game.id 
                                ? gameColors[game.id as keyof typeof gameColors]
                                : 'text.secondary',
                            fontWeight: currentGame?.id === game.id ? 600 : 400,
                        }}
                    >
                        <ListItemIcon sx={{
                            color: currentGame?.id === game.id 
                                ? gameColors[game.id as keyof typeof gameColors]
                                : 'text.secondary',
                        }}>
                            {game.icon}
                        </ListItemIcon>
                        <ListItemText primary={game.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <AppBar 
            position="static"
            sx={{ borderRadius: 0 }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                            {currentGame?.name || 'Daily Games'}
                        </Typography>
                        {isGamePage && (
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={() => setShowHelp(true)}
                            >
                                <HelpOutline />
                            </IconButton>
                        )}
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography
                                variant="h6"
                                component="div"
                                onClick={() => navigate('/')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': { opacity: 0.8 }
                                }}
                            >
                                Daily Games
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {renderGameButtons()}
                            </Box>
                        </Box>
                    </>
                )}
            </Toolbar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                {renderDrawerContent()}
            </Drawer>
        </AppBar>
    );
}; 