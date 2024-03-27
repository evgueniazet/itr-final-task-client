'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type TAppContextProps = {
    isAuth: boolean;
};

const AppContext = createContext({
    isAuth: false,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if (token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);

    const values: TAppContextProps = {
        isAuth,
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
