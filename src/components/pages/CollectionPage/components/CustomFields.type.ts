import { TItemInCollection } from 'types/TItemInCollection';
import { TCollection } from 'types/TCollection';

export type TCustomFieldsProps = {
    item: TItemInCollection;
    collection: TCollection;
    updateItemInCollection: (itemId: number, updatedFields: Partial<TItemInCollection>) => void;
};
