import React, { useState, ChangeEvent, useEffect } from 'react';
import { TCustomFieldsProps } from './CustomFields.type';
import { TItemInCollection } from 'types/TItemInCollection';
import { TCollection } from 'types/TCollection';
import { Checkbox, TextField, Typography, Button, Box } from '@mui/material';

export const CustomFields = ({ collection, item, updateItemInCollection }: TCustomFieldsProps) => {
    const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});

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
        updateItemInCollection(item.id, editedFields);
    };

    const renderField = (fieldName: string, key: string, fieldType: string) => {
        let inputValue =
            editedFields[key] !== undefined
                ? editedFields[key]
                : item[key as keyof TItemInCollection];

        if (inputValue === null) {
            inputValue = '';
        }

        return (
            <div
                key={fieldName}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '8px',
                }}
            >
                <Typography>{fieldName}:</Typography>
                {fieldType === 'boolean' ? (
                    <Checkbox
                        name={key}
                        onChange={handleChange}
                        checked={Boolean(inputValue)}
                        sx={{ marginLeft: '8px' }}
                    />
                ) : fieldType === 'date' ? (
                    <TextField
                        name={key}
                        onChange={handleChange}
                        type="date"
                        value={inputValue ? new Date(inputValue).toISOString().substr(0, 10) : ''}
                        fullWidth
                        sx={{ marginLeft: '8px' }}
                    />
                ) : (
                    <TextField
                        name={key}
                        onChange={handleChange}
                        type="text"
                        value={inputValue}
                        fullWidth
                        sx={{ marginLeft: '8px' }}
                    />
                )}
            </div>
        );
    };

    const renderFields = () => {
        const fields: JSX.Element[] = [];

        for (const key in collection) {
            if (key.startsWith('custom') && collection[key as keyof TCollection] !== null) {
                const [, type] = key.split('_');
                const fixedType = type.slice(0, -1);
                const fieldName = collection[key as keyof TCollection];

                if (typeof fieldName === 'string') {
                    fields.push(renderField(fieldName, key, fixedType));
                }
            }
        }

        return fields;
    };

    return (
        <Box>
            {renderFields()}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button onClick={handleSave} variant="contained">
                    Save
                </Button>
            </Box>
        </Box>
    );
};
