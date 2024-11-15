import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import request from '~/utils/http';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

function LoginForm() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user-infor']);
    const [dataForm, setDataForm] = useState({ username: '', password: '' });
    const usernameRef = useRef();
    const passwordRef = useRef();
    const handleLoginBtn = () => {
        if (usernameRef.current.value !== '' && passwordRef.current.value !== '') {
            request
                .post('/auth/login', {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                })
                .then((res) => {
                    //set cookies
                    let date = new Date();
                    date.setHours(date.getHours() + 4);
                    setCookie('user-infor', res.data, { expires: date });
                    if (res.data.role === 'admin') {
                        navigate('/admin/class');
                    } else if (res.data.role === 'chef') {
                        navigate('/dish');
                    } else {
                        navigate('/schedule');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                </div>
                <TextField
                    id="username"
                    label="Tài khoản"
                    variant="outlined"
                    className={cx('input-field')}
                    inputRef={usernameRef}
                    // defaultValue="admin"
                />
                <TextField
                    id="password"
                    label="Mật khẩu"
                    type="password"
                    variant="outlined"
                    className={cx('input-field')}
                    inputRef={passwordRef}
                    // defaultValue="ndtd1234"
                />
                {/* <div>
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
                </div> */}
                <Button className={cx('btn-login')} variant="contained" onClick={() => handleLoginBtn()}>
                    Đăng nhập
                </Button>
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href="/">Quên mật khẩu</a>
                </div> */}
            </Box>
        </Container>
    );
}

export default LoginForm;
