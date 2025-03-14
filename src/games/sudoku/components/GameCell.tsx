import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Cell } from '../types';

type CornerPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | undefined;

interface GameCellProps {
    cell: Cell;
    isSelected: boolean;
    onClick: () => void;
    isCorner?: boolean;
    cornerPosition?: CornerPosition;
}

export const GameCell: React.FC<GameCellProps> = ({ 
    cell, 
    isSelected, 
    onClick,
    isCorner,
    cornerPosition
}) => {
    const theme = useTheme();

    const getCellColor = () => {
        if (isSelected) return theme.palette.primary.light;
        if (cell.state === 'error') return theme.palette.error.light;
        if (cell.state === 'hint') return theme.palette.info.light;
        return theme.palette.background.paper;
    };

    const getTextColor = () => {
        if (cell.state === 'initial') return theme.palette.text.primary;
        if (cell.state === 'error') return theme.palette.error.main;
        if (cell.state === 'hint') return theme.palette.info.main;
        return theme.palette.primary.main;
    };

    const getCornerRadius = () => {
        if (!isCorner) return 0;
        const radius = theme.shape.borderRadius;
        switch (cornerPosition) {
            case 'topLeft':
                return `${radius}px 0 0 0`;
            case 'topRight':
                return `0 ${radius}px 0 0`;
            case 'bottomLeft':
                return `0 0 0 ${radius}px`;
            case 'bottomRight':
                return `0 0 ${radius}px 0`;
            default:
                return 0;
        }
    };

    return (
        <Box
            onClick={onClick}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: getCellColor(),
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
                borderRadius: getCornerRadius(),
                overflow: 'hidden',
                '&:hover': {
                    bgcolor: isSelected ? 
                        theme.palette.primary.light : 
                        theme.palette.action.hover,
                },
                position: 'relative',
            }}
        >
            {cell.value !== null ? (
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: cell.state === 'initial' ? 600 : 400,
                        color: getTextColor(),
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        lineHeight: 1,
                    }}
                >
                    {cell.value}
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 0,
                        width: '100%',
                        height: '100%',
                        p: 0.25,
                    }}
                >
                    {cell.notes.map((note, index) => (
                        <Typography
                            key={index}
                            variant="caption"
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.6rem', sm: '0.7rem' },
                                lineHeight: 1,
                            }}
                        >
                            {note}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
}; 