import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'
// import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
// import { Store } from './JS/store/Store';

// import 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/dist/css/bootstrap.css';


const root = createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);