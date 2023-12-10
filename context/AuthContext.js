'use client';

import { LOGIN_TEST_CREDENTIALS } from '@/enums/enums';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  users: [LOGIN_TEST_CREDENTIALS],
  currentUserInfo: null,
  isLoggedIn: false,
  token: '',
  error: null,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const getTokenFromLocalStorage =
    (typeof window !== 'undefined' && localStorage.getItem('token')) || '';
  const [authState, setAuthState] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (getTokenFromLocalStorage !== '') {
      setAuthState(prev => ({
        ...prev,
        token: getTokenFromLocalStorage,
        isLoggedIn: true,
        error: null,
      }));
    }
  }, [getTokenFromLocalStorage]);

  const loginHandler = (email, password) => {
    const user = authState.users.find(user => user.email === email);
    if (email === user?.email && password === user?.password) {
      const encodedToken = uuidv4();
      localStorage.setItem('token', encodedToken);
      setAuthState(prev => ({
        ...prev,
        currentUserInfo: user,
        isLoggedIn: true,
      }));
      router.replace('/');
    } else {
      setAuthState(prev => ({
        ...prev,
        currentUserInfo: null,
        isLoggedIn: false,
        error: 'Error: email or password is incorrect',
      }));
    }
  };

  const signupHandler = (firstName, email, password) => {
    if (firstName !== '' && email !== '' && password !== '') {
      const userInfo = {
        firstName: firstName,
        email: email,
        password: password,
      };
      setAuthState(prev => ({
        ...prev,
        users: [...authState.users, userInfo],
        error: null,
      }));
      router.replace('/login');
    } else {
      setAuthState(prev => ({
        ...prev,
        error: 'Some error occured. Try Again',
      }));
    }
  };

  const logoutHandler = () => {
    setAuthState(prev => ({
      ...prev,
      currentUserInfo: null,
      isLoggedIn: false,
      token: '',
      error: null,
    }));
    localStorage.removeItem('token');
  };

  const resetAuthError = () => {
    setAuthState(prev => ({
      ...prev,
      error: null,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signupHandler,
        loginHandler,
        logoutHandler,
        resetAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
