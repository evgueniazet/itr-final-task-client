import { TItemInCollection } from 'types/TItemInCollection';
import { TCollection } from 'types/TCollection';

export type TItemsListProps = {
    items: TItemInCollection[];
    onDelete: (id: number) => void;
    collection: TCollection;
};