import { TCustomField, TCategory } from './ModalWindowCollection.types';
import { TCollectionRequest } from 'types/TCollectionRequest';

export const createCollectionData = (
    categories: TCategory[],
    customFields: TCustomField[],
    requiredFields: TCollectionRequest,
    image: string,
) => {
    const category = categories.find((item) => item.title === requiredFields.category).title;

    const collectionData = {
        ...requiredFields,
        category,
        image,
        ...(customFields.length > 0
            ? Object.assign({}, ...customFields.map((field) => ({ [field.fieldName]: field.name })))
            : {}),
    };

    return collectionData;
};