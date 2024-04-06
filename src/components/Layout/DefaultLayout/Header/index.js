import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import HeaderItems from './HeaderItems';
import { Grid, Stack } from '@mui/material';

const cx = classNames.bind(styles);
function Header({children}) {
    const [sticky, setSticky] = React.useState(false);
    React.useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 46) {
                setSticky(true)
            }
            if (window.scrollY < 10) {
                setSticky(false)
            }
        };
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <Stack>
            <div className={cx('header-wrapper')}>
                <div className={cx('header-top')}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className={cx('mail')}>tranminhtoan.149@gmail.com</span>
                </div>
                <div className={cx('header-bottom', { 'header-sticky': sticky })}>
                    <div className={cx('header-container')}>
                        <Grid container>
                            <Grid item xs={2}>
                                <div></div>
                            </Grid>
                            <Grid item xs={1} className={cx('logo')} sx={{backgroundImage: 'url(images/logo-nobg.png)', backgroundSize:'100% 100%'}}>
                                {/*<img src={"images/logo.jpg"} alt={""}/>*/}
                            </Grid>
                            <Grid item xs={7}>
                                <HeaderItems />
                            </Grid>
                            <Grid item xs={2}>
                                <div></div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            {children}
        </Stack>
    );
}

export default Header;
