'use client';

import React, { PropsWithChildren } from 'react';
import { createTheme, ThemeProvider as ThemeProviderBase } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#222',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            contrastText: '#222',
        },
    },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>;
};
