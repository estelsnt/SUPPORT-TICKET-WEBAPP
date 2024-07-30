import React, { Children } from 'react';
import {BrowserRouter, Routes as Router, Route} from 'react-router-dom';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import config from '../../../config.json';

function Routes() {

    return (
        <BrowserRouter basename={config.FRONTEND_BASE_URL}>
            <Router>
                <Route path='/' element={<Landing />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Router>
        </BrowserRouter>
    );
}

export default Routes;