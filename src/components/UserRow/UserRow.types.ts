import { ERoles } from 'enums/index';
import { TUser } from '../../types/TUser';

export type TUserRowProps = {
    user: TUser;
    onRoleChange: (user: TUser, role: ERoles) => void;
    onUserBlock: (user: TUser) => void;
    onUserDelete: (user: TUser) => void;
    onClickUser: (id: number) => void;
};
