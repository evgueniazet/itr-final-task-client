export const uploadImageToCloudinary = async (imageContent: ArrayBuffer, imageName: string) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dzvx4t2so/image/upload';

    const formData = new FormData();
    formData.append('file', new Blob([imageContent]), imageName);
    formData.append('upload_preset', 'ml_default');

    try {
        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image to Cloudinary');
        }

        const data = await response.json();
        const imageUrl = data.secure_url;

        return imageUrl;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
    }
};
