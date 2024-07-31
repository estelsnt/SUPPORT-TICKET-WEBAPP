import React from 'react';
import styles from './Landing.module.css';
import { GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../api/userApi';

function Landing() {

    async function onLoginSuccess(codeResponse){
        console.log(jwtDecode(codeResponse.credential))
        const response = await login(jwtDecode(codeResponse.credential));
        console.log(response);
    }

    function onLoginFailure(){
        console.log('failed');
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>SUPPORT TICKET</h1>
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