import React, { useState, ChangeEvent, useEffect } from 'react';
import { useItemsCollection } from '../CollectionPage.utils';

export const CustomFields = ({ collection, item }: any) => {
    const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});
    const { useUpdateItemInCollection } = useItemsCollection();

    useEffect(() => {
        setEditedFields({});
    }, [collection]);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const fieldName = event.target.name;
        const value =
            event.target.type === 'checkbox'
                ? (event.target as HTMLInputElement).checked
                : event.target.value;
        setEditedFields({ ...editedFields, [fieldName]: value });
    };

    const handleSave = () => {
        useUpdateItemInCollection(item.id, editedFields);
    };

    const renderField = (fieldName: string, key: string, fieldType: string) => {
        let inputValue = editedFields[key] !== undefined ? editedFields[key] : item[key];

        if (inputValue === null) {
            inputValue = '';
        }

        if (fieldType === 'boolean') {
            return (
                <div key={fieldName}>
                    <label>
                        <input
                            name={key}
                            onChange={handleChange}
                            type="checkbox"
                            checked={inputValue as boolean}
                        />{' '}
                        {fieldName}
                    </label>
                </div>
            );
        } else if (fieldType === 'date') {
            const formattedDate = inputValue
                ? new Date(inputValue).toISOString().substr(0, 10)
                : '';

            return (
                <div key={fieldName}>
                    <label>{fieldName}:</label>
                    <input name={key} onChange={handleChange} type="date" value={formattedDate} />
                </div>
            );
        } else {
            return (
                <div key={fieldName}>
                    <label>{fieldName}:</label>
                    <input name={key} onChange={handleChange} type="text" value={inputValue} />
                </div>
            );
        }
    };

    const renderFields = () => {
        const fields: JSX.Element[] = [];

        for (const key in collection) {
            if (key.startsWith('custom') && collection[key] !== null) {
                const [, type] = key.split('_');
                const fixedType = type.slice(0, -1);
                const fieldName = collection[key];

                fields.push(renderField(fieldName, key, fixedType));
            }
        }

        return fields;
    };

    return (
        <div>
            {renderFields()}
            <button onClick={handleSave}>Save</button>
        </div>
    );
};
