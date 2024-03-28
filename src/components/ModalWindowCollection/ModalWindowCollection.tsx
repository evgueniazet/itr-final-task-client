import React, { useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    Modal,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTranslations } from 'next-intl';
import { CustomFieldEditor } from 'components/CustomFieldEditor';
import { TCustomField, TModalWindowCollectionProps } from './ModalWindowCollection.types';
import { createCollectionData } from './ModalWindowCollection.utils';
import { uploadImageToCloudinary } from 'utils/uploadImageToCloudinary';
import { TCollectionRequest } from 'types/TCollectionRequest';

export const ModalWindowCollection = ({
    userId,
    isModalOpen,
    categories,
    editedCollection,
    existingCustomFields,
    handleCloseModal,
    createCollection,
    updateCollection,
}: TModalWindowCollectionProps) => {
    const initialCollectionData: TCollectionRequest = {
        title: '',
        userId: userId,
        description: '',
        category: '',
    };

    const t = useTranslations('ModalWindowCollection');
    const theme = useTheme();
    const [requiredFields, setRequiredFields] = useState<TCollectionRequest>(initialCollectionData);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [customFields, setCustomFields] = useState<TCustomField[]>([]);
    const [image, setImage] = useState<string>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRequiredFields((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setRequiredFields((prevData) => ({
            ...prevData,
            category: e.target.value,
        }));
    };

    const canSubmitForm = () => {
        return requiredFields.title && requiredFields.description && requiredFields.category;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            if (reader.result instanceof ArrayBuffer) {
                const imageContent = reader.result;
                const imageUrl = await uploadImageToCloudinary(imageContent, file.name);
                setImage(imageUrl);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSaveCollection = () => {
        const collectionData = createCollectionData(
            categories,
            customFields,
            requiredFields,
            image,
        );

        if (editedCollection) {
            updateCollection(editedCollection.id, collectionData);
        } else {
            createCollection(collectionData);
        }

        setRequiredFields(initialCollectionData);
        handleCloseModal();
    };

    useEffect(() => {
        if (editedCollection) {
            setRequiredFields({
                title: editedCollection.title,
                userId: editedCollection.userId,
                description: editedCollection.description,
                category: editedCollection.category,
            });
        }
    }, [editedCollection]);

    useEffect(() => {
        setIsDisabled(!canSubmitForm());
    }, [requiredFields]);

    return (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: theme.palette.background.default,
                    boxShadow: 24,
                    p: 4,
                    height: '60vh',
                    overflowY: 'auto',
                }}
            >
                <TextField
                    sx={{ mt: 2 }}
                    label={t('collectionTitle')}
                    name="title"
                    value={requiredFields.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    sx={{ mt: 2 }}
                    label={t('collectionDescription')}
                    name="description"
                    value={requiredFields.description}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    sx={{ mt: 2 }}
                    type="file"
                    name="image"
                    onChange={handleImageUpload}
                    fullWidth
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="collection-category-label">
                        {t('collectionCategory')}
                    </InputLabel>
                    <Select
                        labelId="collection-category-label"
                        value={requiredFields.category}
                        onChange={handleCategoryChange}
                        required
                    >
                        {categories.map((category) => {
                            return (
                                <MenuItem key={category.id} value={category.title}>
                                    {category.title}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <CustomFieldEditor
                    existingCustomFields={existingCustomFields}
                    customFields={customFields}
                    setCustomFields={setCustomFields}
                />
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleSaveCollection}
                            disabled={isDisabled}
                        >
                            {t('saveCollectionButton')}
                        </Button>
                    </Box>

                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    );
};
