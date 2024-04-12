import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import request from '~/utils/http';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

function LoginForm() {
    const [typePage, setTypePage] = useState('login');
    const [dataForm, setDataForm] = useState({ username: '', password: '' });

    const handleLoginBtn = () => {
        if (dataForm.username !== '' && dataForm.password !== '') {
            request
                .post('/auth/login', dataForm)
                .then((res) => {
                    window.location.href = 'http://localhost:3000/management';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Đăng nhập</h1>
            <TextField
                id="username"
                label="Tài khoản"
                variant="outlined"
                className={cx('input-field')}
                value={dataForm.username}
                onChange={(e) => setDataForm({ ...dataForm, username: e.target.value })}
            />
            <TextField
                id="password"
                label="Mật khẩu"
                variant="outlined"
                className={cx('input-field')}
                value={dataForm.password}
                onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
            />
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            htmlFor="remember"
                            onClick={(e) => setDataForm({ ...dataForm, remember: e.target.checked })}
                        />
                    }
                    label={
                        <span id="remember" style={{ fontSize: 15 }}>
                            Ghi nhớ mật khẩu
                        </span>
                    }
                />
            </div>
            <Button className={cx('btn-login')} variant="contained" onClick={() => handleLoginBtn()}>
                Đăng nhập
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="/">Quên mật khẩu</a>
            </div>
        </div>
    );
}

export default LoginForm;
