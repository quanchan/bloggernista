import React from 'react';
import ReactDOM from 'react-dom';
import './client/style/index.scss';
import './client/style/reset.scss';
import App from './client/js/Components/App';
import reportWebVitals from './client/js/reportWebVitals';
import {BrowserRouter} from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
