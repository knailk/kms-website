/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from 'react';
import MainLayout from './MainLayout';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useCookies } from 'react-cookie';

export const LoggedContext = createContext();
function LoggedLayout({ children }) {
    const [showBackDrop, setShowBackDrop] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const [cookies] = useCookies(['user-infor']);
    const [snackbarContent, setSnackbarContent] = useState({ 'message': '', 'severity': '' })
    const setShowSnackbar = (message, severity) => {
        setSnackbarContent({ message, severity })
        setSnackbar(true)
        setTimeout(() => {
            setSnackbar(false)
        }, 1000);
    }

    return (
        <>
            <LoggedContext.Provider value={{ setShowBackDrop, setShowSnackbar, userInfo: cookies['user-infor'] }}>
                <MainLayout>
                    {children}
                </MainLayout>
            </LoggedContext.Provider>
            <Backdrop open={showBackDrop} sx={{ zIndex: 99999999999999999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={snackbarContent.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbarContent.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default LoggedLayout;
