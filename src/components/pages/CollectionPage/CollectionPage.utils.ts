import { useEffect, useState } from 'react';
import { TItemInCollection } from 'types/TItemInCollection';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const useItemsCollection = (collectionId: string) => {
    const [items, setItems] = useState([]);

    const getCollectionItems = async (collectionId: string) => {
        try {
            const response = await api(requestApi.allItemsInCollection({ collectionId }));

            if (response.data) {
                setItems(response.data);
            } else {
                console.error('Error fetching items in collection');
            }
        } catch (error) {
            console.error('Error fetching items in collection:', error);
        }
    };

    const createItemInCollection = async (itemData: TItemInCollection) => {
        try {
            const response = await api(requestApi.createItem(itemData));

            if (response.data) {
                const updatedItems = [...items, response.data];

                setItems(updatedItems);
            } else {
                console.error('Error creating item in collection');
            }
        } catch (error) {
            console.error('Error creating item in collection', error);
        }
    };

    const deleteItemInCollection = async (itemId: number) => {
        try {
            const response = await api(requestApi.deleteItem({ itemId }));

            if (response.data) {
                const updatedItems = items.filter((item) => item.id !== itemId);
                setItems(updatedItems);
            } else {
                console.error('Error deleting item in collection');
            }
        } catch (error) {
            console.error('Error deleting item in collection', error);
        }
    };

    const updateItemInCollection = async (
        itemId: number,
        updatedFields: Partial<TItemInCollection>,
    ) => {
        try {
            const response = await api(requestApi.updateItem(updatedFields, { itemId }));

            if (response.data) {
                const updatedItems = items.map((item) => {
                    if (item.id === itemId) {
                        return response.data;
                    }
                    return item;
                });
                setItems(updatedItems);
            } else {
                console.error('Error editing item in collection');
            }
        } catch (error) {
            console.error('Error editing item in collection', error);
        }
    };

    useEffect(() => {
        getCollectionItems(collectionId);
    }, [collectionId]);

    return {
        items,
        getCollectionItems,
        createItemInCollection,
        deleteItemInCollection,
        updateItemInCollection,
    };
};

export const useCollection = (collectionId: string) => {
    const [collection, setCollection] = useState();

    const getCollection = async (collectionId: string) => {
        try {
            const response = await api(requestApi.getCollectionById({ collectionId }));
            if (response.data) {
                setCollection(response.data);
            } else {
                console.error('Error fetching items in collection');
            }
        } catch (error) {
            console.error('Error fetching items in collection:', error);
        }
    };

    useEffect(() => {
        getCollection(collectionId);
    }, [collectionId]);

    return collection;
};
