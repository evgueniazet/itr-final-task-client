import { ECustomFieldsTypes } from 'enums/ECustomFieldsTypes';

export const getCustomFieldName = (type: string, number: number): string => {
    switch (type) {
        case ECustomFieldsTypes.DATE:
            return `custom_date${number}`;
        case ECustomFieldsTypes.LOGICAL:
            return `custom_boolean${number}`;
        case ECustomFieldsTypes.NUMERIC:
            return `custom_int${number}`;
        case ECustomFieldsTypes.STRING:
            return `custom_string${number}`;
        case ECustomFieldsTypes.TEXT:
            return `custom_text${number}`;
    }
};

export const getCustomFieldType = (fieldName: string): string => {
    if (fieldName.includes('date')) return 'Date';

    if (fieldName.includes('boolean')) return 'Logical';

    if (fieldName.includes('int')) return 'Numeric';

    if (fieldName.includes('string')) return 'String';

    if (fieldName.includes('text')) return 'Text';

    return '';
};
