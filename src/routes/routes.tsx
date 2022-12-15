import type { RouteObject } from 'react-router-dom';

//components
import CheckEntry from 'components/checkEntry/checkEntry.component'; 
import Announcement from 'components/annoucement/announcement.component'; 

const Routes: RouteObject[] = [
	{
		path: '/',
		element: <CheckEntry />
	},
	{
		path: '/vme',
		element: <CheckEntry />
	},
	{
		path: '/announcement',
		element: <Announcement />
	}
];

export default Routes;