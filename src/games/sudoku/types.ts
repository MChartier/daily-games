export type CellValue = number | null;
export type CellState = 'initial' | 'user' | 'error' | 'hint';

export interface Cell {
    value: CellValue;
    state: CellState;
    notes: number[];
}

export interface GameState {
    board: Cell[][];
    solution: number[][];
    selectedCell: { row: number; col: number } | null;
    isComplete: boolean;
    hasWon: boolean;
    startTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameStats {
    timeSpent: number;
    completed: boolean;
    hintsUsed: number;
    errors: number;
    date: string;
} 