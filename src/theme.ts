import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2D3748', // Sophisticated dark blue-grey
            light: '#4A5568',
        },
        secondary: {
            main: '#805AD5', // Vibrant purple
        },
        background: {
            default: '#F7FAFC',
            paper: '#FFFFFF',
        },
        grey: {
            100: '#F7FAFC',
            200: '#EDF2F7',
            300: '#E2E8F0',
            400: '#CBD5E0',
            500: '#A0AEC0',
            600: '#718096',
            700: '#4A5568',
            800: '#2D3748',
            900: '#1A202C',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            '@media (max-width:600px)': {
                fontSize: '2rem',
            },
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            '@media (max-width:600px)': {
                fontSize: '1.75rem',
            },
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            '@media (max-width:600px)': {
                fontSize: '1.25rem',
            },
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            '@media (max-width:600px)': {
                fontSize: '1.1rem',
            },
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.1rem',
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
        subtitle1: {
            fontSize: '1rem',
            '@media (max-width:600px)': {
                fontSize: '0.875rem',
            },
        },
        body1: {
            fontSize: '1rem',
            '@media (max-width:600px)': {
                fontSize: '0.875rem',
            },
        },
        body2: {
            fontSize: '0.875rem',
            '@media (max-width:600px)': {
                fontSize: '0.8125rem',
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
    spacing: (factor: number) => `${0.5 * factor}rem`,
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    '@media (min-width:600px)': {
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '0.625rem 1.5rem',
                    minHeight: '2.75rem',
                    '@media (max-width:600px)': {
                        padding: '0.5rem 1.25rem',
                        minHeight: '2.5rem',
                    },
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
    },
}); 