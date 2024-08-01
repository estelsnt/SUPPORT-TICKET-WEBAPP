import React from 'react';
import styles from './ServiceSetup.module.css';
import Datatable from '../Datatable/Datatable';

function ServiceSetup() {
    return (
        <>
            <div className='section-header'>
                <h6>Services</h6>
            </div>
            <div className={styles.tableContainer} >
                <div className={styles.controls}>
                    <span></span>
                    <button className='btn-success'>Add Service</button>
                </div>
                <Datatable
                    columns={['Service Name', '']} />
            </div>
        </>
    );
}

export default ServiceSetup;