import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'keen-slider/keen-slider.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppState from './components/context/appState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <PayPalScriptProvider options={{ "client-id": "AQwDvnhLqAF9T39k3BE2xc5kmgy54ZTNcXjAKiBkLPiG5RGP-vqHgkOTdJAaVicnH_UzoaKkiobDLAg8" }}>
  <PayPalScriptProvider options={{ "client-id": "AeVzDO21oRWGO_pguaTtQ5_URjALnxWTpIF1Cz0At7BMTmzb2UIg8DJ4B6mc-juXzwoI-LLN2bGJA5RQ" }}>
  <BrowserRouter>
    <AppState>
      <>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </AppState>
  </BrowserRouter>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
