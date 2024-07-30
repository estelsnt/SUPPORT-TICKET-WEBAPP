import React from 'react';
import styles from './Dashboard.module.css';
import Layout from '../Layout/Layout';

function Dashboard() {
    return (
        <Layout>
            <div className={styles.container} >
                Dashboard
            </div>
        </Layout>
    );
}

export default Dashboard;