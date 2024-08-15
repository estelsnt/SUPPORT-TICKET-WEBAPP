import React, { useContext, useRef, useState, useEffect } from 'react';
import styles from './Header.module.css';
import { UserContext } from '../../context/UserContext';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsFillMenuButtonWideFill, BsPerson } from 'react-icons/bs';
import useWindowSize from '../../hooks/useWindowSize';
import { SidebarContext } from '../../context/SidebarContext';
import UserProfile from '../UserProfile/UserProfile';

function Header() {

    const navigate = useNavigate();
    const {access, name, picture, setToken, setAccess, setEmail, setName, setPicture, setId} = useContext(UserContext);
    const {showSidebar, setShowsidebar} = useContext(SidebarContext);
    const {width} = useWindowSize();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfle] = useState(false);

    const dropdownRef = useRef();

    useEffect(()=>{
        if(width < 600){
            setShowMenu(true);
        }else{
            setShowMenu(false);
        }
    }, [width]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Clicked outside the ref element
                setShowDropdown(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    function profileClick(){
        setShowDropdown(!showDropdown);
    }

    function logoutClick(){
        localStorage.clear();
        setToken(null); 
        setAccess(null); 
        setEmail(null); 
        setName(null); 
        setPicture(null); 
        setId(null);
        navigate('/');
    }

    function menuClick(){
        setShowsidebar(!showSidebar);
    }

    return (
        <>
            <UserProfile show={showProfile} close={setShowProfle} />
            <div className={styles.container}>
                <div className={`${styles.userinfo} ${showDropdown && styles.show}`} ref={dropdownRef}>
                    <ul>
                        <li>
                            <button onClick={()=>setShowProfle(true)}>
                                <BsPerson />
                                <span>Account</span>
                            </button>
                        </li>
                        <li>
                            <hr />
                            <button onClick={logoutClick} >
                                <FaPowerOff />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
                {
                    access != 'client' && showMenu && (
                        <button className={styles.menu} onClick={menuClick} >
                            <BsFillMenuButtonWideFill />
                        </button>
                    )
                }
                <div className={styles.usericon}>
                    <button onClick={profileClick} >
                        {name}
                    </button>
                    <img src={picture} alt="profile picture" />
                </div>
            </div>
        </>
    );
}

export default Header;