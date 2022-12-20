import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { STORAGE_KEY_SECRET } from 'shared/constant';

import { useLocalStorage } from 'usehooks-ts'

function Header(): JSX.Element {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const navigate = useNavigate();
	const [secret, setSecret] = useLocalStorage(STORAGE_KEY_SECRET, '');
	
	const refresh = () => { 
		setIsRefreshing(true);
		setTimeout(()=>{
			window.location.reload();	
			setIsRefreshing(false);
		}, 2000)
	};

	const logout = ()=> {
		setSecret('');
		navigate('/login');
	};

	const login = ()=> {
		navigate('/login');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand d-flex justify-content-center align-items-center" href="#">
					<img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Logo" className="navbar-logo" />
					<div className='me-2'>VM Empire</div>
					{ !isRefreshing && <i className="bi bi-arrow-clockwise" onClick={(e) => refresh()}></i>}
					{isRefreshing && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link className='nav-link' to="/vme">Home</Link>
						</li>
						<li className="nav-item">
							<Link className='nav-link' to="/announcement">Announcements</Link>
						</li>
						{/* {!!secret && <li className="nav-item">
							<a className='nav-link' onClick={()=>{ logout() }}>Logout</a>
						</li>}
						{!secret && <li className="nav-item">
							<a className='nav-link' onClick={()=>{ login() }}>Login</a>
						</li>} */}
					</ul>
					<form className="d-flex">
					{!!secret && <button onClick={()=>{ logout() }} className="btn btn-outline-secondary" type="button">
							<i className="bi bi-shield-lock"></i>
						</button>}
					{!secret && <button onClick={() => { login() }} className="btn btn-outline-secondary" type="button">
							<i className="bi bi-shield-lock"></i>
						</button>}
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Header;