export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Letter {
    value: string;
    state: LetterState;
}

export interface Guess {
    letters: Letter[];
    isComplete: boolean;
}

export interface GameState {
    guesses: Guess[];
    currentGuess: number;
    isComplete: boolean;
    hasWon: boolean;
    answer: string;
    startTime: number;
} 