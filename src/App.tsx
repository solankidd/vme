import React from 'react';
import { useRoutes } from 'react-router-dom';
import Routes from 'routes/routes';
import logo from './logo.svg';
import './App.scss';
import Header from 'components/header/header.component';

function App() {
	const routes = useRoutes(Routes);
	return (
		<div className="app app-main-layout">
			{/* <img src={logo} className="App-logo" alt="logo" /> */}
			<header>
				<Header />
			</header>
			<div className='app-content'>
				<div className='top-banner'></div>
				<div className='container-fluid'>
					{routes}
				</div>
			</div>
			<footer>
			<div className='container-fluid'>
				<span>V4</span>
				&nbsp;&nbsp;&nbsp;
				<span>App: VM Empire</span>
				&nbsp;&nbsp;&nbsp;
				<span>Author: Dhaval Solanki</span>
				&nbsp;&nbsp;&nbsp;
			</div>
			</footer>
		</div>
	);
}

export default App;
