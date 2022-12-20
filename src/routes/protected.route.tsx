
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseLocalStorage from 'hooks/localStorage.hook';
import { STORAGE_KEY_SECRET } from 'shared/constant';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  // const [ secret, setSecret ] = UseLocalStorage(STORAGE_KEY_SECRET, '');
	const val = window.localStorage.getItem(STORAGE_KEY_SECRET) || JSON.stringify('');
	const secret = JSON.parse(val);
  const location = useLocation();
  if (!!secret) {
    if (location.pathname.includes('/login')) {
      return <Navigate to="/vme" state={{ from: location }} replace />;
    }
    return children;
  } else {
		return location.pathname.includes('/login') ? children : <Navigate to='/login' state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;