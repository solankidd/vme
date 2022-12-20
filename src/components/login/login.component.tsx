import React, { MouseEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { STORAGE_KEY_SECRET } from 'shared/constant';
import { API_KEY } from 'shared/constant';

const Login = () => {
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [secret, setSecret] = useLocalStorage(STORAGE_KEY_SECRET, '');
	const navigate = useNavigate();

	const getGlobalSetting = () => {
		const API = `https://script.google.com/macros/s/${API_KEY}/exec`;

		axios.get(API, {
			params: {
				onlyCount: false,
				sheetId: '1y5PdYV-cXYjDJPhL4sKqgLU6XveQmDdU5-3hAvLkiRc',
				sheetName: 'global'
			}
		}).then((response) => {
			if (password === response.data[0].secret) {
				setSecret(password);
				setIsLoading(false);
				navigate('/vme');
			}
		});
	}

	const handleChange = (event: any) => {
		setPassword(event.target.value);
	};

	const login = (event: MouseEvent) => {
		setIsLoading(true);
		event.preventDefault();
		getGlobalSetting();
	}

	return (
		<div className='row justify-content-center'>
			<div className='col-12 col-md-4 col-sm-6'>
				<form className='mt-3' noValidate>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" onChange={(e) => handleChange(e)} id="exampleInputPassword1" />
					</div>
					<button type="submit" className="btn btn-primary" onClick={(e) => { login(e) }}>
						{isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
						&nbsp;Login
					</button>
				</form>
			</div>
		</div>
	);
}

//

export default Login;