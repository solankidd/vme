
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseLocalStorage from 'hooks/localStorage.hook';
import { STORAGE_KEY_SECRET } from 'shared/constant';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { getStore, value } = UseLocalStorage(STORAGE_KEY_SECRET);
	const password = false;
  const location = useLocation();
  if (getStore(STORAGE_KEY_SECRET)) {
    if (location.pathname.includes('/login')) {
      return <Navigate to="/vme" state={{ from: location }} replace />;
    }
    return children;
  } else {
		return location.pathname.includes('/login') ? children : <Navigate to='/login' state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;