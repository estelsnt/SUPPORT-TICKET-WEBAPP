import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './Landing.module.css';
import { GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { login, manualLogin } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { LoaderContext } from '../../context/LoaderContext';
import { ToastContext } from '../../context/ToastContext';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { redBorderMarker } from '../../api/helper';

function Landing() {

    const navigate = useNavigate();
    
    // context states
    const {toast} = useContext(ToastContext);
    const {loading} = useContext(LoaderContext);
    const {access} = useContext(UserContext)
    
    // data states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ui related states
    const [maskPassword, setMaskPassword] = useState(true);
    
    // dom references
    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(()=>{
        // go to designated page based on user access
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

    // for google OAuth: will save a token at locan storage and refreshes this page
    async function onLoginSuccess(codeResponse){
        loading(true);
        const response = await login(jwtDecode(codeResponse.credential));
        loading(false);
        if(response.status){
            localStorage.setItem('t', response.token);
            // this reload triggers checking on local storage token which will set an access context that will allow redirect to other pages
            location.reload();
        }else{
            toast(response.message, 'danger');
        }
    }

    // for google OAuth failure
    function onLoginFailure(){
        toast('Unable to login with Google. Please try again later', 'warning');
    }

    // login button
    async function loginClick(){
        // check input
        if(username === '' || password === ''){
            redBorderMarker(usernameRef.current);
            redBorderMarker(passwordRef.current);
            return;
        }
        loading(true);
        // access manual login
        const response = await manualLogin(username, password);
        loading(false);
        toast(response.message, response.status ? 'success' : 'danger');
        if(response.status){
            loading(true);
            localStorage.setItem('t', response.token);
            // this reload triggers checking on local storage token which will set an access context that will allow redirect to other pages
            location.reload();
        }else{
            redBorderMarker(usernameRef.current);
            redBorderMarker(passwordRef.current);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>SUPPORT TICKET</h1>
                <div>
                    <div className={styles.inputContainer} ref={usernameRef} >
                        <label>Username</label>
                        <div>
                            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.inputContainer} ref={passwordRef} >
                        <label>Password</label>
                        <div>
                            <input type={maskPassword ? 'password' : 'text'} value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <button onMouseEnter={()=>setMaskPassword(false)} onMouseLeave={()=>setMaskPassword(true)} >
                                { maskPassword ? <FaLock /> : <FaLockOpen /> }
                            </button>
                        </div>
                    </div>
                    <button className={`${styles.login} btn-primary`} onClick={loginClick} >Login</button>
                    <span>or</span>
                    <GoogleLogin
                        onSuccess={(codeResponse)=>onLoginSuccess(codeResponse)}
                        onError={onLoginFailure} />
                </div>
            </div>
        </div>
    );
}

export default Landing;