import axios from 'axios';
import { useLocalStorage } from 'usehooks-ts'
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { API_KEY } from 'shared/constant';
import { STORAGE_KEYS } from 'shared/constant';

interface VehicleDetail {
	name: string;
	block: string;
	flatNo: string;
	vehicleType: string;
	vehicle: string;
	version: string;
	phone: string;
}

function CheckEntry(): JSX.Element {
	const state:any = useSelector((state) => state);
	
	const API = `https://script.google.com/macros/s/${API_KEY}/exec`;
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [validityCls, setValidityCls] = useState('');
	const [vehicleNo, setVehicleNo] = useState('');
	const [vehicleDetail, setVehicleDetail] = useState<VehicleDetail>();
	const [noVehicleFound, setNoVehicleFound] = useState(false);
	const [vehicles, setVehicles] = useLocalStorage(STORAGE_KEYS.VEHICLE_DATA, '');
	const [cache, setCache] = useLocalStorage(STORAGE_KEYS.CACHE, '');

	useEffect(() => {}, []);

	function processVehicleData(data:any) {
		setData(data);
		setVehicles(data);
		let result = data.find((ele: any) => {
			let dataValue = ele.vehicle.toString().toLowerCase();
			let enteredVal = vehicleNo.toLowerCase();
			if(vehicleNo.length === 4){
				dataValue = dataValue.substr(ele.vehicle.length - 4);
				enteredVal = enteredVal.substr(vehicleNo.length - 4);
			}
			return enteredVal == dataValue;
		});

		if (result) {
			const vDetail = {
				name: result.name,
				block: result.block,
				flatNo: result.flatno,
				vehicleType: result.vehicletype,
				vehicle: result.vehicle,
				version: result.version,
				phone: result.phone
			}
			setVehicleDetail(vDetail);
			setValidityCls('valid');
			setNoVehicleFound(false);
		} else {
			setNoVehicleFound(true);
			setValidityCls('invalid');
		}
		setIsLoading(false);
	}
	function getData() {
		setIsLoading(true);

		if(vehicles.length && (vehicles[0] as any).version == cache) {
			processVehicleData(vehicles)
		} else {
			axios.get(API, {
				params: {
					onlyCount: false,
					sheetId: '1gc7xRh3GdF3galmA8nbZqlpz7SIb9OSFpiNuG_99TrE',
					sheetName: 'vehicle'
				}
			})
				.then((response) => {
					processVehicleData(response.data)
				});
		}

	}

	function check(event: any) {
		setValidityCls('');
		event.preventDefault();
		setVehicleDetail(undefined);
		getData();
	}

	function refresh() {
		setValidityCls('');
		setVehicleNo('');
		setVehicleDetail(undefined);
	}

	const handleChange = (event: any) => {
		if(!event.target.value || event.target.value.length < 4) {
			setValidityCls('');
		}
		setVehicleNo(event.target.value);
	};

	return (
		<section className="py-3">
			<div className="row py-lg-5 py-3 text-center">
				<div className="col-lg-8 col-md-8 mx-auto">
					<h1 className="fw-light">Vehicle checker {state.version}</h1>
					<p className="lead text-muted">Enter vehicle number to check if vehicle belongs to society</p>
					<form className='row needs-validation wasvalidated' noValidate autoComplete="on">
						<div className="col-md-12">
							<label htmlFor="vehicleNo" className="form-label">Vehicle No</label>
							<input onChange={(e) => handleChange(e)} type="text" value={vehicleNo} className={`form-control ${validityCls}`} id="vehicleNo" placeholder="Vehicle no."></input>
							<div className="valid-feedback">
								Looks good!
							</div>
							<button disabled={!vehicleNo || vehicleNo.length < 4} type="submit" className="btn btn-primary mt-3 me-3" onClick={(e) => check(e)}>
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
								<li className="list-group-item">Vehicle No: <b>{vehicleDetail.vehicle.toUpperCase()}</b></li>
								<li className="list-group-item">
									Vehicle Type: <b>{vehicleDetail.vehicleType}</b>
									&nbsp;&nbsp;
									{vehicleDetail.vehicleType.substring(0,1) == '4' && <b><i className="bi bi-car-front-fill"></i></b>}
									{vehicleDetail.vehicleType.substring(0,1) == '2' && <b><i className="bi bi-scooter"></i></b>}
								</li>
								<li className="list-group-item">Block: <b>{vehicleDetail.block}-{vehicleDetail.flatNo}</b></li>
								<li className="list-group-item">
									Mobile number: 
									<b>&nbsp;<a href="tel:{vehicleDetail.phone}">{vehicleDetail.phone}</a></b>
								</li>
							</ul>
					</div>
				</div>
			</div>}
			{noVehicleFound &&
				<div className="alert alert-danger" role="alert">No vehicle found!</div>
			}
		</section>
	);
}

export default CheckEntry;