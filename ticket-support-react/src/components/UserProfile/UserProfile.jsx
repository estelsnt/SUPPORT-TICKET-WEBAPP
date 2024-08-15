import React, { useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { redBorderMarker } from '../../api/helper';
import styles from './UserProfile.module.css';

function UserProfile({show = false, close}) {

    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const accessRef = useRef();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [access, setAccess] = useState('client');

    const [maskPassword, setMaskPassword] = useState(true);

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
        if (!password) {
            flag = true;
            redBorderMarker(passwordRef.current);
        }
        if (!access) {
            flag = true;
            redBorderMarker(accessRef.current);
        }
        return flag;
    }

    return (
        <Modal open={show} close={close}>
            <div className={styles.modalBody}>
                <div className={styles.userInfo}>
                    <div className="input-field">
                        <label htmlFor="id">Email</label>
                        <div ref={emailRef}>
                        <input type="email" id="email" value={email} onChange={emailChange} readOnly={true} />
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
                            placeholder={'Change password'} />
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

            </div>
        </Modal>
    )
}

export default UserProfile