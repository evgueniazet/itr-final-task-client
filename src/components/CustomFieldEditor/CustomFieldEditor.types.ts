import { Dispatch, SetStateAction } from 'react';
import { TCustomField } from 'components/ModalWindowCollection/ModalWindowCollection.types';
import { TCustomCollection } from 'types/TCustomCollection';

export type TCustomFieldEditorProps = {
    customFields: TCustomField[];
    existingCustomFields: TCustomCollection | {};
    setCustomFields: Dispatch<SetStateAction<TCustomField[]>>;
};