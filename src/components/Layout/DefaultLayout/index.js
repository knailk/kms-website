import Header from './Header';
import Footer from './Footer';
import {AlertProvider} from './AlertProvider';
import { Divider } from '@mui/material';

function DefaultLayout({ children }) {
    return (
        <>
            <AlertProvider>
                <Header />
                {children}
                <Divider />
                <Footer />
            </AlertProvider>
        </>
    );
}

export default DefaultLayout;
