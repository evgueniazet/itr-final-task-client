import { useEffect, useState } from 'react';
import axios from 'axios';
import { TItemInCollection } from 'types/TItemInCollection';

export const useItemsCollection = () => {
    const [items, setItems] = useState([]);
    const [collection, setCollection] = useState();

    const useGetItemsInCollection = (collectionId: string) => {
        useEffect(() => {
            axios
                .get('http://localhost:3001/items/all-items-in-collection', {
                    params: { collectionId },
                })
                .then((response) => {
                    setItems(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching items in collection:', error);
                });
        }, [collectionId]);

        return items;
    };

    const useCreateItemInCollection = (itemData: TItemInCollection) => {
        axios
            .post('http://localhost:3001/items/create-item', { ...itemData })
            .then((response) => {
                const newItem = { ...itemData, id: response.data.id };
                const updatedItems = [...items, newItem];
                setItems(updatedItems);
            })
            .catch((error) => {
                console.error('Error creating item in collection', error);
            });
    };

    const useDeleteItemInCollection = (itemId: number) => {
        axios
            .post('http://localhost:3001/items/delete-item', { itemId })
            .then(() => {
                const updatedItems = items.filter((item) => item.id !== itemId);
                setItems(updatedItems);
            })
            .catch((error) => {
                console.error('Error deleting item in collection', error);
            });
    };

    const useUpdateItemInCollection = (
        itemId: number,
        updatedFields: Partial<TItemInCollection>,
    ) => {
        axios
            .put(`http://localhost:3001/items/update-item/?itemId=${itemId}`, updatedFields)
            .then(() => {
                const updatedItems = items.map((item) => {
                    if (item.id === itemId) {
                        return { ...item, ...updatedFields };
                    }
                    return item;
                });
                setItems(updatedItems);
            })
            .catch((error) => {
                console.error('Error editing item in collection', error);
            });
    };

    const useGetCollection = (collectionId: string) => {
        useEffect(() => {
            axios
                .get(
                    `http://localhost:3001/collections/get-collection-by-id/?collectionId=${collectionId}`,
                )
                .then((response) => {
                    setCollection(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching items in collection:', error);
                });
        }, []);
        return collection;
    };

    return {
        useGetItemsInCollection,
        useCreateItemInCollection,
        useDeleteItemInCollection,
        useUpdateItemInCollection,
        useGetCollection,
    };
};
