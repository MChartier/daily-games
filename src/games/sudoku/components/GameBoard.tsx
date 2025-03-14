import React from 'react';
import { Box, Typography } from '@mui/material';
import { Cell } from '../types';
import { alpha } from '@mui/material/styles';

interface GameBoardProps {
    board: Cell[][];
    selectedCell: { row: number; col: number } | null;
    onCellClick: (row: number, col: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
    board,
    selectedCell,
    onCellClick
}) => {
    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                aspectRatio: '1/1',
                border: (theme) => `2px solid ${theme.palette.text.primary}`,
                borderRadius: 1,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gap: 0,
                bgcolor: '#ffffff',
                '& > div': {
                    borderRight: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
                    borderBottom: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
                    '&:nth-of-type(9n)': {
                        borderRight: 'none',
                    },
                    '&:nth-of-type(n+73)': {
                        borderBottom: 'none',
                    },
                    '&:nth-of-type(9n+3), &:nth-of-type(9n+6)': {
                        borderRight: (theme) => `2px solid ${theme.palette.text.primary}`,
                    },
                    '&:nth-of-type(n+19):nth-of-type(-n+27), &:nth-of-type(n+46):nth-of-type(-n+54)': {
                        borderBottom: (theme) => `2px solid ${theme.palette.text.primary}`,
                    },
                },
            }}>
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                        const isInSelectedBox = selectedCell && 
                            Math.floor(rowIndex / 3) === Math.floor(selectedCell.row / 3) && 
                            Math.floor(colIndex / 3) === Math.floor(selectedCell.col / 3);
                        const isInitial = cell.state === 'initial';

                        return (
                            <Box
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => !isInitial && onCellClick(rowIndex, colIndex)}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: (theme) => isSelected 
                                        ? alpha(theme.palette.primary.main, 0.12)
                                        : isInSelectedBox
                                            ? alpha(theme.palette.primary.main, 0.04)
                                            : '#ffffff',
                                    cursor: isInitial ? 'default' : 'pointer',
                                    userSelect: 'none',
                                    '&:hover': !isInitial ? {
                                        bgcolor: (theme) => isSelected 
                                            ? alpha(theme.palette.primary.main, 0.12)
                                            : alpha(theme.palette.primary.main, 0.08),
                                    } : undefined,
                                }}
                            >
                                {cell.value ? (
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: cell.state === 'initial' ? 600 : 400,
                                            color: (theme) => cell.state === 'initial'
                                                ? theme.palette.text.primary 
                                                : theme.palette.primary.main,
                                        }}
                                    >
                                        {cell.value}
                                    </Typography>
                                ) : cell.notes.length > 0 ? (
                                    <Box sx={{
                                        position: 'absolute',
                                        inset: 1,
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 0.25,
                                    }}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                            <Typography
                                                key={num}
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.7rem',
                                                    textAlign: 'center',
                                                    color: (theme) => cell.notes.includes(num) 
                                                        ? theme.palette.text.secondary
                                                        : 'transparent',
                                                }}
                                            >
                                                {num}
                                            </Typography>
                                        ))}
                                    </Box>
                                ) : null}
                            </Box>
                        );
                    })
                )}
            </Box>
        </Box>
    );
}; 