import React from 'react';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { BackspaceOutlined, EditOutlined, LightbulbOutlined } from '@mui/icons-material';

interface NumberPadProps {
    onNumberClick: (number: number) => void;
    onNoteClick: (number: number) => void;
    onErase: () => void;
    onHint: () => void;
    isNoteMode: boolean;
    onToggleNoteMode: () => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({
    onNumberClick,
    onNoteClick,
    onErase,
    onHint,
    isNoteMode,
    onToggleNoteMode
}) => {
    const handleClick = (number: number) => {
        if (isNoteMode) {
            onNoteClick(number);
        } else {
            onNumberClick(number);
        }
    };

    const buttonStyle = {
        width: '100%',
        height: '100%',
        bgcolor: 'action.hover',
        borderRadius: 1,
        '&:hover': {
            bgcolor: 'action.selected',
        },
    };

    return (
        <Grid 
            container 
            rowSpacing={1.5} 
            columnSpacing={1.5} 
            sx={{ 
                width: '100%',
                height: '100%',
                maxWidth: '320px',
                maxHeight: '240px',
                mx: 'auto',
                '& .MuiGrid-item': {
                    height: 'calc((100% - 32px) / 4)', // (container height - total gap) / number of rows
                    display: 'flex',
                },
                '& .MuiIconButton-root': {
                    flex: 1,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                },
                '& .MuiSvgIcon-root': {
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                },
            }}
        >
            {/* Numbers */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                <Grid item xs={4} key={number}>
                    <IconButton
                        onClick={() => handleClick(number)}
                        sx={buttonStyle}
                    >
                        {number}
                    </IconButton>
                </Grid>
            ))}

            {/* Controls */}
            <Grid item xs={4}>
                <IconButton
                    onClick={onToggleNoteMode}
                    color={isNoteMode ? 'primary' : 'default'}
                    sx={buttonStyle}
                >
                    <EditOutlined />
                </IconButton>
            </Grid>
            <Grid item xs={4}>
                <IconButton
                    onClick={onErase}
                    sx={buttonStyle}
                >
                    <BackspaceOutlined />
                </IconButton>
            </Grid>
            <Grid item xs={4}>
                <IconButton
                    onClick={onHint}
                    sx={buttonStyle}
                >
                    <LightbulbOutlined />
                </IconButton>
            </Grid>
        </Grid>
    );
}; 