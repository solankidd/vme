import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate, useRoutes, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateGlobalData } from "./store/reducers/globalReducer/actions";

import { API_KEY } from 'shared/constant';
import Routes from 'routes/routes';
import './App.scss';
import Header from 'components/header/header.component';
import { useLocalStorage } from 'usehooks-ts'
import { STORAGE_KEY_SECRET, STORAGE_KEYS } from 'shared/constant';

interface VehicleDetail {
	version: string;
	cacheVersion: string;
	secret: string;
}

function App() {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();

	const routes = useRoutes(Routes);
	const API = `https://script.google.com/macros/s/${API_KEY}/exec`;
	const [globalData, setGlobalData] = useState<VehicleDetail>();
	const [secret, setSecret] = useLocalStorage(STORAGE_KEY_SECRET, "");
	const [cache, setCache] = useLocalStorage(STORAGE_KEYS.CACHE, "");
	const navigate = useNavigate();
	console.log(searchParams.get('path'));
	useEffect(() => {
		if (searchParams.get('path') == 'announcement') {
			navigate(searchParams.get('path') as string);
		}
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
				if (secret !== response.data[0].secret) {
					setSecret('')
					navigate('/login');
				}
				const gData = {
					version: response.data[0].version,
					cacheVersion: response.data[0].cacheversion,
					secret: response.data[0].secret
				};
				setGlobalData(gData);
				dispatch(updateGlobalData(gData));
				setCache(gData.cacheVersion);
			});
	}

	return (
		<div className="app app-main-layout">
			{/* <img src={logo} className="App-logo" alt="logo" /> */}
			<header>
				<Header />
			</header>
			<div className='app-content'>
				{/* <div className='top-banner-text text-center'>
					<h1><b>VM EMPIRE</b></h1>
				</div> */}
				<div className='top-banner-text'>
					<div className="flag d-flex flex-column">
						<div className="orange"></div>
						<div className="white d-flex justify-content-center align-items-center">
							<img src="/vme/logo.svg" alt="Logo" className="circle " />
						</div>
						<div className="green"></div>
					</div>
				</div>
				<div className='container-fluid'>
					{routes}
				</div>
			</div>
			<footer>
				<div className='container-fluid'>
					<span>Installed V2</span>
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
