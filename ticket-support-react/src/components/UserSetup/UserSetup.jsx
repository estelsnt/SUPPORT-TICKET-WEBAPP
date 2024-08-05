import React, { useContext, useState, useEffect, useRef } from 'react';
import Datatable from '../Datatable/Datatable';
import styles from './UserSetup.module.css';
import { LoaderContext } from '../../context/LoaderContext';
import { BsSearch } from 'react-icons/bs';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Modal from '../Modal/Modal';
import { redBorderMarker } from '../../api/helper';
import { addNewUser, getUserList } from '../../api/userApi';
import { UserContext } from '../../context/UserContext';
import { ToastContext } from '../../context/ToastContext';


function UserSetup() {
    // context states
    const { loading } = useContext(LoaderContext);
    const { token } = useContext(UserContext);
    const { toast } = useContext(ToastContext);

    // ui related states
    const [showModal, setShowModal] = useState(false);
    const [maskPassword, setMaskPassword] = useState(true);

    // input states
    const [mode, setMode] = useState('add');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [access, setAccess] = useState('client');

    // modal input container reference
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const accessRef = useRef();

    // main data state
    const [usersList, setUsersList] = useState([]);

    // for debounce searching
    const [accessFilter, setAccessFilter] = useState('client');
    const [searchFilter, setSearchFilter] = useState('');
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedInputValue(searchFilter);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [searchFilter, 500]);
    useEffect(()=>{
        searchUsers();
    }, [debouncedInputValue]);
    useEffect(()=>{
        searchUsers();
    }, [accessFilter]);
    function accessFilterChange(e) {
        setAccessFilter(e.target.value);
    }
    function searchFilterChange(e) {
        setSearchFilter(e.target.value);
    }
    async function searchUsers(){
        const response = await getUserList(token, accessFilter, searchFilter);
        console.log(response.data);
        setUsersList(response.data);
    }

    // input event handlers
    function emailChange(e) {
        setEmail(e.target.value);
    }
    function nameChange(e) {
        setName(e.target.value);
    }
    function passwordChange(e) {
        setPassword(e.target.value);
    }
    function accessChange(e) {
        setAccess(e.target.value);
    }

    function checkInput() {
        let flag = false;
        if (!email) {
            flag = true;
            redBorderMarker(emailRef.current);
        }
        if (!name) {
            flag = true;
            redBorderMarker(nameRef.current);
        }
        if (mode === 'add') {
        if (!password) {
            flag = true;
            redBorderMarker(passwordRef.current);
        }
        }
        if (!access) {
            flag = true;
            redBorderMarker(accessRef.current);
        }
        return flag;
    }

    async function saveClick() {
        if (checkInput()) return;
        loading(true);
        const response = await addNewUser(token, email, name, access, password);
        loading(false);
        if (response.status) {
            clearModalInput();
            setShowModal(false);
            toast(response.message, 'success');
        } else {
            toast(response.message, 'danger');
        }
    }

    function clearModalInput() {
        setEmail('');
        setName('');
        setAccess('client');
        setPassword('');
    }

    function addUserClick() {
        setMode('add');
        setShowModal(true);
    }

    return (
        <>
        <Modal
            open={showModal}
            close={setShowModal}
            title={"User setup"}>
            <div className={styles.addUserModal}>
            <div>
                <div styles={styles.userInfo}>
                <div className="input-field">
                    <label htmlFor="id">Email</label>
                    <div ref={emailRef}>
                    <input type="email" id="email" value={email} onChange={emailChange} />
                    <MdEmail />
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <div ref={nameRef}>
                    <input type="text" id="name" value={name} onChange={nameChange} />
                    <FaUser />
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <div ref={passwordRef}>
                    <input
                        type={maskPassword ? 'password' : 'text'}
                        id="password"
                        value={password}
                        onChange={passwordChange}
                        placeholder={mode === "add" ? '' : 'Change password'} />
                    <button
                        onMouseEnter={() => setMaskPassword(false)}
                        onMouseLeave={() => setMaskPassword(true)} >
                        <FaLock />
                    </button>
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="access">Access</label>
                    <div ref={accessRef}>
                    <select id="access" onChange={accessChange} value={access} >
                        <option value="client">Client</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>
            <div>
                <button className='btn-success' onClick={saveClick}>Save</button>
            </div>
            </div>
        </Modal>
        <div className='section-header'>
            <h6>Users</h6>
        </div>
        <div className={styles.tableContainer} >
            <div className={styles.controls}>
                <div>
                    <select onChange={accessFilterChange}>
                    <option value="client">Clients</option>
                    <option value="user">Users</option>
                    <option value="admin">Administrator</option>
                    </select>
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder='search.' value={searchFilter} onChange={searchFilterChange} />
                    <BsSearch />
                </div>
                <button className='btn-success' onClick={addUserClick}>Add User</button>
            </div>
            <div className={styles.userList}>
                <div>
                    {
                        usersList.map((item, index)=>{
                            return (
                                <div key={index} className={styles.userCard} >
                                    <img src={item.picture} />
                                    <div>
                                        <span>{item.name}</span>
                                        <span>{item.email}</span>
                                        <span>{item.access}</span>  
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>               
            </div>
        </div>
        </>
    );
}

export default UserSetup;
