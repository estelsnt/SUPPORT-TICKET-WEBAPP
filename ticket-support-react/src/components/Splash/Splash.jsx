import React, { useContext } from 'react';
import styles from './Splash.module.css';
import { SplashContext } from '../../context/SplashContext';

function Splash() {

    const {showSplash} = useContext(SplashContext); 

    return (
        <div className={`${styles.container} ${showSplash ? styles.show : ''}`}>
            
        </div>
    );
}

export default Splash;