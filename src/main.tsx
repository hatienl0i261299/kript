import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App>
                <AppRouter/>
            </App>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
