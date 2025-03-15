import { Cell } from '../games/sudoku/types';
import { Guess } from '../games/birdle/types';

export type GameType = 'crossword' | 'sudoku' | 'birdle';

export interface GameInfo {
    id: GameType;
    title: string;
    description: string;
    completed: boolean;
    path: string;
}

export interface GameResult {
    timeSpent: number;
    completed: boolean;
    won: boolean;
    score?: number;
    date?: string;
    // Game-specific fields
    board?: Cell[][] | Guess[];
    hintsUsed?: number;
    errors?: number;
    attempts?: number;
    answer?: string;
} 