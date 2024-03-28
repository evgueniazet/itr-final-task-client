import { useState, useEffect } from 'react';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const useGetCategories = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await api(requestApi.allCategories());

            if (response.data) {
                setCategories(response.data);
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
};
