import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    Button,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
    Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import { ECustomFieldsTypes } from 'enums/ECustomFieldsTypes';
import { getCustomFieldName, getCustomFieldType } from './CustomFieldEditor.utils';
import { TCustomFieldEditorProps } from './CustomFieldEditor.types';

const MAX_FIELDS_PER_TYPE = 3;

export const CustomFieldEditor = ({
    customFields,
    existingCustomFields,
    setCustomFields,
}: TCustomFieldEditorProps) => {
    const t = useTranslations('customFieldEditor');
    const [newField, setNewField] = useState<{ type: string; name: string }>({
        type: '',
        name: '',
    });

    const [existingCustomFieldsData, setExistingCustomFieldsData] = useState([]);

    useEffect(() => {
        if (existingCustomFields) {
            const existingCustomFieldsArray = Object.entries(existingCustomFields).map(
                ([key, value]) => ({ title: getCustomFieldType(key), value }),
            );
            setExistingCustomFieldsData(existingCustomFieldsArray);
        }
    }, [existingCustomFields]);

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setNewField({ ...newField, type: event.target.value });
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewField({ ...newField, name: event.target.value });
    };

    const handleAddField = () => {
        const customFieldsFiltered = customFields.filter(
            (customField) => customField.type === newField.type,
        );
        const isPossibleToAddCustomField = customFieldsFiltered.length < MAX_FIELDS_PER_TYPE;

        if (!isPossibleToAddCustomField) return;

        const customFieldName = getCustomFieldName(newField.type, customFieldsFiltered.length + 1);

        setCustomFields([
            ...customFields,
            { ...newField, fieldName: customFieldName, id: Date.now() },
        ]);
        setNewField({ type: '', name: '' });
    };

    const handleRemoveField = (id: number) => {
        setCustomFields(customFields.filter((field) => field.id !== id));
    };

    const countFieldsOfType = (type: string) => {
        return customFields.filter((field) => field.type === type).length;
    };

    const availableTypes = [
        { value: ECustomFieldsTypes.DATE, label: t('dateTimeField') },
        { value: ECustomFieldsTypes.LOGICAL, label: t('logicalField') },
        { value: ECustomFieldsTypes.NUMERIC, label: t('numericField') },
        { value: ECustomFieldsTypes.STRING, label: t('stringField') },
        { value: ECustomFieldsTypes.TEXT, label: t('textField') },
    ].filter(
        (type) =>
            countFieldsOfType(type.value) < MAX_FIELDS_PER_TYPE || type.value === newField.type,
    );

    return (
        <div style={{ width: '100%' }}>
            <Typography sx={{ mt: 1 }} variant="h6">
                {t('addCustomField')}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    mt: 1,
                }}
            >
                <FormControl style={{ flex: 1, marginRight: '8px' }}>
                    <Select
                        value={newField.type}
                        onChange={handleTypeChange}
                        style={{ width: '100%' }}
                    >
                        {availableTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label={t('fieldTitle')}
                    value={newField.name}
                    onChange={handleNameChange}
                    style={{ flex: 1, marginRight: '8px' }}
                />
                <Button onClick={handleAddField} style={{ flex: 1 }}>
                    {t('addButton')}
                </Button>
            </Box>
            <Box>
                {existingCustomFieldsData.length > 0 &&
                    existingCustomFieldsData.map(({ title, value }) => {
                        return (
                            <Typography key={title}>
                                {title}: {value}
                            </Typography>
                        );
                    })}
            </Box>
            {customFields.length > 0 && (
                <Box>
                    <Typography sx={{ mt: 1 }} variant="h6">
                        {t('customFieldsList')}
                    </Typography>
                    {customFields.map((field) => (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '10vw',
                                mt: 1,
                            }}
                            key={field.id}
                        >
                            <Typography>
                                {capitalizeFirstLetter(field.type)}: {field.name}
                            </Typography>
                            <IconButton sx={{ p: 0 }} onClick={() => handleRemoveField(field.id)}>
                                <Close />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
        </div>
    );
};
