import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_KEY } from 'shared/constant';

interface VehicleDetail {
	name: string;
	block: string;
	flatno: string;
	vehicletype: string;
	vehicle: string;
}

function CheckEntry(): JSX.Element {
	const API = `https://script.google.com/macros/s/${API_KEY}/exec`;
	const API_Count = `https://script.google.com/macros/s/${API_KEY}/exec?onlyCount=true`;
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [validityCls, setValidityCls] = useState('');
	const [vehicleNo, setVehicleNo] = useState('');
	const [vehicleDetail, setVehicleDetail] = useState<VehicleDetail>();

	useEffect(() => {

	}, [data]);

	function getData() {
		setIsLoading(true);
		axios.get(API)
			.then((response) => {
				setData(response.data);
				let result = response.data.find((ele: any) => {
					return ele.vehicle.toString().toLowerCase() == vehicleNo.toLowerCase();
				});
				if (result) {
					setVehicleDetail(result);
					setValidityCls('valid');
				} else {
					setValidityCls('invalid');
				}
				setIsLoading(false);
			});
	}

	function check(event: any) {
		setValidityCls('');
		event.preventDefault();
		getData();
	}

	function refresh() {
		setValidityCls('');
		setVehicleNo('');
		setVehicleDetail(undefined);
	}

	const handleChange = (event: any) => {
		setVehicleNo(event.target.value);
	};

	return (
		<section className="py-3">
			<div className="row py-lg-5 text-center">
				<div className="col-lg-8 col-md-8 mx-auto">
					<h1 className="fw-light">Vehicle checker</h1>
					<p className="lead text-muted">Enter vehicle number to check if vehicle belongs to society or not</p>
					<form className='row needs-validation wasvalidated' noValidate autoComplete="on">
						<div className="col-md-12">
							<label htmlFor="vehicleNo" className="form-label">Vehicle No</label>
							<input onChange={(e) => handleChange(e)} type="text" value={vehicleNo} className={`form-control ${validityCls}`} id="vehicleNo" placeholder="Vehicle no."></input>
							<div className="valid-feedback">
								Looks good!
							</div>
							<button disabled={!vehicleNo} type="submit" className="btn btn-primary mt-3 me-3" onClick={(e) => check(e)}>
								{isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
								&nbsp;Check
							</button>
							<button type="button" className="btn btn-secondary mt-3" onClick={(e) => refresh()}>
								<i className="bi bi-arrow-clockwise"></i>
							</button>
						</div>
					</form>
				</div>
			</div>
			{vehicleDetail && <div className='row'>
				<div className='col-lg-8 col-md-8 mx-auto'>
					<div className="card">		
							<div className="card-body">
								<h5 className="card-title">{vehicleDetail.name}</h5>
								{/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
							</div>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">Vehicle Type: <b>{vehicleDetail.vehicletype}</b></li>
								<li className="list-group-item">Block: <b>{vehicleDetail.block}-{vehicleDetail.flatno}</b></li>
							</ul>
					</div>
				</div>
			</div>}
		</section>
	);
}

export default CheckEntry;