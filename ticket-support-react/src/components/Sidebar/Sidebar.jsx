import React, { useContext, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { FaTicketAlt, FaToolbox } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SidebarContext } from '../../context/SidebarContext';
import useWindowSize from '../../hooks/useWindowSize';

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const {width, height} = useWindowSize();

    const {showSidebar, setShowsidebar} = useContext(SidebarContext);

    useEffect(() => {
        if(width < 600){
            setShowsidebar(false);
        }else{
            setShowsidebar(true);
        }
    }, [width]); 

    function gotoTickets(){
        navigate('/support');
    }

    function gotoSetup(){
        navigate('/setup');
    }

    return (
        <div className={`${styles.container} ${!showSidebar ? styles.hidden : ''}`} >
            <div>
                <ul>
                    <li>
                        <button className={['/support'].includes(location.pathname) ? styles.selected : ''} onClick={gotoTickets} >
                            <FaTicketAlt />
                            <span>Tickets</span>
                        </button>
                    </li>
                    <li>
                        <button className={['/setup'].includes(location.pathname) ? styles.selected : ''} onClick={gotoSetup} >
                            <FaToolbox />
                            <span>Setup</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;