import { ERoles } from 'enums/ERoles';
import { TCollection } from './TCollection';

export type TUser = {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: ERoles;
    isBlocked: boolean;
    collections?: TCollection[];
};
