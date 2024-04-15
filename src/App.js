import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import Home from './pages/Home';
import ScrollToTop from './utils/ScrollToTop';
import { useCookies } from 'react-cookie';
import PageNotFound from "./pages/NotFound";

function App() {
    const [cookies] = useCookies(['user-infor']);

    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            //check auth require
                            if (route.requireAuth && !cookies['user-infor']) {
                                Page = Home;
                                Layout = DefaultLayout;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    render={() =>
                                        route.requireAuth && !cookies['user-infor'] ? <Navigate to="/" /> : null
                                    }
                                    element={
                                        <Layout>
                                            <ScrollToTop />
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
