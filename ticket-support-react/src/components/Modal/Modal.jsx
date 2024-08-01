import React from 'react';
import styles from './Modal.module.css';
import { FaBeer, FaCoffee } from 'react-icons/fa';

function Modal({open, close, title, children}) {

    return (
        <div className={`${styles.container} bg-blur ${open && styles.show}`}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span>{title}</span>
                    <button onClick={close} className='btn-close-s'>
                        <FaCoffee />
                    </button>
                </div>
                <div>
                    { children }
                </div>
            </div>
        </div>
    );
}

export default Modal;