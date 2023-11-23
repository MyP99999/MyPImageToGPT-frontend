import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth';
import axiosInstance from '../api/axios';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [open, setOpen] = useState(false); // State to control the visibility

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:8080/history/user/${user?.id}`);
                setHistory(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHistory();
    }, [user]);

    const toggleHistory = () => {
        setOpen(!open); 
        console.log(open)
    };

    return (
        <HistoryContext.Provider value={{ open, history, toggleHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export default HistoryProvider;
