import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Button, Checkbox, TextField } from '@mui/material';
const cx = classNames.bind(styles);
function LoginForm({ setTypePage }) {
    return (
        <>
            <h1 style={{ marginBottom: 50, textAlign: 'center' }}>Đăng nhập</h1>
            <div style={{ marginBottom: 20 }}>
                <TextField id="user-name" label="Tài khoản" variant="standard" sx={{ width: 300 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
                <TextField id="password" label="Mật khẩu" variant="standard" sx={{ width: 300 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <Checkbox inputProps={{ 'aria-label': 'Remember me' }} />
                <label>Nhớ mật khẩu</label>
            </div>
            <div className={cx('action-button')} style={{ marginBottom: 20 }}>
                <Button variant="outlined" className={cx('button')} color="secondary">
                    Đăng nhập
                </Button>
                <Button
                    variant="outlined"
                    className={cx('button')}
                    color="secondary"
                    onClick={() => setTypePage('register')}
                >
                    Đăng ký
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <a href="/forgot-password">Quên mật khẩu</a> */}
                <p>Quên mật khẩu?</p>
            </div>
        </>
    );
}

export default LoginForm;
