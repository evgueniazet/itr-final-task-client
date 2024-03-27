import { Grid } from '@mui/material';
import { ItemCard } from 'components/ItemCard';
import { TItemsListProps } from './ItemsList.types';

export const ItemsList = ({ items, onEdit, onDelete, collection }: TItemsListProps) => {
    if (!items || items.length === 0) {
        return <p>No items to display</p>;
    }

    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid item xs={12} key={item.id}>
                    <ItemCard collection={collection} item={item} onEdit={onEdit} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};