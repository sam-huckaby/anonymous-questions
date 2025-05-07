'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Encode to Base64
export const encode = (str: string): string => {
  if (typeof window !== 'undefined') {
    return btoa(str);
  }
  return '';
};

// Decode from Base64
export const decode = (str: string): string => {
  if (typeof window !== 'undefined') {
    try {
      return atob(str);
    } catch (e) {
      return '';
    }
  }
  return '';
};

// Set a cookie indicating the user has answered a question
export const setAnsweredCookie = (password: string): void => {
  const encodedPassword = encode(password);
  Cookies.set('answered', encodedPassword, { 
    expires: 7, // Expires in 7 days
    sameSite: 'strict',
    path: '/' 
  });
};

// Set a cookie for authentication
export const setAuthCookie = (password: string): void => {
  const encodedPassword = encode(password);
  Cookies.set('auth', encodedPassword, { 
    expires: 1, // Expires in 1 day
    sameSite: 'strict',
    path: '/' 
  });
};

// Check if the user is authenticated
export const isAuthenticated = (sitePassword: string): boolean => {
  const authCookie = Cookies.get('auth');
  if (!authCookie) return false;
  
  const decodedAuth = decode(authCookie);
  return decodedAuth === sitePassword;
};

// Check if the user has answered a question
export const hasAnswered = (sitePassword: string): boolean => {
  const answeredCookie = Cookies.get('answered');
  if (!answeredCookie) return false;
  
  const decodedAnswered = decode(answeredCookie);
  return decodedAnswered === sitePassword;
};

// Custom hook to handle authentication
export const useAuth = (sitePassword: string) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = isAuthenticated(sitePassword);
      setIsAuth(authenticated);

      // If not authenticated, redirect to login
      if (!authenticated) {
        router.push('/login');
      }

      // Check if user has answered
      const answered = hasAnswered(sitePassword);
      setHasUserAnswered(answered);
    };

    checkAuth();
  }, [sitePassword, router]);

  return { isAuth, hasUserAnswered, setAnsweredCookie, setAuthCookie };
};