import { useEffect, useState } from 'react';
import { TUser } from 'types/TUser';
import { ERoles } from 'enums/ERoles';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const useUsers = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [users, setUsers] = useState<TUser[] | undefined>();

    useEffect(() => {
        setShowLoader(true);

        api(requestApi.allUsers())
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setShowLoader(false);
            });
    }, []);

    const handleUserBlock = (user: TUser, users: TUser[]) => {
        setShowLoader(true);

        api(
            requestApi.updateUserBlockStatus({
                userId: user.id,
                isBlocked: !user.isBlocked,
            }),
        )
            .then(() => {
                const updatedUsers = users.map((item: TUser) =>
                    item.id === user.id ? { ...item, isBlocked: !user.isBlocked } : item,
                );

                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error('Error updating user block status:', error);
            })
            .finally(() => {
                setShowLoader(false);
            });
    };

    const handleChangeRole = (user: TUser, role: ERoles) => {
        setShowLoader(true);

        api(
            requestApi.updateUserRole({
                userId: user.id,
                newRole: role,
            }),
        )
            .then(() => {
                const newUser = users.map((item: TUser) =>
                    item.id === user.id ? { ...item, role } : item,
                );

                setUsers(newUser);
            })
            .catch((error) => {
                console.error('Error updating user role:', error);
            })
            .finally(() => {
                setShowLoader(false);
            });
    };

    const handleUserDelete = (userIdToDelete: TUser) => {
        setShowLoader(true);

        api(
            requestApi.deleteUser({
                userId: userIdToDelete.id,
            }),
        )
            .then(() => {
                const updatedUsers = users.filter((user) => user.id !== userIdToDelete.id);
                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            })
            .finally(() => {
                setShowLoader(false);
            });
    };

    const getUserData = (id: number) => {
        setShowLoader(true);

        return new Promise((resolve) => {
            api(requestApi.user({ userId: id }))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    setShowLoader(false);
                });
        });
    };

    return {
        users,
        showLoader,
        handleUserBlock,
        handleChangeRole,
        handleUserDelete,
        getUserData,
    };
};
