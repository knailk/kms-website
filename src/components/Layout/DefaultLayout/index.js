import Header from './Header';
import Footer from './Footer';
import CustomHeader from '~/components/Layout/DefaultLayout/CustomHeader';

function DefaultLayout({ children }) {
    return (
        <>
            <Header children={children}/>
            <Footer />
        </>
    );
}

export default DefaultLayout;
