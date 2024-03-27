import { useState, useEffect } from 'react';
import axios from 'axios';

export const getCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/categories/all-categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return categories;
};
