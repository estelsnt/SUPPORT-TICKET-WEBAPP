import React, { useState, createContext } from 'react'

export const LoaderContext = createContext();

export function LoaderProvider({ children }){
    const [isLoading, setIsLoading] = useState(false);
    function loading(status){
        console.log(status);
        setIsLoading(status);
    }
    return (
        <LoaderContext.Provider value={
            {
                isLoading, setIsLoading, loading
            }
        } >
            { children }
        </LoaderContext.Provider>
    )
}