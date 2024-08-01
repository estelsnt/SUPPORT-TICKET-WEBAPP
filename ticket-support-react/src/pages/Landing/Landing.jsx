import React, {useContext, useEffect} from 'react';
import styles from './Landing.module.css';
import { GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { LoaderContext } from '../../context/LoaderContext';
import { ToastContext } from '../../context/ToastContext';

function Landing() {

    const {toast} = useContext(ToastContext);
    const {loading} = useContext(LoaderContext);
    const {access} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(()=>{
        // go to designated page
        switch(access){
            case 'user':
            case 'admin':
                navigate('/support');
            break;
            case 'client':
                navigate('/dashboard');
            break;
        }
    }, [access])

    async function onLoginSuccess(codeResponse){
        loading(true);
        const response = await login(jwtDecode(codeResponse.credential));
        loading(false);
        localStorage.setItem('t', response.token);
        location.reload();
    }

    function onLoginFailure(){
        console.log('failed');
        toast('Unable to login with Google. Please try again later', 'warning');
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