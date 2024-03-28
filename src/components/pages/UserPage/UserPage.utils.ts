import { useState, useEffect } from 'react';
import { TUser } from 'types/TUser';
import { TCollection } from 'types/TCollection';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const useGetUser = (userId: string) => {
    const [user, setUser] = useState<TUser | undefined>();

    const getUserData = async (userId: string) => {
        try {
            const response = await api(requestApi.user({ userId }));

            if (response.data) {
                setUser(response.data);
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getUserData(userId);
    }, []);

    return user;
};

export const useCollections = (userId: string) => {
    const [collections, setCollections] = useState([]);

    const getCollectionsData = async (userId: string) => {
        try {
            const response = await api(requestApi.allCollections({ userId }));

            if (response.data) {
                setCollections(response.data);
            } else {
                console.error('Error fetching collections');
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    };

    const deleteCollection = async (collectionId: number) => {
        try {
            const response = await api(requestApi.deleteCollection({ collectionId }));

            if (response.data) {
                const updatedCollections = collections.filter(
                    (collection) => collection.id !== collectionId,
                );
                setCollections(updatedCollections);
            } else {
                console.error('Error deleting collection');
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    const createCollection = async (collectionData: TCollection) => {
        try {
            const response = await api(
                requestApi.createCollection({
                    ...collectionData,
                }),
            );

            if (response.data) {
                const updatedCollections = [...collections, response.data];
                setCollections(updatedCollections);
            } else {
                console.error('Error creating collection');
            }
        } catch (error) {
            console.error('Error creating collection', error);
        }
    };

    const updateCollection = async (collectionId: number, updatedFields: Partial<TCollection>) => {
        try {
            const response = await api(
                requestApi.updateCollection(updatedFields, { collectionId }),
            );

            if (response.data) {
                const updatedCollections = collections.map((collection) => {
                    if (collection.id === collectionId) {
                        return response.data;
                    }
                    return collection;
                });
                setCollections(updatedCollections);
            } else {
                console.error('Error updating collection');
            }
        } catch (error) {
            console.error('Error updating collection:', error);
        }
    };

    useEffect(() => {
        getCollectionsData(userId);
    }, []);

    return {
        collections,
        deleteCollection,
        createCollection,
        updateCollection,
    };
};
