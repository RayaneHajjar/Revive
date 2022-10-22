import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    firstname: null,
    token: null,
    login: () => {},
    logout: () => {}
});
