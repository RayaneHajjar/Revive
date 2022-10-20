import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './user/pages/LoginPage';
import RegisterPage from './user/pages/RegisterPage';
import HomePage from './home/pages/HomePage';
import TasksPage from './tasks/pages/TasksPage';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/use-auth';

const App = () => {
    const { token, login, logout, userId, firstname } = useAuth();

    let routes;
    if(token) {
        routes = (
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        )
    }
    else {
        routes = (
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        )
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                firstname: firstname,
                login: login,
                logout: logout,
            }}
        >
        <BrowserRouter>
            {routes}
        </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
