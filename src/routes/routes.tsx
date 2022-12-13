import type { RouteObject } from 'react-router-dom';

//components
import CheckEntry from 'components/checkEntry/checkEntry.component'; 

const Routes: RouteObject[] = [
	{
		path: '/',
		element: <CheckEntry />
	},
	{
		path: '/vme',
		element: <CheckEntry />
	}
];

export default Routes;