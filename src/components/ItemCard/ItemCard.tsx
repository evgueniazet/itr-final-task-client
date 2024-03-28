import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TItemCardProps } from './ItemCard.types';
import { CustomFields } from 'components/pages/CollectionPage/components';

export const ItemCard = ({ item, onDelete, collection }: TItemCardProps) => {
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
                        Tags: {item.tags.join(', ')}
                    </Typography>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No tags
                    </Typography>
                )}
                <CustomFields item={item} collection={collection} />
            </CardContent>
            <IconButton aria-label="delete" onClick={() => onDelete(item.id)}>
                <DeleteIcon />
            </IconButton>
        </Card>
    );
};
