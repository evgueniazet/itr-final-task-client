import { Box, Button, Select, MenuItem, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';
import { TUserRowProps } from './UserRow.types';
import { ERoles, EUserBlockStatuses } from 'enums/index';

export const UserRow = ({
    user,
    onRoleChange,
    onUserBlock,
    onUserDelete,
    onClickUser,
}: TUserRowProps) => {
    const theme = useTheme();
    const t = useTranslations('UsersPage');

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <Typography
                variant="h6"
                sx={{
                    flex: 1,
                    color: theme.palette.text.primary,
                    cursor: 'pointer',
                }}
                onClick={() => onClickUser(user.id)}
            >
                {user.id}
            </Typography>
            <Typography sx={{ flex: 1, color: theme.palette.text.primary }}>{user.name}</Typography>
            <Typography sx={{ flex: 1, color: theme.palette.text.primary }}>
                {user.surname}
            </Typography>
            <Typography sx={{ flex: 1, color: theme.palette.text.primary }}>
                {user.email}
            </Typography>
            <Select
                value={user.role}
                onChange={(e) => onRoleChange(user, e.target.value as ERoles)}
                sx={{ flex: 1, mr: 1 }}
            >
                <MenuItem value={ERoles.ADMIN}> {t('admin')}</MenuItem>
                <MenuItem value={ERoles.USER}>{t('user')}</MenuItem>
            </Select>
            <Button onClick={() => onUserBlock(user)} sx={{ flex: 1 }}>
                {user.isBlocked ? EUserBlockStatuses.UNBLOCK : EUserBlockStatuses.BLOCK}
            </Button>
            <DeleteIcon
                onClick={() => {
                    onUserDelete(user);
                }}
                sx={{ color: theme.palette.text.secondary }}
            />
        </Box>
    );
};
