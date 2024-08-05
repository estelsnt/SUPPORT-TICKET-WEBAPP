import React, { useContext, useState, useEffect } from 'react';
import Datatable from '../Datatable/Datatable';
import styles from './UserSetup.module.css';
import { LoaderContext } from '../../context/LoaderContext';
import { BsSearch } from 'react-icons/bs';

function debounce(func, wait){
    let timeout;
    return function (...args){
        clearTimeout(timeout);
        timeout = setTimeout(()=>func.apply(this, args), wait);
    };
}

function UserSetup() {

    const {loading} = useContext(LoaderContext);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const search = (query) => {
        console.log(`searching for: ${query}`);
        setResults([query]);
    };

    const debouncedSearch = debounce(search, 500);

    useEffect(()=>{
        if(query){
            debouncedSearch(query);
        }
    }, [query]);

    function addUserClick(){
        console.log('test');
    }

    return (
        <>
            <div className='section-header'>
                <h6>Users</h6>
            </div>
            <div className={styles.tableContainer} >
                <div className={styles.controls}>
                    <div className={styles.search}>
                        <input type="text" placeholder='search.' onChange={(e)=>setQuery(e.target.value)} />
                        <BsSearch />
                    </div>
                    <button className='btn-success' onClick={addUserClick}>Add User</button>
                </div>




                {/* <Datatable
                    columns={['Email', 'Name', 'Access', '']}
                    searchable={false} /> */}
            </div>
        </>
    );
}

export default UserSetup;