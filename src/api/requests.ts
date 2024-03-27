import { TAuth } from 'types/TAuth';
import { ERequestMethodType } from 'enums/ERequestMethodType';

export const requestApi = {
    register: (data: TAuth) => ({
        method: ERequestMethodType.POST,
        url: '/users/register',
        data,
    }),
    login: (data: TAuth) => ({
        method: ERequestMethodType.POST,
        url: '/users/login',
        data,
    }),
};