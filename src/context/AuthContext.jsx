import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...safeUser } = foundUser;
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
            setUser(safeUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    const value = { user, login, register, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
