import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './Components/App.jsx';
import * as serviceWorker from './Components/serviceWorker.js';

const app = document.getElementById('root');
const root = createRoot(app);

root.render( <App /> );