import { useState, useEffect } from 'react';
import { TUser } from 'types/TUser';
import { TCollection } from 'types/TCollection';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const useUser = () => {
    const [user, setUser] = useState<TUser | undefined>();
    const [collections, setCollections] = useState([]);

    const useGetUserData = (userId: string) => {
        useEffect(() => {
            api(requestApi.user({ userId }))
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }, [userId]);

        return user;
    };

    const useGetUserCollections = (userId: string) => {
        useEffect(() => {
            api(requestApi.allCollections({ userId }))
                .then((response) => {
                    setCollections(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching collections:', error);
                });
        }, [userId]);

        return collections;
    };

    const deleteCollection = (collectionId: number) => {
        api(requestApi.deleteCollection({ collectionId }))
            .then(() => {
                const updatedCollections = collections.filter(
                    (collection) => collection.id !== collectionId,
                );
                setCollections(updatedCollections);
            })
            .catch((error) => {
                console.error('Error deleting collection:', error);
            });
    };

    const createCollection = (collectionData: TCollection) => {
        api(
            requestApi.createCollection({
                ...collectionData,
            }),
        )
            .then(() => {
                const updatedCollections = [...collections, collectionData];
                setCollections(updatedCollections);
            })
            .catch((error) => {
                console.error('Error creating collection', error);
            });
    };

    const updateCollection = (collectionId: number, updatedFields: Partial<TCollection>) => {
        api(requestApi.updateCollection(updatedFields, { collectionId }))
            .then(() => {
                const updatedCollections = collections.map((collection) => {
                    if (collection.id === collectionId) {
                        return { ...collection, ...updatedFields };
                    }
                    return collection;
                });
                setCollections(updatedCollections);
            })
            .catch((error) => {
                console.error('Error updating collection:', error);
            });
    };

    return {
        useGetUserData,
        useGetUserCollections,
        deleteCollection,
        createCollection,
        updateCollection,
    };
};
