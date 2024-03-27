import { TItemInCollection } from 'types/TItemInCollection';
import { TCollection } from 'types/TCollection';

export type TItemsListProps = {
    items: TItemInCollection[];
    onEdit: (item: TItemInCollection) => void;
    onDelete: (id: number) => void;
    collection: TCollection;
};