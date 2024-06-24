import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import HeaderItems from './HeaderItems';
import { Grid } from '@mui/material';
import Logo from '~/components/Logo/Logo';

const cx = classNames.bind(styles);
function Header() {
    const [sticky, setSticky] = React.useState(false);
    React.useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 46) {
                setSticky(true);
            }
            if (window.scrollY < 10) {
                setSticky(false);
            }
        };
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className={cx('header-wrapper')}>
            <div className={cx('header-top')}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className={cx('mail')}>admin@kms.com</span>
            </div>
            <div className={cx('header-bottom', { 'header-sticky': sticky })}>
                <div className={cx('header-container')}>
                    <Grid container style={{ height: '100%' }}>
                        <Grid item xs={2} className={cx('logo')}>
                            <a style={{ width: '100%', height: '100%' }} href="/">
                                <Logo />
                            </a>
                        </Grid>
                        <Grid item xs={2}>
                            <div></div>
                        </Grid>
                        <Grid item xs={8} style={{ margin: 'auto 0' }}>
                            <HeaderItems />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Header;
