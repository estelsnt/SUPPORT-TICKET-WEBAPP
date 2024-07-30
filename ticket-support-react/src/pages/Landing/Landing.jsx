import React from 'react';
import styles from './Landing.module.css';
import { GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Landing() {

    function onLoginSuccess(codeResponse){
        console.log('success', jwtDecode(codeResponse.credential));
    }

    function onLoginFailure(){
        console.log('failed');
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>ITRACK MOBILE SUPPORT</h1>
                <div>
                    <span>Sign in</span>
                    <GoogleLogin
                        onSuccess={(codeResponse)=>onLoginSuccess(codeResponse)}
                        onError={onLoginFailure}
                    />
                </div>
            </div>
        </div>
    );
}

export default Landing;