import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { jwtDecode } from 'jwt-decode'; // Correct import statement for jwt-decode

const TokensContext = createContext();

export const useTokens = () => useContext(TokensContext);

export const TokensProvider = ({ children }) => {
    const { user, refreshAccessToken } = useAuth();
    const [tokens, setTokens] = useState(0);

    useEffect(() => {
        setTokens(user?.tokens)
    }, [user?.tokens]);

    const addTokens = async (amount) => {
        setTokens((prevTokens) => prevTokens + amount);
        // const refreshToken = localStorage.getItem('refreshToken');
        // await refreshAccessToken(refreshToken)
    }

    const spendTokens = async (amount) => {
        setTokens((prevTokens) => prevTokens - amount);
        // const refreshToken = localStorage.getItem('refreshToken');
        // await refreshAccessToken(refreshToken)
    }

    return (
        <TokensContext.Provider value={{ tokens, spendTokens, addTokens }}>
            {children}
        </TokensContext.Provider>
    );
};

export default TokensProvider;
