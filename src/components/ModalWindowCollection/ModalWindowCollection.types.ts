import { TCollection } from 'types/TCollection';
import { TCustomCollection } from 'types/TCustomCollection';

export type TModalWindowCollectionProps = {
    userId: string;
    isModalOpen: boolean;
    categories: TCategory[];
    existingCustomFields: TCustomCollection | {};
    editedCollection: TCollection;
    handleCloseModal: () => void;
    createCollection: (collectionData: TCollection) => void;
    updateCollection: (collectionId: number, updatedFields: Partial<TCollection>) => void;
};

export type TCustomField = {
    id: number;
    fieldName: string;
    type: string;
    name: string;
};

export type TCategory = {
    id: number;
    title: string;
};
