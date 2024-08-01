import React, { useContext } from 'react';
import styles from './Loader.module.css';
import { LoaderContext } from '../../context/LoaderContext';

function Loader() {

    const {isLoading} = useContext(LoaderContext);

    return (
        <div className={`${styles.loaderContainer} ${isLoading ? styles.show : ''} bg-blur`}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loader;