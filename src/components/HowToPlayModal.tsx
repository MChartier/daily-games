import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';
import React from 'react';

interface HowToPlayModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
    open,
    onClose,
    title,
    children,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 1,
                }
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pb: 1
            }}>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Got it!
                </Button>
            </DialogActions>
        </Dialog>
    );
}; 