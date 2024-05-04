import Header from './Header';
import Footer from './Footer';
import AlertUnLogged from './AlertUnLogged';
import { Divider } from '@mui/material';

function DefaultLayout({ children }) {
    return (
        <>
            <AlertUnLogged>
                <Header />
                {children}
                <Divider />
                <Footer />
            </AlertUnLogged>
        </>
    );
}

export default DefaultLayout;
