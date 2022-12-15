import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoutes } from 'react-router-dom';
import { API_KEY } from 'shared/constant';
import Routes from 'routes/routes';
import logo from './logo.svg';
import './App.scss';
import Header from 'components/header/header.component';

interface VehicleDetail {
	version: string;
	cacheversion: string;
	secret: string;
}

function App() {
	const routes = useRoutes(Routes);
	const API = `https://script.google.com/macros/s/${API_KEY}/exec`;
	const [globalData, setGlobalData] = useState<VehicleDetail>();

	useEffect(() => {
		getGlobalSetting();
	}, []);

	function getGlobalSetting() {
		axios.get(API, {
			params: {
				onlyCount: false,
				sheetId: '1y5PdYV-cXYjDJPhL4sKqgLU6XveQmDdU5-3hAvLkiRc',
				sheetName: 'global'
			}
		})
			.then((response) => {
				setGlobalData(response.data[0]);
			});
	}

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
				<span>Installed V1</span>
				&nbsp;&nbsp;&nbsp;
				<span>App: VM Empire {globalData?.version}</span>
				&nbsp;&nbsp;&nbsp;
				<span>Author: Dhaval Solanki</span>
				&nbsp;&nbsp;&nbsp;
			</div>
			</footer>
		</div>
	);
}

export default App;
