import { createContext, useState } from 'react';
import MainLayout from './MainLayout';
import { Backdrop, CircularProgress, Snackbar, Alert, Slide } from '@mui/material';

export const FeedBackContext = createContext();
function LoggedLayout({ children }) {
    const [showBackDrop, setShowBackDrop] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
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
            <FeedBackContext.Provider value={{ setShowBackDrop, setShowSnackbar }}>
                <MainLayout>
                    {children}
                </MainLayout>
            </FeedBackContext.Provider>
            <Backdrop open={showBackDrop} >
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
