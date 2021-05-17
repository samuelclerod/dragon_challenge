import { Snackbar } from '@material-ui/core';
import React, { createContext, useCallback, useContext, useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface ToastMessage {
    type?: 'success' | 'error';
    message?: string;
}

interface ToastContextData {
    addToast(message: ToastMessage): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {

    const [message, setMessage] = useState<ToastMessage>();
    const [show, setShow] = useState(false)

    const addToast = useCallback(({ type, message }: ToastMessage) => {

        const toast = {
            type,
            message
        }
        setMessage(toast);
        setShow(true);
    }, []);

    function handdleShow() {
        setShow(!show)
    }

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <Snackbar open={show} autoHideDuration={6000} onClose={handdleShow}>
                <Alert onClose={handdleShow} severity={message?.type}>
                    {message?.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    )

}

function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context
}

export { ToastProvider, useToast }