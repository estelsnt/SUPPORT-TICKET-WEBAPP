import React from 'react';
import { UserProvider } from './UserContext';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';


function Context({ children }) {
    return (
        <GoogleOAuthProvider clientId="797777669990-3nrqege9htfihuo5e520psssk39ipanb.apps.googleusercontent.com">
        <UserProvider>
            { children }
        </UserProvider>   
        </GoogleOAuthProvider>
    );
}

export default Context;