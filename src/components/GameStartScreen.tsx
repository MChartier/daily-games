import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

interface GameStartScreenProps {
    title: string;
    description: string;
    icon: React.ReactElement<SvgIconComponent>;
    color: string;
    onStart: () => void;
}

export const GameStartScreen: React.FC<GameStartScreenProps> = ({
    title,
    description,
    icon,
    color,
    onStart
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: 'calc(100vh - 56px)',
                '@media (min-width: 600px)': {
                    height: 'calc(100vh - 64px)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(color, 0.1),
                px: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 'sm',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        '& .MuiSvgIcon-root': {
                            fontSize: 48,
                            color: 'white'
                        }
                    }}
                >
                    {icon}
                </Box>

                {/* Title */}
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 2
                    }}
                >
                    {title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 4,
                        maxWidth: 450
                    }}
                >
                    {description}
                </Typography>

                {/* Play Button */}
                <Button
                    variant="contained"
                    size="large"
                    onClick={onStart}
                    sx={{
                        backgroundColor: color,
                        '&:hover': {
                            backgroundColor: alpha(color, 0.9)
                        },
                        px: 6,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1.25rem'
                    }}
                >
                    Play Now
                </Button>
            </Box>
        </Box>
    );
}; 