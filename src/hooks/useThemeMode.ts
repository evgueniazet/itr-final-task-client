import { useEffect, useState } from 'react';

export const useThemeMode = () => {
    const [themeMode, setThemeMode] = useState(true);

    useEffect(() => {
        const currentTheme = localStorage.getItem('themeMode');
        if (currentTheme === 'dark') {
            setThemeMode(true);
        } else {
            setThemeMode(false);
        }
    }, []);

    return { themeMode, setThemeMode };
};
