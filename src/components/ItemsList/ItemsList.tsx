import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ItemCard } from 'components/ItemCard';
import { TItemsListProps } from './ItemsList.types';

export const ItemsList = ({
    items,
    collection,
    onDelete,
    updateItemInCollection,
}: TItemsListProps) => {
    const t = useTranslations('CollectionPage');

    if (!items || items.length === 0) {
        return <p> {t('noItems')}</p>;
    }

    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid item xs={12} key={item.id}>
                    <ItemCard
                        collection={collection}
                        item={item}
                        onDelete={onDelete}
                        updateItemInCollection={updateItemInCollection}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
