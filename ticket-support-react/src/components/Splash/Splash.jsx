import React, { useContext, useEffect } from 'react';
import styles from './Splash.module.css';

function Splash({show}) {

    return (
        <div className={`${styles.container} ${!show ? styles.show : ''}`}>
            
        </div>
    );
}

export default Splash;