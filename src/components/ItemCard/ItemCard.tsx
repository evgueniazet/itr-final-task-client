import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { TItemCardProps } from './ItemCard.types';
import { CustomFields } from 'components/pages/CollectionPage/components';

export const ItemCard = ({
    item,
    collection,
    onDelete,
    updateItemInCollection,
}: TItemCardProps) => {
    const t = useTranslations('CollectionPage');

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ID: {item.id}
                </Typography>
                {item.tags && item.tags.length > 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        {t('tags')} {item.tags.join(', ')}
                    </Typography>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                       {t('noTags')}
                    </Typography>
                )}
                <CustomFields
                    updateItemInCollection={updateItemInCollection}
                    item={item}
                    collection={collection}
                />
            </CardContent>
            <IconButton aria-label="delete" onClick={() => onDelete(item.id)}>
                <Delete />
            </IconButton>
        </Card>
    );
};
