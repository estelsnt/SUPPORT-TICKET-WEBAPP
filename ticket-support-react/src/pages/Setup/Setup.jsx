import React from 'react';
import styles from './Setup.module.css';
import Layout from '../Layout/Layout';
import UserSetup from '../../components/UserSetup/UserSetup';
import ProductSetup from '../../components/ProductSetup/ProductSetup';
// import ServiceSetup from '../../components/ServiceSetup/ServiceSetup';

function Setup() {

    return (
        <Layout>
            <div className='section'>
                <UserSetup />
            </div>
            <div className='section'>
                <ProductSetup />
            </div>
            {/* <div className='section'>
                <ServiceSetup />
            </div> */}
        </Layout>
    );
}

export default Setup;