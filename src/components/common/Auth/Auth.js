import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { selectIsAuthenticating } from '../../../store/auth';
import { useAppSelector } from '../../../store/store';

const Auth = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticating);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default Auth;
