'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, TextField } from '@mui/material';
import { Add, Save } from '@mui/icons-material';
import { useItemsCollection } from './CollectionPage.utils';
import { ItemsList } from 'components/ItemsList/ItemsList';
import { TItemInCollection } from 'types/TItemInCollection';
import { useCollection } from './CollectionPage.utils';

export const CollectionPage = () => {
    const searchParams = useSearchParams();
    const collectionId = searchParams.get('collectionId');

    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemTags, setNewItemTags] = useState([]);
    const [isCreatingNewItem, setIsCreatingNewItem] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const collectionData = useCollection(collectionId);
    const { items, createItemInCollection, deleteItemInCollection, updateItemInCollection } =
        useItemsCollection();

    const handleSaveNewItem = async () => {
        const itemData: TItemInCollection = {
            collectionId,
            title: newItemTitle,
            tags: newItemTags,
            id: 0,
        };

        await createItemInCollection(itemData);
        setNewItemTitle('');
        setNewItemTags([]);
        setIsCreatingNewItem(false);
    };

    return (
        <>
            <h1>Collection Page</h1>
            <ItemsList
                items={items}
                onDelete={(itemId: number) => deleteItemInCollection(itemId)}
                updateItemInCollection={updateItemInCollection}
                collection={collectionData}
            />
            {isCreatingNewItem || selectedItem ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <TextField
                        label="Title"
                        value={selectedItem ? selectedItem.title : newItemTitle}
                        onChange={(e) => {
                            if (selectedItem) {
                                setSelectedItem({ ...selectedItem, title: e.target.value });
                            } else {
                                setNewItemTitle(e.target.value);
                            }
                        }}
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        label="Tags"
                        value={(selectedItem ? selectedItem.tags : newItemTags).join(', ')}
                        onChange={(e) => {
                            const tags = e.target.value.split(',').map((tag) => tag.trim());
                            if (selectedItem) {
                                setSelectedItem({ ...selectedItem, tags });
                            } else {
                                setNewItemTags(tags);
                            }
                        }}
                        sx={{ mr: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={handleSaveNewItem}
                    >
                        Save
                    </Button>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setIsCreatingNewItem(true)}
                    >
                        Create item
                    </Button>
                </Box>
            )}
        </>
    );
};
