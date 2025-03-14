export type Direction = 'across' | 'down';

export interface CrosswordCell {
    letter: string | null;
    isBlack: boolean;
    number?: number;
    isRevealed?: boolean;
}

export interface CrosswordClue {
    number: number;
    direction: Direction;
    clue: string;
    answer: string;
}

export interface GameState {
    board: CrosswordCell[][];
    clues: CrosswordClue[];
    selectedCell: { row: number; col: number } | null;
    activeClue: { number: number; direction: Direction } | null;
    isComplete: boolean;
    startTime: number;
    endTime?: number;
}

export interface GameStats {
    timeSpent: number;
    isComplete: boolean;
    date: string;
} 