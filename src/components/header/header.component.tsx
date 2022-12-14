import React from 'react';
function Header(): JSX.Element {
	const refresh = () => { 
		window.location.reload();	
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand d-flex justify-content-center align-items-center" href="#">
					<img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Logo" className="navbar-logo" />
					<span className='me-2' onClick={(e) => refresh()}>VM Empire</span>
					<i className="bi bi-arrow-clockwise"></i>
					{/* <button type="button" className="btn btn-secondary mt-3" onClick={(e) => refresh()}>
					</button> */}
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Announcements</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Header;