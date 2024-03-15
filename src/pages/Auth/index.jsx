import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Grid } from '@mui/material';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm.module';
const cx = classNames.bind(styles);

function Auth() {
    const [typePage, setTypePage] = useState('login');
    return (
        <div className={cx('container')}>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={2}>
                <Grid item xs={6}>
                    Background
                </Grid>
                <Grid item xs={6} className={cx('form')}>
                    <div className={cx('form-wrapper')}>
                        {typePage === 'login' && <LoginForm setTypePage={setTypePage} />}
                        {typePage === 'register' && <RegisterForm setTypePage={setTypePage} />}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Auth;
