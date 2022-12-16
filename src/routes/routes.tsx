import type { RouteObject } from 'react-router-dom';

import ProtectedRoute from './protected.route';

//components
import CheckEntry from 'components/checkEntry/checkEntry.component';
import Announcement from 'components/announcement/announcement.component';
import Home from 'components/home/home.component';
import Login from 'components/login/login.component';

const Routes: RouteObject[] = [
	{
		path: '/login',
		element: <ProtectedRoute>
			<Login />
		</ProtectedRoute>
	},
	{
		path: '/',
		element: <ProtectedRoute>
			<CheckEntry />
		</ProtectedRoute>
	},
	{
		path: '/vme',
		element: <ProtectedRoute>
			<CheckEntry />
		</ProtectedRoute>
	},
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/announcement',
		element: <Announcement />
	}
];

export default Routes;