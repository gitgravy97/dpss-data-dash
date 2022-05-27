import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import this for the changes to be more React18 compliant
import { createRoot } from 'react-dom/client';

import 'mapbox-gl/dist/mapbox-gl.css';

/*
// The original way of doing this
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

/* 
  react-dom.development.js:86 
  Warning: ReactDOM.render is no longer supported in React 18. 
  Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. 
  Learn more: https://reactjs.org/link/switch-to-createroot

  --> This seems to apply to the chunk below. Look into this later and resolve.
*/

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
