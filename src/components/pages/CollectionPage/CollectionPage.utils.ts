import { useEffect, useState } from 'react';
import { TItemInCollection } from 'types/TItemInCollection';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const useItemsCollection = () => {
    const [items, setItems] = useState([]);
    const [collection, setCollection] = useState();

    const useGetItemsInCollection = (collectionId: string) => {
        useEffect(() => {
            api(requestApi.allItemsInCollection({ collectionId }))
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
        api(requestApi.createItem({ ...itemData }))
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
        api(requestApi.deleteItem({ itemId }))
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
        api(requestApi.updateItem(updatedFields, { itemId }))
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
            api(requestApi.getCollectionById({ collectionId }))
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
