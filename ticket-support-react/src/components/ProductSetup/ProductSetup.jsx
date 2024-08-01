import React from 'react';
import styles from './ProductSetup.module.css';
import Datatable from '../Datatable/Datatable';

function ProductSetup() {
    return (
        <>
            <div className='section-header'>
                <h6>Products</h6>
            </div>
            <div className={styles.tableContainer} >
                <div className={styles.controls}>
                    <span>Catgories</span>
                    <button className='btn-success'>Add Category</button>
                </div>
                <Datatable
                    columns={['Category', '']} />
            </div>
            <div className={styles.tableContainer} >
                <div className={styles.controls}>
                    <span>Items</span>
                    <button className='btn-success'>Add Category</button>
                </div>
                <Datatable
                    columns={['Serial Number', 'Product Name', 'Warranty']} />
            </div>
        </>
    );
}

export default ProductSetup;