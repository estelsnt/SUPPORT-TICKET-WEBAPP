import React from 'react';
import styles from './Layout.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

function Layout({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                { <Header />}
            </div>
            <div className={styles.window}>
                <div className={styles.sidebar}>
                    { <Sidebar /> }
                </div>
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    );
}

export default Layout;