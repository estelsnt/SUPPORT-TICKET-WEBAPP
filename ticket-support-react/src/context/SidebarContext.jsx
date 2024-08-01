import { createContext, useState } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({children}){

    const [showSidebar, setShowsidebar] = useState(true);

    return (
        <SidebarContext.Provider value={
            {
                showSidebar, setShowsidebar
            }
        }>
            { children }
        </SidebarContext.Provider>
    );
}