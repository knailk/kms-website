import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Button, Checkbox, TextField } from '@mui/material';
const cx = classNames.bind(styles);
function RegisterForm({ setTypePage }) {
    return (
        <>
            <Button className={cx('btn-back')} color="secondary" onClick={() => setTypePage('login')}>
                Quay về
            </Button>
            <h1 style={{ marginBottom: 50, textAlign: 'center' }}>Đăng ký</h1>
            <div style={{ marginBottom: 20 }}>
                <TextField id="first-name" label="Họ" variant="standard" sx={{ width: 145, paddingRight: 5 }} />
                <TextField id="last-name" label="Tên" variant="standard" sx={{ width: 145, paddingLeft: 5 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField
                    id="phone-number"
                    label="Số điện thoại"
                    type="number"
                    variant="standard"
                    sx={{ width: 300 }}
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField id="user-name" label="Tài khoản" variant="standard" sx={{ width: 300 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField id="password" label="Mật khẩu" variant="standard" sx={{ width: 300 }} />
            </div>
            <div style={{ marginBottom: 30 }}>
                <TextField id="password" label="Nhập lại mật khẩu" variant="standard" sx={{ width: 300 }} />
            </div>
            <div className={cx('action-button')} style={{ marginBottom: 20 }}>
                <Button
                    variant="outlined"
                    className={cx('bn-register')}
                    color="secondary"
                    onClick={() => setTypePage('register')}
                >
                    Đăng ký
                </Button>
            </div>
        </>
    );
}

export default RegisterForm;
