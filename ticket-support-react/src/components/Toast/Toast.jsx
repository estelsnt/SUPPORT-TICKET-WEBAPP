import React, { useContext, useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { ToastContext } from '../../context/ToastContext';

function Toast() {

    const {showToast, toastType, toastMessage} = useContext(ToastContext);

    return (
        <div className={`${styles.container} ${showToast? styles.show : ''}`} style={{backgroundColor: `var(--${toastType})`}} >
            {toastMessage}
        </div>
    );
}

export default Toast;