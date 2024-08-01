import React, { useState, createContext } from 'react'

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [token, setToken] = useState(null);
    const [access, setAccess] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [picture, setPicture] = useState(null);
    const [id, setId] = useState(null);

    return (
        <UserContext.Provider value={
            {
                token, setToken,
                access, setAccess,
                email, setEmail,
                name, setName,
                picture, setPicture,
                id, setId
            }
        } >
            { children }
        </UserContext.Provider>
    )
}