import React, { useContext } from 'react';
import Datatable from '../Datatable/Datatable';
import styles from './UserSetup.module.css';
import { LoaderContext } from '../../context/LoaderContext';

function UserSetup() {

    const {loading} = useContext(LoaderContext);

    return (
        <>
            <div className='section-header'>
                <h6>Users</h6>
            </div>
            <div className={styles.tableContainer} >
                <div className={styles.controls}>
                    <span></span>
                    <button className='btn-success' onClick={()=>loading(true)}>Add User</button>
                </div>
                <Datatable
                    columns={['Email', 'Name', 'Access', '']} />
            </div>
        </>
    );
}

export default UserSetup;