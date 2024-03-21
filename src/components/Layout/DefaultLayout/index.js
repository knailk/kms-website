import Header from './Header';
import Footer from './Footer';
import { Divider } from '@mui/material';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Divider />
            <Footer />
        </>
    );
}

export default DefaultLayout;
