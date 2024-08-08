import React, { Children, useContext, useEffect, useState } from 'react';
import {BrowserRouter, Routes as Router, Route} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { verifyToken } from '../api/userApi';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import config from '../../../config.json';
import Support from './Support/Support';
import Setup from './Setup/Setup';
import NotFound from './NotFound/NotFound';
import Splash from '../components/Splash/Splash';
import Toast from '../components/Toast/Toast';
import Loader from '../components/Loader/Loader';

function Routes() {

    // context states
    const {token, setToken, setAccess, setEmail, setName, setPicture, setId} = useContext(UserContext);

    // ui related state
    const [isReady, setIsReady] = useState(false);

    /**
     * Authentication process:
     * 1. check if there is token in local storage if none then end.
     * 2. verify token to get user data
     * 3. if token context is set then render conditional routes
     * on login at landing page, it will set token in local storage then refresh the page to trigger this process
     */
    useEffect(()=>{
        // checks if token already exist on local storage and verifies it
        if(localStorage.getItem('t')){
            tryVerifyToken();
        }else{
            // by default there is ui blocker while token is being checked, this will disable it since there is no token
            setIsReady(true);
        }
    }, []);
    
    // check token validity
    async function tryVerifyToken(){
        const response = await verifyToken(localStorage.getItem('t'));
        // unblocks ui
        setIsReady(true);
        // guard clause
        if(!response.status){
            return;
        }
        // set other context states
        setToken(localStorage.getItem('t'));  // or request new token someday
        setEmail(response.data.email);
        setName(response.data.name);
        setPicture(response.data.picture);
        setId(response.data.id);
        // access context state change will trigger redirect to other routes: see Landing.jsx on useEffect()
        setAccess(response.data.access);
    }

    return (
        <>
            <Splash show={isReady}/>
            <Toast />
            <Loader />
            <BrowserRouter basename={config.FRONTEND_BASE_URL}>
                <Router>
                    <Route path='/' element={<Landing />} />
                    {
                        token && (
                            <>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/support' element={<Support />} />
                                <Route path='/setup' element={<Setup />} />
                            </>
                        )
                    }
                    <Route path='*' element={<NotFound />} />
                </Router>
            </BrowserRouter>
        </>
    );
}

export default Routes;