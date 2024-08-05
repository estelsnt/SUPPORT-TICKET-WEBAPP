import React, { useState, useEffect, useCallback } from 'react';
import styles from './Datatable.module.css';
import { BsSearch } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons

function debounce(func, delay) {
    let timerId;
    return function(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * This component creates a data table with filtering search, and simple arrow pagination.
 * props:
 * columns (array[strings]) - Array of strings as table headers
 * data (array[array[object]]) - Array of object array. match the number of objects with columns length.
 *                               This can be html elements (buttons, etc,.).
 *                               Renders as table rows.
 * ex:
 * columns = ['id', 'name', 'age', 'action']
 * data = [
 *  ['1', 'john', 25, <button>edit</button>],
 *  ...
 * ]
 * rowClickEvent: pass a function here: it wll return the array of data from clicked row
 * isRowSelectable: when set to true this will make pointer to cursor on rows and calls the rowClickEvent when clicked
 * searchable: hides/show the search box
 */
function Datatable({ columns = [], data = [], rowClickEvent, isRowSelectable = false, searchable = true }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const newFilteredData = data.filter(item =>
            item.some(cell =>
                String(cell).toLowerCase().includes(lowerCaseQuery)
            )
        );
        setFilteredData(newFilteredData);
        setCurrentPage(1); // Reset to the first page when a new search is performed
    };

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [data]);

    useEffect(() => {
        debouncedHandleSearch(searchQuery);
    }, [searchQuery, debouncedHandleSearch]);

    // Calculate the data to be displayed on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Pagination handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    function rowClick(data, e){
        if(isRowSelectable){
            rowClickEvent(data);
            const allrows = e.target.parentElement.parentElement.children;
            for(let row of allrows){
                row.style.backgroundColor = 'var(--dominant)';
            }
            e.target.parentElement.style.backgroundColor = 'var(--support)';
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                {
                    searchable && (
                        <div className={styles.search}>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                            <BsSearch />
                        </div>
                    )
                }
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            {columns.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((item, index) => (
                                <tr key={index} onClick={(e)=>rowClick(item, e)} className={isRowSelectable ? styles.selectable:''}>
                                    {Array.from({ length: columns.length }).map((_, cellIndex) => (
                                        <td key={cellIndex}>
                                            {item[cellIndex] !== undefined ? item[cellIndex] : ''}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.nodata}>
                                <td colSpan={columns.length}>No records to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}

export default Datatable;
