import React from 'react';
import styles from './Modal.module.css';
import { BsXCircle } from 'react-icons/bs';

function Modal({open, close, title, children}) {

    return (
        <div className={`${styles.container} bg-blur ${open && styles.show}`}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span>{title}</span>
                    <button onClick={()=>close(false)} className='btn-close-s'>
                        <BsXCircle />
                    </button>
                </div>
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    );
}

export default Modal;