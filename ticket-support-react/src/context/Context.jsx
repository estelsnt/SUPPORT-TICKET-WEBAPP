import React from 'react';
import { UserProvider } from './UserContext';
import { LoaderProvider } from './LoaderContext';
import { ToastProvider } from './ToastContext';
import { SidebarProvider } from './SidebarContext';
import { SplashProvider } from './SplashContext';
import {GoogleOAuthProvider} from '@react-oauth/google';
import config from '../../../config.json';

function Context({ children }) {

    return (
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            <LoaderProvider>
                <UserProvider>
                    <ToastProvider>
                        <SidebarProvider>
                            <SplashProvider>
                                { children }    
                            </SplashProvider>     
                        </SidebarProvider>
                    </ToastProvider>
                </UserProvider>   
            </LoaderProvider>
        </GoogleOAuthProvider>
    );
}

export default Context;