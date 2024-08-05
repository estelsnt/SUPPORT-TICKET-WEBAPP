import { createContext, useState } from "react";

export const ToastContext = createContext();

export function ToastProvider({children}){

    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState(null);

    function toast(message, type){
        setToastType(type);
        setToastMessage(message);
        setShowToast(true);
        setTimeout(()=>{
            setToastType('');
            setShowToast(false);
        }, 3000);
    }

    return (
        <ToastContext.Provider value={
            {
                showToast, setShowToast,
                toastType, setToastType,
                toastMessage, setToastMessage,
                toast
            }
        }>
            { children }
        </ToastContext.Provider>
    );
}