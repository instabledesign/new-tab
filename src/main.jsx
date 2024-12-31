import React from 'react'
import ReactDOM from 'react-dom/client'

import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';

import App from "./App.jsx";

import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import './serviceWorker.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline/>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
