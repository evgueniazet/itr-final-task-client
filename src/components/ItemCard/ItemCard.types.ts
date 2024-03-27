import { TItemInCollection } from 'types/TItemInCollection';
import { TCollection } from 'types/TCollection';

export type TItemCardProps = {
    item: TItemInCollection;
    onEdit: (item: TItemInCollection) => void;
    onDelete: (id: number) => void;
    collection: TCollection;
};
