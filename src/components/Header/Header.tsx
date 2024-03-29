import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    useTheme,
    Select,
    MenuItem,
    SelectChangeEvent,
    IconButton,
} from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ELanguages } from 'enums/ELanguages';
import { getLanguageFromUrl } from 'utils/getLanguageFromUrl';
import { useThemeMode } from 'hooks/useThemeMode';

export const Header = () => {
    const router = useRouter();
    const theme = useTheme();
    const { themeMode, setThemeMode } = useThemeMode();
    const pathname = usePathname();
    const query = useSearchParams();
    const language = getLanguageFromUrl(pathname);
    const t = useTranslations('Header');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        router.push(`/${language}/signin`);
        setIsLoggedIn(true);
    };

    const handleSignUp = () => {
        router.push(`/${language}/signup`);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
        const selectedLanguage = event.target.value as ELanguages;
        const newURL = `${pathname.replace(/^\/(en|ru)/, `/${selectedLanguage}`)}?${query}`;

        router.push(newURL);
    };

    const handleUsers = () => {
        router.push(`/${language}/users`);
    };

    const toggleTheme = () => {
        setThemeMode(!themeMode);
        if (themeMode) {
            localStorage.setItem('themeMode', 'dark');
        } else {
            localStorage.setItem('themeMode', 'light');
        }
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                flexGrow: 1,
                backgroundColor: themeMode
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
            }}
        >
            <Toolbar>
                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        {t('logout')}
                    </Button>
                ) : (
                    <>
                        <Button
                            sx={{
                                color: themeMode
                                    ? theme.palette.primary.contrastText
                                    : theme.palette.secondary.contrastText,
                            }}
                            onClick={handleLogin}
                        >
                            {t('login')}
                        </Button>
                        <Button
                            sx={{
                                marginLeft: 'auto',
                                color: themeMode
                                    ? theme.palette.primary.contrastText
                                    : theme.palette.secondary.contrastText,
                            }}
                            onClick={handleSignUp}
                        >
                            {t('register')}
                        </Button>
                    </>
                )}
                <Button
                    sx={{
                        color: themeMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.secondary.contrastText,
                    }}
                    onClick={handleUsers}
                >
                    {t('users')}
                </Button>
                <IconButton
                    sx={{
                        ml: 2,
                        color: themeMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.secondary.contrastText,
                    }}
                    onClick={toggleTheme}
                >
                    {themeMode ? <LightIcon /> : <DarkIcon />}
                </IconButton>
                <Select
                    value={language}
                    onChange={handleChangeLanguage}
                    variant="outlined"
                    sx={{
                        ml: 2,
                        color: themeMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.secondary.contrastText,
                    }}
                >
                    <MenuItem value={ELanguages.ENGLISH}>English</MenuItem>
                    <MenuItem value={ELanguages.RUSSIAN}>Русский</MenuItem>
                </Select>
            </Toolbar>
        </AppBar>
    );
};
