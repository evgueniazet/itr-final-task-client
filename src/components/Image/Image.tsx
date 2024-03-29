import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

export const Image = ({ imageUrl }: { imageUrl: string }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (imageUrl && imageUrl.length > 1) {
                try {
                    const response = await fetch(imageUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        const objectURL = URL.createObjectURL(blob);
                        setImageSrc(objectURL);
                    } else {
                        console.error('Failed to fetch image:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImage();

        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageUrl]);

    return (
        <Box>
            {imageSrc ? <img style={{ width: '100px' }} src={imageSrc} alt="Uploaded" /> : <p></p>}
        </Box>
    );
};
