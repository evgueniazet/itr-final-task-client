'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { useGetUser, useCollections } from './UserPage.utils';
import { ModalWindowCollection } from '../../ModalWindowCollection';
import { Image } from 'components/Image';
import { MarkdownEditor } from 'components/MarkdownEditor';
import { useGetCategories } from 'hooks/useGetCategories';
import { TCustomCollection } from 'types/TCustomCollection';
import { TCollection } from 'types/TCollection';
import { getLanguageFromUrl } from 'utils/getLanguageFromUrl';

export const UserPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations('UserPage');
    const userId = searchParams.get('userId');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedCollection, setEditedCollection] = useState<TCollection | null>(null);
    const [existingCustomFieldsObj, setExistingCustomFields] = useState<TCustomCollection | {}>();

    const user = useGetUser(userId);
    const { collections, deleteCollection, createCollection, updateCollection } =
        useCollections(userId);
    const categories = useGetCategories();

    const existingCustomFields =
        collections.length > 0
            ? collections.map((collection) => {
                  const customKeysAndValues = Object.entries(collection)
                      .filter(([key, value]) => key.includes('custom') && value !== null)
                      .reduce((acc: Record<string, any>, [key, value]) => {
                          acc[key] = value;
                          return acc;
                      }, {});

                  return customKeysAndValues;
              })
            : [];

    const handleEditCollection = (collectionId: number, index: number) => {
        const editedCollection = collections.find((collection) => collection.id === collectionId);

        setEditedCollection(editedCollection);
        setIsModalOpen(true);
        setExistingCustomFields(existingCustomFields[index]);
    };

    const handleCollectionClick = (collectionId: number) => {
        const language = getLanguageFromUrl(pathname);
        const newUrl = `/${language}/collection?collectionId=${collectionId}`;
        router.push(newUrl);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                mt: 4,
            }}
        >
            <Typography
                sx={{ display: 'flex', justifyContent: 'center' }}
                variant="h3"
                component="h3"
            >
                {t('title')}
            </Typography>

            <Container
                sx={{
                    flexDirection: 'row',
                }}
            >
                {user && (
                    <Box>
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 3,
                                textDecoration: 'underline',
                            }}
                            variant="h5"
                            component="h5"
                        >
                            {t('userInfoTitle')}
                        </Typography>
                        <Container sx={{ mt: 3 }}>
                            <Typography variant="subtitle1">
                                {t('name')} {user.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                {t('surname')} {user.surname}
                            </Typography>
                            <Typography variant="subtitle1">
                                {t('id')} {user.id}
                            </Typography>
                            <Typography variant="subtitle1">
                                {t('email')} {user.email}
                            </Typography>
                            <Typography variant="subtitle1">
                                {t('role')} {user.role}
                            </Typography>
                        </Container>

                        <Box sx={{ mt: 3 }}>
                            <Typography
                                variant="h5"
                                component="h5"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 3,
                                    textDecoration: 'underline',
                                }}
                            >
                                {t('collectionsTitle')}
                            </Typography>
                            <Container>
                                {collections.length === 0 ? (
                                    <Typography
                                        sx={{ textAlign: 'center', mt: 3 }}
                                        variant="subtitle1"
                                    >
                                        {t('noCollectionsMessage')}
                                    </Typography>
                                ) : (
                                    collections.map((collection: TCollection, i: number) => (
                                        <Box
                                            key={collection.id}
                                            sx={{
                                                mt: 3,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Container>
                                                <Typography
                                                    onClick={() => {
                                                        handleCollectionClick(collection.id);
                                                    }}
                                                    variant="subtitle1"
                                                >
                                                    {t('collectionName')} {collection.title}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    {t('collectionCategory')}
                                                    {collection.category}
                                                </Typography>
                                                {t('collectionDescription')}
                                                <MarkdownEditor
                                                    markdownText={collection.description}
                                                ></MarkdownEditor>
                                            </Container>

                                            <Image imageUrl={collection.image}></Image>
                                            <Box>
                                                <IconButton
                                                    onClick={() =>
                                                        handleEditCollection(collection.id, i)
                                                    }
                                                    aria-label="edit"
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        deleteCollection(collection.id);
                                                    }}
                                                    aria-label="delete"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Container>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => {
                                        setIsModalOpen(true);
                                    }}
                                >
                                    {t('createCollectionButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Container>
            <ModalWindowCollection
                userId={userId}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                }}
                categories={categories}
                editedCollection={editedCollection}
                existingCustomFields={existingCustomFieldsObj}
                createCollection={createCollection}
                updateCollection={updateCollection}
            />
        </Box>
    );
};
