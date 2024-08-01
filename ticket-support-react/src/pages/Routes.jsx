import React, { Children, useContext, useEffect } from 'react';
import {BrowserRouter, Routes as Router, Route} from 'react-router-dom';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import config from '../../../config.json';
import { UserContext } from '../context/UserContext';
import NotFound from './NotFound/NotFound';
import { verifyToken } from '../api/userApi';
import { LoaderContext } from '../context/LoaderContext';
import Support from './Support/Support';

function Routes() {

    const {loading} = useContext(LoaderContext);
    const {token, setToken, setAccess, setEmail, setName, setPicture, setId} = useContext(UserContext);

    /**
     * Authentication process:
     * 1. check if there is token in local storage if none then end.
     * 2. verify token to get user data
     * 3. if token context is set then render conditional routes
     * on login at landing page, it will set token in local storage then refresh the page to trigger this process
     */
    useEffect(()=>{
        // checks if token already exist
        if(localStorage.getItem('t')){
            tryVerifyToken();
        }
    }, []);
    
    async function tryVerifyToken(){
        loading(true);
        const response = await verifyToken(localStorage.getItem('t'));
        loading(false);
        if(!response.status){
            return;
        }
        setToken(localStorage.getItem('t'));  // or request new token
        setAccess(response.data.access);
        setEmail(response.data.email);
        setName(response.data.name);
        setPicture(response.data.picture);
        setId(response.data.id);
    }

    return (
        <BrowserRouter basename={config.FRONTEND_BASE_URL}>
            <Router>
                <Route path='/' element={<Landing />} />
                {
                    token && (
                        <>
                            <Route path='/' element={<Landing />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/support' element={<Support />} />
                        </>
                    )
                }
                <Route path='*' element={<NotFound />} />
            </Router>
        </BrowserRouter>
    );
}

export default Routes;