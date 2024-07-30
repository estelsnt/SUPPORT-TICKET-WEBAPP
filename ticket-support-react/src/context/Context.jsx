import React from 'react';
import { UserProvider } from './UserContext';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import config from '../../../config.json';

function Context({ children }) {

    return (
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            <UserProvider>
                { children }
            </UserProvider>   
        </GoogleOAuthProvider>
    );
}

export default Context;