import { Grid, Box } from '@mui/material';
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
        return <Box sx={{ mt: 2, textAlign: 'center' }}> {t('noItems')}</Box>;
    }

    return (
        <Grid sx={{ mt: 2 }} container spacing={2}>
            {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ marginBottom: 2 }}>
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
