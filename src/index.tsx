import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import Store from './store';

import './index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.min.js";
/* eslint-disable no-restricted-globals */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
		<Provider store={Store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
  </React.StrictMode>
);
const onUpdateFound = (reg:any) => {
	let confirmDialog = confirm('Update found, you want to reload?');
	if (confirmDialog == true) {
		console.log('index onUpdateFound SKIP_WAITING');
		reg.waiting.postMessage({type: 'SKIP_WAITING'});
		setTimeout(()=>{
			window.location.reload();
		},1000);
	}
};

const onSuccessDone = (reg:any)=> {
	console.log('index onSuccessDone');
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
	onUpdate: onUpdateFound,
	onSuccess: onSuccessDone
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
