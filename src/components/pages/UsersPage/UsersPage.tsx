'use client';

import { Typography, Box, CircularProgress, Backdrop, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { UserRow } from 'components/UserRow';
import { TUser } from 'types/TUser';
import { useUsers } from './UsersPage.utils';
import { getLanguageFromUrl } from 'utils/getLanguageFromUrl';

export const UsersPage = () => {
    const theme = useTheme();
    const t = useTranslations('UsersPage');
    const { users, showLoader, handleUserBlock, handleChangeRole, handleUserDelete } = useUsers();
    const router = useRouter();
    const pathname = usePathname();

    const handleClickUser = (id: number) => {
        const language = getLanguageFromUrl(pathname);
        const newUrl = `/${language}/user?userId=${id}`;

        router.push(newUrl);
    };

    return (
        <>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: 'center', color: theme.palette.text.primary, mt: 2.5 }}
            >
                {t('title')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('id')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('name')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('surname')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('email')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('role')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('blockStatus')}
                </Typography>
            </Box>

            {users?.map((user: TUser) => (
                <UserRow
                    key={user.id}
                    user={user}
                    onRoleChange={handleChangeRole}
                    onUserBlock={() => handleUserBlock(user, users)}
                    onUserDelete={() => handleUserDelete(user)}
                    onClickUser={() => handleClickUser(user.id)}
                />
            ))}
            <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};
