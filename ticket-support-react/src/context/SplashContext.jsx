import { createContext, useState } from "react";

export const SplashContext = createContext();

export function SplashProvider({ children }){

    const [showSplash, setShowSplash] = useState(false);
    function splash(state){
        setShowSplash(state);
    }

    return (
        <SplashContext.Provider value={
            {
                showSplash, setShowSplash, splash
            }
        }>
            { children }
        </SplashContext.Provider>
    );
};