import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { Crossword } from './games/crossword/Crossword';
import { Sudoku } from './games/sudoku/Sudoku';
import { Birdle } from './games/birdle/Birdle';

export const AppRoutes: React.FC = () => {
    const location = useLocation();
    const isGamePage = location.pathname !== '/';

    return (
        <Box 
            sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...(isGamePage && {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden'
                })
            }}
        >
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/crossword" element={<Crossword />} />
                <Route path="/sudoku" element={<Sudoku />} />
                <Route path="/birdle" element={<Birdle />} />
                <Route path="/results/:gameId" element={<ResultsPage />} />
            </Routes>
        </Box>
    );
}; 