import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate, useRoutes } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateGlobalData } from "./store/reducers/globalReducer/actions";

import { API_KEY } from 'shared/constant';
import Routes from 'routes/routes';
import './App.scss';
import Header from 'components/header/header.component';
import UseLocalStorage from 'hooks/localStorage.hook';
import { STORAGE_KEY_SECRET } from 'shared/constant';

interface VehicleDetail {
	version: string;
	cacheVersion: string;
	secret: string;
}

function App() {
	const dispatch = useDispatch();

	const routes = useRoutes(Routes);
	const API = `https://script.google.com/macros/s/${API_KEY}/exec`;
	const [globalData, setGlobalData] = useState<VehicleDetail>();
	const {clearStore, getStore} = UseLocalStorage(STORAGE_KEY_SECRET);
	const navigate = useNavigate();

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
				if(getStore(STORAGE_KEY_SECRET) !== response.data[0].secret){
					clearStore();
					navigate('/login');
				}
				const gData = {
					version: response.data[0].version,
					cacheVersion: response.data[0].cacheversion,
					secret: response.data[0].secret
				};
				setGlobalData(gData);
				dispatch(updateGlobalData(gData));
			});
	}

	return (
		<div className="app app-main-layout">
			{/* <img src={logo} className="App-logo" alt="logo" /> */}
			<header>
				<Header />
			</header>
			<div className='app-content'>
				<div className='top-banner-text text-center'>
					<h1><b>VM EMPIRE</b></h1>
				</div>
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
