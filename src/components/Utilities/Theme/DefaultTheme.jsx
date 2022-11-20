import { createTheme } from '@mui/material/styles';

export const DefaultTheme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#EF8E61',
    },
    darkOne: {
      main: '#312f3a',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            color: '#fff',
            borderRadius: '16px',
            transition: '0.3s',
            textTransform: 'none',
            backgroundColor: '#EF8E61',
            '&:hover': {
              backgroundColor: '#ee8352',
              },
        },
      },
      variants: [
        {
          props: { variant: 'menuButton' },
          style: {
            textTransform: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              color: '#ee8352',
              backgroundColor: 'transparent',
              },
            color: '#aaa',
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
