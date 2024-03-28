import { TItemInCollection } from 'types/TItemInCollection';
import { TCollection } from 'types/TCollection';

export type TItemCardProps = {
    item: TItemInCollection;
    collection: TCollection;
    onDelete: (id: number) => void;
    updateItemInCollection: (itemId: number, updatedFields: Partial<TItemInCollection>) => void;
};
