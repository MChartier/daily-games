import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { Crossword } from './games/crossword/Crossword';
import { Sudoku } from './games/sudoku/Sudoku';
import { Birdle } from './games/wordle/Birdle';

export const AppRoutes: React.FC = () => {
    return (
        <Box component="main" sx={{ flex: 1 }}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/daily-games" element={<HomePage />} />
                <Route path="/daily-games/crossword" element={<Crossword />} />
                <Route path="/daily-games/sudoku" element={<Sudoku />} />
                <Route path="/daily-games/birdle" element={<Birdle />} />
                <Route path="/daily-games/results/:gameId" element={<ResultsPage />} />
            </Routes>
        </Box>
    );
}; 