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
    allUsers: () => ({
        method: ERequestMethodType.GET,
        url: '/users/all-users',
    }),
    updateUserBlockStatus: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/users/update-user-block-status',
        data,
    }),
    updateUserRole: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/users/update-user-role',
        data,
    }),
    deleteUser: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/users/delete-user',
        data,
    }),
    user: (params: any) => ({
        method: ERequestMethodType.GET,
        url: '/users/user',
        params,
    }),
    allItemsInCollection: (params: any) => ({
        method: ERequestMethodType.GET,
        url: '/items/all-items-in-collection',
        params,
    }),
    createItem: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/items/create-item',
        data,
    }),
    deleteItem: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/items/delete-item',
        data,
    }),
    updateItem: (data: any, params: any) => ({
        method: ERequestMethodType.PUT,
        url: '/items/update-item',
        data,
        params
    }),
    getCollectionById: (params: any) => ({
        method: ERequestMethodType.GET,
        url: '/collections/get-collection-by-id',
        params,
    }),
    allCollections: (params: any) => ({
        method: ERequestMethodType.GET,
        url: '/collections/all-collections',
        params,
    }),
    deleteCollection: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/collections/delete-collection',
        data,
    }),
    createCollection: (data: any) => ({
        method: ERequestMethodType.POST,
        url: '/collections/create-collection',
        data,
    }),
    updateCollection: (data: any, params: any) => ({
        method: ERequestMethodType.PUT,
        url: '/collections/update-collection',
        data,
        params
    }),
    allCategories: () => ({
        method: ERequestMethodType.GET,
        url: '/categories/all-categories',
    }),


};
