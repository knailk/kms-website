import MainLayout from './MainLayout';

function LoggedLayout({ children }) {
    return (
        <>
            <MainLayout>
                {children}
            </MainLayout>
            {/* <Divider />
            <Footer /> */}
        </>
    );
}

export default LoggedLayout;
