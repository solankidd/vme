import React from 'react';
import { useRoutes } from 'react-router-dom';
import Routes from 'routes/routes';
import logo from './logo.svg';
import './App.scss';
import Header from 'components/header/header.component';

function App() {
	const routes = useRoutes(Routes);
	return (
		<div className="app">
			{/* <img src={logo} className="App-logo" alt="logo" /> */}
			<header>
				<Header />
			</header>
			<div className='top-banner'></div>
			<div className='container-fluid'>
				{routes}
			</div>
			<footer></footer>
		</div>
	);
}

export default App;
