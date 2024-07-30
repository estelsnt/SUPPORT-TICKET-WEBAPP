import React, { useState } from 'react'
import { createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [token, setToken] = useState(null);

    return (
        <UserContext.Provider value={
            {
                token, setToken
            }
        } >
            { children }
        </UserContext.Provider>
    )
}