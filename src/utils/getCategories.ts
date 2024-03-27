import { useState, useEffect } from 'react';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';

export const getCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api(requestApi.allCategories())
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return categories;
};
