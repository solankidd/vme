import React, { useState } from 'react';
// import 'typed-query-selector';
function CheckEntry(): JSX.Element {
	const [validityCls, setValidityCls] = useState('');
	const [vehicleNo, setVehicleNo] = useState('');
	function check(event: any) {
		event.preventDefault();
		console.log('check');
		setValidityCls('valid');
	}

	function refresh(event:any) {
		setValidityCls('');
		setVehicleNo('');
	}

	const handleChange = (event:any) => {
    setVehicleNo(event.target.value);
  };

	return (
		<section className='py-3 text-center'>
			<div className="row py-lg-5">
				<div className="col-lg-8 col-md-8 mx-auto">
					<h1 className="fw-light">Vehicle checker</h1>
					<p className="lead text-muted">Enter vehicle number to check if vehicle belongs to society or not</p>
					<form className='row needs-validation wasvalidated' noValidate>
						<div className="col-md-12">
							<label htmlFor="vehicleNo" className="form-label">Vehicle No</label>
							<input onChange={(e)=> handleChange(e)} type="text" value={vehicleNo} className={`form-control ${validityCls}`} id="vehicleNo" placeholder="Vehicle no."></input>
							<div className="valid-feedback">
								Looks good!
							</div>
							<button type="submit" className="btn btn-primary mt-3 me-3" onClick={(e) => check(e)}>Check</button>
							<button type="button" className="btn btn-secondary mt-3" onClick={(e) => refresh(e)}>
								<i className="bi bi-arrow-clockwise"></i>
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default CheckEntry;